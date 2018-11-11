/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const express = require("express");
const farm = require("worker-farm");
const config = require("./config");
const logger = require("./logger");

const {
    LogResponder,
    WorkerResponder
} = require("../src/responder/index");

const {
    InputRoute,
    SimpleRoute
} = require("../src/route/index");

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
} = require("../src/filter/index");

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

const workers = farm(require.resolve("./worker"));
const image = new InputRoute(
    new WorkerResponder(parameters => "image/" + parameters.imageFormat, workers),
    new AggregateFilter(
        {
            "url": new RequiredFilter(new UrlFilter()),
            "imageFormat": new DefaultFilter(new InArrayFilter(["jpeg", "png"]), "jpeg"),
            "width": new DefaultFilter(new NumberFilter(0, 1 << 16), 800),
            "height": new DefaultFilter(new NumberFilter(0, 1 << 16), 600),
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
