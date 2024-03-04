/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const check = require("check-types");
const isostring = require("isostring");

/**
 * Filter that parses ISO8601 dates into a Date object.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class DateFilter
{
    /**
     * Apply filter to a value.
     *
     * @param {string} value
     *
     * @returns {Date}
     * @throws {TypeError} If value is not a string
     * @public
     */
    filter(value)
    {
        if (! check.string(value) || ! isostring(value))
        {
            throw new Error("invalid date: '" + value + "'");
        }

        return new Date(value);
    }
}

module.exports = DateFilter;
