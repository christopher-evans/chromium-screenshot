/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { FilterError } = require("../error");
const type = require("../type");

const regexFilter = regex =>
    value =>
    {
        if (! type.string(value))
        {
            throw new FilterError("invalid value: not a string");
        }

        if (! regex.test(value))
        {
            throw new FilterError("invalid value: " + value);
        }

        return value;
    };

module.exports = regexFilter;
