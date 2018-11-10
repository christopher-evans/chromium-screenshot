/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const express = require("express");
const config = require("./config");
const logger = require("./logger");
const Browser = require("./src/browser");

const {
    ImageWorker
} = require("./src/worker");

const {
    LogResponder,
    WorkerResponder
} = require("./src/responder");

const {
    InputRoute,
    SimpleRoute
} = require("./src/route");

const {
    AggregateFilter,
    BooleanFilter,
    DateFilter,
    DefaultFilter,
    DynamicDefaultFilter,
    InArrayFilter,
    IsArrayFilter,
    NumberFilter,
    RequiredFilter,
    UrlFilter
} = require("./src/filter");


const browser = new Browser(config.browser_flags);

// don't reuse a single browser too long
setInterval(browser.clear, config.browser_restart_interval);

const ping = new SimpleRoute(
    () => ({
        "timestamp": Date.now()
    }),
    "application/json"
);

const log = new InputRoute(
    new LogResponder(logger),
    new AggregateFilter(
        {
            "from": new DynamicDefaultFilter(new DateFilter(), () => new Date(Date.now() - 24 * 60 * 60 * 1000)),
            "until": new DynamicDefaultFilter(new DateFilter(), () => new Date()),
            "limit": new DefaultFilter(new NumberFilter(0, 1 << 16), 100),
            "start": new DefaultFilter(new NumberFilter(0), 0),
            "order": new DefaultFilter(new InArrayFilter(["asc", "desc"]), "asc"),
            "fields": new DefaultFilter(
                new IsArrayFilter(["level", "message", "timestamp"]), ["level", "message", "timestamp"]
            )
        }
    )
);

const image = new InputRoute(
    new WorkerResponder(
        parameters => "image/" + parameters.imageFormat,
        new ImageWorker(
            browser,
            config.render_cache,
            config.render_timeout,
            config.render_wait_until
        )
    ),
    new AggregateFilter(
        {
            "url": new RequiredFilter(new UrlFilter()),
            "imageFormat": new DefaultFilter(new InArrayFilter(["jpeg", "png"]), "jpeg"),
            "width": new NumberFilter(0, 1 << 16),
            "height": new NumberFilter(0, 1 << 16),
            "fullPage": new BooleanFilter(),
            "quality": new DefaultFilter(new NumberFilter(0, 100), 100),
            "omitBackground": new DefaultFilter(new BooleanFilter(), false)
        }
    )
);

const router = express.Router();
router.get(config.route_ping, ping.route.bind(ping));
router.post(config.route_log, log.route.bind(log));
router.post(config.route_image, image.route.bind(image));

module.exports = router;
