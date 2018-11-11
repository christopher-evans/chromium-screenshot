/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const puppeteer = require("puppeteer");

/**
 * Browser wraps a Chromium instance from Puppeteer.
 *
 * Ensures we have a single, always available browser instance.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class Browser
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
         * Chromium instance.
         *
         * @private
         */
        this.instance = null;

        /**
         * Chromium instance promise.
         *
         * Cached to allow consistent return type after the instance is created.
         *
         * @private
         */
        this.promise = null;
    }

    /**
     * Fetch the current instance of the browser; or create a new one if not available.
     *
     * @returns {Promise<puppeteer.Browser>} Chromium instance promise
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
                        // listen for browser closed / crashed
                        instance.on("disconnected", this.clear.bind(this));

                        this.instance = instance;

                        return instance;
                    }
                );
        }

        return this.promise;
    }

    /**
     * Close the current instance and clear from the cache.
     *
     * @void
     * @public
     */
    clear()
    {
        const { instance } = this;
        if (instance)
        {
            instance.close();
        }

        // set null here in case something else runs before the "disconnected" event
        this.instance = null;
        this.promise = null;
    }
}

module.exports = Browser;
