/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const middleware = async (context, next) =>
{
    await next();

    context.set(
        {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Expires": "0",
            "Pragma": "no-cache",
            "Surrogate-Control": "no-store"
        }
    );
};

const cacheMiddleware = () => middleware;

module.exports = cacheMiddleware;
