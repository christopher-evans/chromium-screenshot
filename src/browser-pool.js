/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const puppeteer = require("puppeteer");
const Browser = require("./browser");

/**
 * Maintains a pool of running chrome instances.
 *
 * Limits the application to a single active browser instance, but delays closing any instance
 * until all requests queued to the browser have completed or failed.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class BrowserPool
{
    /**
     * Browser constructor.
     *
     * @param {Array} flags Chromium instance flags
     *
     * @public
     */
    constructor(flags)
    {
        /**
         * Chromium instance flags.
         *
         * @private
         */
        this.flags = flags;

        /**
         * Active browser instance.
         *
         * @private
         */
        this.activeBrowser = null;

        /**
         * Array of browser instances.
         *
         * @private
         */
        this.browsers = [];
    }

    /**
     * Fetch the current instance of the browser; or create a new one if not available.
     *
     * @returns {puppeteer.Browser} Chromium instance promise
     * @public
     */
    fetch()
    {
        if (! this.promise)
        {
            this.promise = puppeteer.launch(
                {
                    "args": this.flags
                }
            )
                .then(
                    instance =>
                    {
                        const activeBrowser = new Browser(instance);

                        this.browsers.push(activeBrowser);
                        this.activeBrowser = activeBrowser;

                        activeBrowser.on("close", this.popInstance.bind(this));

                        return activeBrowser;
                    }
                );
        }

        return this.promise;
    }

    /**
     * Push a request to the pending array
     *
     * @param {string} uuid
     *
     * @returns {Promise<string>}
     * @public
     */
    async pushRequest(uuid)
    {
        const browser = await this.fetch();

        browser.pushRequest(uuid);

        return browser.getInstance().wsEndpoint();
    }

    /**
     * Pop a request off the pending array.
     *
     * @param {string} uuid Request uuid
     *
     * @throws {Error} If the request was not attached to any browser
     * @public
     */
    popRequest(uuid)
    {
        const match = this.browsers.find(browser => browser.popRequest(uuid));
        if (! match)
        {
            throw new Error("Request not found in any browser");
        }
    }

    /**
     * Remove a browser from the array of active browsers.
     *
     * @param browser Browser instance
     * @public
     */
    popInstance(browser)
    {
        const index = this.browsers.indexOf(browser);
        if (index > - 1)
        {
            this.browsers.splice(index, 1);
        }
    }

    /**
     * Clear the current browser instance and mark for closure.
     *
     * @returns {Promise}
     * @public
     */
    async close()
    {
        const { activeBrowser } = this;
        if (! activeBrowser)
        {
            // no current browser to close
            return;
        }

        // delete cached active instance;
        this.activeBrowser = null;
        this.promise = null;

        // close browser once all request have finished
        await activeBrowser.flagForClosure();
    }
}

module.exports = BrowserPool;
