/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const process = require("process");
const puppeteer = require("puppeteer");
const websocket = require("./websocket");

const connect = async socket =>
{
    try
    {
        return await puppeteer.connect(
            {
                "browserWSEndpoint": socket
            }
        );
    }
    catch (error)
    {
        // notify master and error
        process.send(
            {
                "event": "connect_failed"
            }
        );

        throw error;
    }
};

const browserState = () =>
{
    const source = websocket();
    let browser = null;

    return async () =>
    {
        const socket = source();
        if (! browser || browser.wsEndpoint() !== socket)
        {
            browser = await connect(socket);
        }

        return browser;
    };
};

module.exports = browserState;
