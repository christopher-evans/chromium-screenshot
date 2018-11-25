/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const http = require("http");

const middleware = async context =>
{
    const statusCode = 404;

    context.status = statusCode;
    context.body = { "error": http.STATUS_CODES[statusCode] };
};

const notFoundMiddleware = () => middleware;

module.exports = notFoundMiddleware;
