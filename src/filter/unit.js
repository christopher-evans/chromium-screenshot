/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const check = require("check-types");

/**
 * Filter that validated units of measure.
 *
 * Permissible units may be configured with a regex, by default `cm`, `in`, `mm` and `px` are allowed.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class Unit
{
    /**
     * Unit constructor.
     *
     * @param {RegExp} regex Regex to validate input
     * @public
     */
    constructor(regex)
    {
        this.regex = regex || Unit.defaultRegex;
    }

    /**
     * Apply filter to a value.
     *
     * @param {string} value
     *
     * @returns {string} Identical in input parameter
     * @throws {TypeError} If the value is not a string
     * @throws {Error} If the regex does not match the input
     * @public
     */
    filter(value)
    {
        if (! check.string(value))
        {
            throw new Error("invalid value: not a string");
        }

        if (! this.regex.test(value))
        {
            throw new Error("invalid unit: " + value);
        }

        return value;
    }
}

/**
 * Default regex used to validate units.
 *
 * @private
 */
Unit.defaultRegex = /^\d+(?:\.\d+)?(?:cm|in|mm|px)$/i;

module.exports = Unit;
