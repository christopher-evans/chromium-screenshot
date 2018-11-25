/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const actionMiddleware = require("./action");
const cacheMiddleware = require("./cache");
const errorMiddleware = require("./error");
const filterMiddleware = require("./filter");
const notFoundMiddleware = require("./not-found");
const requestLogMiddleware = require("./request-log");
const responderMiddleware = require("./responder");
const securityMiddleware = require("./security");

module.exports =
    {
        actionMiddleware,
        cacheMiddleware,
        errorMiddleware,
        filterMiddleware,
        notFoundMiddleware,
        requestLogMiddleware,
        responderMiddleware,
        securityMiddleware
    };
