/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const check = require("check-types");

/**
 * Filter that validates array input against an array of permitted values.
 *
 * Each value in the input array must be present in the haystack of permitted values.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class IsArray
{
    /**
     * IsArray constructor.
     *
     * @param {Array} haystack Permitted values
     *
     * @public
     */
    constructor(haystack)
    {
        /**
         * Permitted values.
         *
         * @private
         */
        this.haystack = haystack;
    }

    /**
     * Apply filter to a value.
     *
     * @param {Array} value
     *
     * @returns {Array}
     * @throws {TypeError} If the value is not an array
     * @throws {Error} If the value is not in the haystack
     * @public
     */
    filter(value)
    {
        if (! check.array(value))
        {
            throw new TypeError("invalid value: '" + value + "' not an array");
        }

        const { haystack } = this;
        value.forEach(
            entry =>
            {
                if (haystack.indexOf(entry) === - 1)
                {
                    throw new Error("invalid value: " + entry);
                }
            }
        );

        return value;
    }
}

module.exports = IsArray;
