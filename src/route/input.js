/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Route that parses parameters from request body and passes them to a responder.
 *
 * Returns 400 if the request parameters cannot be parsed.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class Input
{
    /**
     * Input constructor.

     * @param {{respond: Function}} responder Responder
     * @param {{filter: Function}} filter Filter
     *
     * @public
     */
    constructor(responder, filter)
    {
        /**
         * Responder.
         *
         * @private
         */
        this.responder = responder;

        /**
         * Filter.
         *
         * @private
         */
        this.filter = filter;
    }

    /**
     * Create response and send for given request parameters.
     *
     * @param {http.ClientRequest} request HTTP request
     * @param {http.ServerResponder} response HTTP response
     * @param {Function} next Next middleware
     *
     * @void
     * @public
     */
    route(request, response, next)
    {
        let parameters;

        try
        {
            parameters = this.filter.filter(request.body);
        }
        catch (error)
        {
            response.status(400);
            response.json(
                {
                    "error": true,
                    "message": "Invalid request parameters",
                    "detail": {
                        "body": request.body,
                        "detail": error.message
                    }
                }
            );
            response.end();

            return;
        }

        this.responder.respond(parameters)
            .then(
                ({ content, contentType }) =>
                {
                    response.header("Content-Type", contentType);
                    response.send(content);
                    response.end();
                },
                error => next(error)
            );
    }
}

module.exports = Input;
