/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const PQueue = require("p-queue");
const config = require("./config");

const queue = new PQueue(
    {
        "concurrency": config.get("queue_concurrency")
    }
);

module.exports = queue;
