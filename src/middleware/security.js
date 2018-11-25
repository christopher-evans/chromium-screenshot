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
            "Content-Security-Policy": "default-src 'none'",
            "Referrer-Policy": "no-referrer",
            "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
            "X-Content-Type-Options": "nosniff",
            "X-DNS-Prefetch-Control": "off",
            "X-Frame-Options": "deny",
            "X-XSS-Protection": "1; mode-block"
        }
    );
};

const securityMiddleware = () => middleware;

module.exports = securityMiddleware;
