/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
// apply fix for winston 3.1 before anything else
require("./winston-fix");

const http = require("http");
const process = require("process");
const app = require("./app");
const logger = require("./logger");
const config = require("./config");

const server = http.createServer(app.callback());

server.on(
    "error",
    error => logger.error("Server error", { "error": error })
);

server.listen(
    {
        "server_host": config.get("server_host"),
        "port": config.get("server_port"),
        "backlog": config.get("server_backlog")
    },
    () => logger.info("Server listening on " + config.get("server_host") + ":" + config.get("server_port"))
);

process.send({ "event": "init" });
