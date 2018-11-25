/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { FilterError } = require("../error");

const inSet = haystack =>
    value =>
    {
        if (! haystack.has(value))
        {
            throw new FilterError("invalid value");
        }

        return value;
    };

module.exports = inSet;
