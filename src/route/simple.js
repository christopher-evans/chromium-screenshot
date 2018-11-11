/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Simple
{
    /**
     * Input constructor.

     * @param {{respond: Function}} responder Responder
     * @param {string} contentType Content type
     *
     * @public
     */
    constructor(responder, contentType)
    {
        /**
         * Responder.
         *
         * @private
         */
        this.responder = responder;

        /**
         * Response content type.
         *
         * @private
         */
        this.contentType = contentType;
    }

    /**
     * Create response and send.
     *
     * @param {http.ClientRequest} request HTTP request
     * @param {http.ServerResponder} response HTTP response
     *
     * @void
     * @public
     */
    route(request, response)
    {
        response.header("Content-Type", this.contentType);
        response.send(this.responder());
        response.end();
    }
}

module.exports = Simple;
