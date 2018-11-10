/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Filter that validates input against an array of permitted values.
 *
 * Values may by any (mixed) type.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class InArray
{
    /**
     * InArray constructor.
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
     * @param {*} value
     *
     * @returns {*}
     * @throws {Error} If the value is not in the haystack
     * @public
     */
    filter(value)
    {
        if (! this.haystack.includes(value))
        {
            throw new Error("invalid value: '" + value + "'");
        }

        return value;
    }
}

module.exports = InArray;
