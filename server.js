/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// apply fix for winston 3.1 before anything else
require("./winston-fix");

const http = require("http");
const app = require("./app");
const config = require("./config");

// Create HTTP server.
const { port } = config;
const server = http.createServer(app);


// Event listener for HTTP server "error" event.
server.on(
    "error",
    error =>
    {
        if (error.syscall !== "listen")
        {
            throw error;
        }

        // handle specific listen errors with friendly messages
        if (error.code === "EACCES")
        {
            process.stderr.write("Port " + port + " requires elevated privileges");

            process.exit(1);
        }

        if (error.code === "EADDRINUSE")
        {
            process.stderr.write("Port " + port + " requires elevated privileges");

            process.exit(1);
        }

        throw error;
    }
);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(
    {
        "port": port
    },
    () => process.stdout.write("server listening on port " + port + "\n")
);

module.exports = server;
