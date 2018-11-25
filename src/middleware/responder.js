/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const defaultType = "json";

const responderMiddleware = (responder, contentType) =>
{
    const finalType = contentType || defaultType;

    return async context =>
    {
        context.type = finalType;
        context.body = responder();
    };
};

module.exports = responderMiddleware;
