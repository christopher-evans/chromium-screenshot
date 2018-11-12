/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const puppeteer = require("puppeteer");

/**
 * Worker connects to a chromium instance via a websocket address.
 *
 * The connected chromium instance is passed to a child worker.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class Puppeteer
{
    /**
     * Puppeteer constructor.

     * @param {{work: Function}} source Child worker
     *
     * @public
     */
    constructor(source)
    {
        this.source = source;
        this.browser = null;
    }

    /**
     * Connect to a chromium instance and pass to worker callback.
     *
     * @param {string} wsEndpoint Websocket address
     * @param {Object} request Screenshot parameters
     * @param {function} callback Worker callback
     *
     * @void
     * @public
     */
    async work(wsEndpoint, request, callback)
    {
        try
        {
            await this.source.work(
                await this.connect(wsEndpoint),
                request,
                callback
            );
        }
        catch (error)
        {
            callback(error, null);
        }
    }

    /**
     * Connect to a Chromium instance.
     *
     * @param {string} wsEndpoint Websocket address
     *
     * @void
     * @private
     */
    async connect(wsEndpoint)
    {
        if (! this.browser || this.browser.wsEndpoint() !== wsEndpoint)
        {
            // no connected to the browser
            // or we're pointing at a dead instance
            this.browser = await puppeteer.connect(
                {
                    "browserWSEndpoint": wsEndpoint
                }
            );
        }

        return this.browser;
    }
}

module.exports = Puppeteer;
