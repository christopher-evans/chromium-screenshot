/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const EventEmitter = require("events");

/**
 * Browser wraps a Chromium instance from Puppeteer.
 *
 * Maintains an array of requests pending for the instance to prevent disconnecting before all requests have completed.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class Browser extends EventEmitter
{
    /**
     * Browser constructor.
     *
     * @param {puppeteer.Browser} instance Chromium instance
     *
     * @public
     */
    constructor(instance)
    {
        super();

        // flag closed on disconnect (browser crashes)
        instance.on("disconnected", this.flagClosed.bind(this));

        /**
         * Chromium instance.
         *
         * @private
         */
        this.instance = instance;

        /**
         * Chromium instance promise.
         *
         * Cached to allow consistent return type after the instance is created.
         *
         * @private
         */
        this.requests = [];

        /**
         * Flag to indicate browser should close when requests are all finished.
         *
         * @private
         */
        this.pendingClose = false;

        /**
         * Flag to indicate browser has disconnected.
         *
         * @private
         */
        this.closed = false;
    }

    /**
     * Push a request to the pending array
     *
     * @param {string} uuid Request uuid
     * @public
     */
    pushRequest(uuid)
    {
        if (this.pendingClose)
        {
            throw new Error("Cannot add request to browser waiting to close");
        }

        this.requests.push(uuid);
    }

    /**
     * Pop a request off the pending array.
     *
     * Checks the pending close flag when the uuid represents the last remaining request
     * for this browser instance.
     *
     * @param {string} uuid Request uuid
     *
     * @returns {boolean} True if the request uuid was present
     * @public
     */
    popRequest(uuid)
    {
        const index = this.requests.indexOf(uuid);
        if (index === - 1)
        {
            return false;
        }

        this.requests.splice(index, 1);
        if (this.pendingClose && this.requests.length === 0)
        {
            this.flagForClosure();
        }

        return true;
    }

    /**
     * Mark the request for closure when all pending requests have completed.
     *
     * @returns {Promise}
     * @public
     */
    async flagForClosure()
    {
        this.pendingClose = true;
        if (this.requests.length === 0)
        {
            await this.close();
        }
    }

    /**
     * Close chromium instance
     *
     * @returns {Promise}
     * @private
     */
    async close()
    {
        if (! this.closed)
        {
            //
            // @TODO wrap this in try / catch?
            await this.instance.close();

            this.flagClosed();
        }
    }

    /**
     * Flag instance as closed.
     *
     * Trigger "close" event.
     * @private
     */
    flagClosed()
    {
        this.pendingClose = true;
        this.closed = true;
        this.emit("close", this);
    }

    /**
     * Fetch the instance
     *
     * @returns {puppeteer.Browser}
     * @throws {Error} If the instance is flagged for closure, or has been closed
     * @public
     */
    getInstance()
    {
        if (this.pendingClose)
        {
            throw new Error("Cannot fetch browser pending close");
        }

        return this.instance;
    }
}

module.exports = Browser;
