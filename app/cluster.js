/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const cluster = require("cluster");
const browser = require("./browser");
const workerPool = require("./worker-pool");
const logger = require("./logger");

// set up master
cluster.setupMaster(
    {
        "exec": "app/server.js"
    }
);

const wsMessage = worker =>
{
    const websocket = browser.wsEndpoint();

    worker.send(
        {
            "event": "ws_change",
            "websocket": websocket
        },
        null,
        error =>
        {
            if (error)
            {
                logger.error(
                    "Failed to send websocket message",
                    {
                        "error": error,
                        "websocket": websocket
                    }
                );
            }
            else
            {
                logger.info(
                    "Websocket message sent",
                    {
                        "websocket": websocket
                    }
                );
            }
        }
    );
};

browser.on("launch", () => wsMessage(workerPool));

workerPool.on(
    "message",
    (worker, message) =>
    {
        if (message.event !== "init")
        {
            return;
        }

        wsMessage(worker);
    }
);

browser.launch()
    .then(() => workerPool.start());
