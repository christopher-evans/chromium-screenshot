/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { FilterError } = require("../error");
const type = require("../type");

const subset = haystack =>
    value =>
    {
        if (! type.iterable(value))
        {
            throw new FilterError("invalid value: not iterable");
        }

        value.forEach(
            element =>
            {
                if (! haystack.has(element))
                {
                    throw new FilterError("invalid entry");
                }
            }
        );

        return value;
    };

module.exports = subset;
