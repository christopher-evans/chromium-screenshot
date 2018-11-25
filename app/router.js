/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Router = require("koa-router");
const koaBody = require("koa-body");
const logger = require("./logger");
const metrics = require("./metrics");
const queue = require("./queue");
const { actionMiddleware, filterMiddleware, responderMiddleware } = require("../src/middleware");
const { logQueryAction, queueAction } = require("../src/action");
const {
    aggregateFilter,
    booleanFilter,
    dateFilter,
    defaultFilter,
    dynamicDefaultFilter,
    inSetFilter,
    numberFilter,
    requiredFilter,
    subsetFilter,
    urlFilter
} = require("../src/filter");
const {
    imageTask,
    pageTask,
    puppeteerTask
} = require("../src/task");

const router = new Router();

// body parsing middleware; json only
const koaBodyMiddleware = koaBody(
    {
        // @TODO config
        "jsonLimit": "56kb",
        "text": false,
        "urlencoded": false
    }
);

// ping route
router.get(
    "/ping",
    responderMiddleware(
        () => ({
            "timestamp": Date.now()
        })
    )
);

// log route
router.post(
    "/log",
    koaBodyMiddleware,
    filterMiddleware(
        aggregateFilter(
            new Map(
                Object.entries(
                    {
                        "from": dynamicDefaultFilter(dateFilter(), () => new Date(Date.now() - 24 * 60 * 60 * 1000)),
                        "until": dynamicDefaultFilter(dateFilter(), () => new Date()),
                        "limit": defaultFilter(numberFilter(0, 1 << 16), 100),
                        "start": defaultFilter(numberFilter(0), 0),
                        "order": defaultFilter(inSetFilter(new Set(["asc", "desc"])), "asc"),
                        "fields": defaultFilter(
                            subsetFilter(new Set(["level", "message", "timestamp"])),
                            ["level", "message", "timestamp"]
                        )
                    }
                )
            )
        )
    ),
    actionMiddleware(logQueryAction(logger))
);

// image route
router.post(
    "/image",
    koaBodyMiddleware,
    filterMiddleware(
        aggregateFilter(
            new Map(
                Object.entries(
                    {
                        "url": requiredFilter(urlFilter()),
                        "format": defaultFilter(inSetFilter(new Set(["png", "jpeg"]), "png")),
                        "width": defaultFilter(numberFilter(0, 1 << 16), 800),
                        "height": defaultFilter(numberFilter(0, 1 << 16), 800),
                        "quality": defaultFilter(numberFilter(0, 100), 100),
                        "fullPage": defaultFilter(booleanFilter(), false),
                        "omitBackground": defaultFilter(numberFilter(), false)
                    }
                )
            )
        )
    ),
    actionMiddleware(
        queueAction(
            queue,
            puppeteerTask(
                pageTask(imageTask(metrics), logger, metrics),
                logger,
                metrics
            )
        )
    )
);

module.exports = router;
