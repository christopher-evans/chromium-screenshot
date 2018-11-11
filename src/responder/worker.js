/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Action responding to worker requests.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class Worker
{
    /**
     * Worker constructor.
     *
     * @param {function(Object): string} contentType Response content type
     * @param {Function} workers Worker farm
     *
     * @public
     */
    constructor(contentType, workers)
    {
        /**
         * Dynamic response content type.
         *
         * @private
         */
        this.contentType = contentType;

        /**
         * Queue worker.
         *
         * @private
         */
        this.workers = workers;
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
            (resolve, reject) =>
            {
                this.workers(
                    parameters,
                    (error, result) =>
                    {
                        if (error)
                        {
                            // @TODO wrap error for front end
                            return reject(error);
                        }

                        const buffer = Buffer.from(result.data);
                        return resolve(
                            {
                                "content": buffer,
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
