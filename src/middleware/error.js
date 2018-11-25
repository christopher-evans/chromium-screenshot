/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const http = require("http");

const errorMiddleware = logger =>
    async (context, next) =>
    {
        try
        {
            await next();
        }
        catch (error)
        {
            const statusCode = 500;

            // log
            console.log(error);
            logger.error(
                "Uncaught middleware error",
                {
                    "error": error,
                    "request": context.request
                }
            );

            // write response
            context.status = statusCode;
            context.body = { "error": http.STATUS_CODES[statusCode] };
        }
    };

module.exports = errorMiddleware;
