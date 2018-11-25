/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const logQueryAction = require("./log-query");
const queueAction = require("./queue");
const workerAction = require("./worker");

module.exports =
    {
        logQueryAction,
        queueAction,
        workerAction
    };