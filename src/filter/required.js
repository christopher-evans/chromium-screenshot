/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { FilterError } = require("../error");
const type = require("../type");

const required = source =>
    value =>
    {
        if (type.undefined(value))
        {
            throw new FilterError("value is required");
        }

        return source(value);
    };

module.exports = required;
