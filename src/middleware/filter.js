/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { FilterError } = require("../error");

const filterMiddleware = filter =>
    async (context, next) =>
    {
        const { request } = context;

        try
        {
            request.body = filter(request.body);
        }
        catch (error)
        {
            if (error instanceof FilterError)
            {
                // write response
                context.status = 422;
                context.body = { error };

                return;
            }

            throw error;
        }

        await next();
    };

module.exports = filterMiddleware;
