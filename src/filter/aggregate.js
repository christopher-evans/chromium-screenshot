/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const { AggregateError, FilterError } = require("../error");
const type = require("../type");

const aggregate = map =>
    value =>
    {
        if (! type.object(value))
        {
            throw new FilterError("invalid aggregate: not an object");
        }

        const result = {};
        const errors = new Map();
        map.forEach(
            (filter, key) =>
            {
                try
                {
                    result[key] = filter(value[key]);
                }
                catch (error)
                {
                    // @TODO add key to error message
                    errors.set(key, error);
                }
            }
        );

        if (errors.size > 0)
        {
            // @TODO create aggregate error
            throw new AggregateError(errors, "Invalid input");
        }

        return result;
    };

module.exports = aggregate;
