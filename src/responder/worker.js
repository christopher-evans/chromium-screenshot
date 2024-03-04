/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const uuidv4 = require("uuid/v4");

/**
 * Action responding to worker requests.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class Worker
{
    /**
     * Worker constructor.
     *
     * @param {Function} workers Worker farm
     * @param {BrowserPool} browserPool Browser pool
     * @param {function(Object): string} contentType Response content type
     *
     * @public
     */
    constructor(workers, browserPool, contentType)
    {
        /**
         * Queue worker.
         *
         * @private
         */
        this.workers = workers;

        /**
         * Browser.
         *
         * @private
         */
        this.browserPool = browserPool;

        /**
         * Dynamic response content type.
         *
         * @private
         */
        this.contentType = contentType;
    }

    /**
     * Create response for given request parameters.
     *
     * @param {Object} parameters
     *
     * @returns {Promise<Object>} Worker output
     * @public
     */
    respond(parameters)
    {
        return new Promise(
            async (resolve, reject) =>
            {
                // push request to the worker queue
                const uuid = uuidv4();
                const wsEndpoint = await this.browserPool.pushRequest(uuid);

                this.workers(
                    wsEndpoint,
                    parameters,
                    (error, result) =>
                    {
                        // pop request off the worker queue
                        this.browserPool.popRequest(uuid);


                        if (error)
                        {
                            // @TODO make error generic for front end
                            return reject(error);
                        }

                        return resolve(
                            {
                                "content": Buffer.from(result.data),
                                "contentType": this.contentType(parameters)
                            }
                        );
                    }
                );
            }
        );
    }
}

module.exports = Worker;
