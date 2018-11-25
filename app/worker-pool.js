/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { WorkerPool, WorkerDiscard } = require("../src/cluster");
const config = require("./config");
const logger = require("./logger");

// set up workers
const workers = new Set();
const discardedWorkers = new Set();

const workerDiscard = new WorkerDiscard(discardedWorkers, config.get("worker_discard_timeout"), logger);
const workerPool = new WorkerPool(
    config.get("worker_concurrency"),
    workers,
    workerDiscard,
    config.get("worker_respawn_wait"),
    logger
);

module.exports = workerPool;
