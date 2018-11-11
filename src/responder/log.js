/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Action responding to log requests.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class Log
{
    /**
     * Log constructor.
     *
     * @param {winston.Logger} logger Logger instance
     *
     * @public
     */
    constructor(logger)
    {
        /**
         * Logger instance.
         *
         * @private
         */
        this.logger = logger;
    }

    /**
     * Create response for given request parameters.
     *
     * @param {Object} parameters
     *
     * @returns {Promise<Object>} Log query results
     * @public
     */
    respond(parameters)
    {
        return new Promise(
            (resolve, reject) =>
            {
                this.logger.query(
                    parameters,
                    (error, results) =>
                    {
                        if (error)
                        {
                            // @TODO wrap error for front end
                            return reject(error);
                        }

                        return resolve(
                            {
                                "content": results,
                                "contentType": "application/json"
                            }
                        );
                    }
                );
            }
        );
    }
}

module.exports = Log;
