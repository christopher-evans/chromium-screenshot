/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const process = require("process");

const websocketState = () =>
{
    let socket = "";

    process.on(
        "message",
        message =>
        {
            if (message.event === "ws_change")
            {
                socket = message.websocket;
            }
        }
    );

    return () => socket;
};

module.exports = websocketState;
