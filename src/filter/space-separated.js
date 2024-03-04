/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const check = require("check-types");

/**
 * Filter that splits space separated strings into an array.
 *
 * Empty strings are filtered from the result.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class SpaceSeparated
{
    /**
     * Apply filter to a value.
     *
     * @param {string} value
     *
     * @returns {Array} Array of values with not spaces.
     * @throws {TypeError} If the value is not a string
     * @public
     */
    filter(value)
    {
        if (! check.string(value))
        {
            throw new Error("invalid value: not a string");
        }

        return value.split(" ").filter(entry => entry.length > 0);
    }
}

module.exports = SpaceSeparated;
