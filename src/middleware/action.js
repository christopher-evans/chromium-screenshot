/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const actionMiddleware = action =>
    async context =>
    {
        const { request } = context;

        context.body = await action(request.body);
    };

module.exports = actionMiddleware;
