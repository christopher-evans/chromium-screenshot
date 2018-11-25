/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const time = require("../time");

const requestLogMiddleware = (logger, metrics) =>
    async (context, next) =>
    {
        const start = time.fetch();

        await next();

        const { request, response } = context;
        logger.info(
            "HTTP",
            {
                "host": request.host,
                "ip": request.ip,
                "method": request.method,
                "url": request.url,
                "length": response.length,
                "status": response.status
            }
        );

        metrics.increment("http.request");
        metrics.set("http.status", response.status);
        metrics.timing("http.time", time.ms(start), 0.1);
    };

module.exports = requestLogMiddleware;
