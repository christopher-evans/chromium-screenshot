/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const farm = require("worker-farm");
const config = require("../config");
const BrowserPool = require("../../src/browser-pool");
const { WorkerResponder } = require("../../src/responder/index");
const { InputRoute } = require("../../src/route/index");
const {
    AggregateFilter,
    BooleanFilter,
    DefaultFilter,
    InArrayFilter,
    NumberFilter,
    RequiredFilter,
    UrlFilter
} = require("../../src/filter/index");

// create browser
const browserPool = new BrowserPool(config.browser_flags);

// don't reuse a single browser too long
setInterval(browserPool.close.bind(browserPool), config.browser_restart_interval);

// create workers
const workers = farm(
    {
        "autoStart": true,
        "maxCallTime": config.worker_timeout,
        "maxConcurrentCallsPerWorker": config.worker_concurrent_calls,
        "maxConcurrentWorkers": config.worker_concurrency
    },
    require.resolve("../worker"),
    [
        "image"
    ]
);
const image = new InputRoute(
    new WorkerResponder(workers.image, browserPool, parameters => "image/" + parameters.imageFormat),
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

module.exports = image;
