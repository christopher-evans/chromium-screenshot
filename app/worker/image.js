
const {
    ImageWorker,
    PageWorker,
    PuppeteerWorker
} = require("../../src/worker");

const config = require("../config");
const logger = require("../logger");

const enableCache = config.render_cache;
const timeout = config.render_timeout;
const waitUntil = config.render_wait_until;

const worker = new PuppeteerWorker(
    new PageWorker(
        new ImageWorker(
            timeout,
            waitUntil
        ),
        enableCache,
        logger
    )
);

// export worker
module.exports = worker.work.bind(worker);
