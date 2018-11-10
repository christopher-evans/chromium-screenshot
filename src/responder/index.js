/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Log = require("./log");
const Worker = require("./worker");

module.exports = {
    "LogResponder": Log,
    "WorkerResponder": Worker
};
