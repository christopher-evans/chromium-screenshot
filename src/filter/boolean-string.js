/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const check = require("check-types");

/**
 * Filter that casts strings "" and "0" to `false`, and everything else to `true`.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class BooleanString
{
    /**
     * Apply filter to a value.
     *
     * @param {string} value
     *
     * @returns {boolean}
     * @throws {TypeError} If value is not a string
     * @public
     */
    filter(value)
    {
        if (! check.string(value))
        {
            throw new Error("invalid value: not a string");
        }

        return value.length !== 0 && value !== "0";
    }
}

module.exports = BooleanString;
