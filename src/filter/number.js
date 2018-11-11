/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Filter that parses and validates integer values.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class NumberFilter
{
    /**
     * NumberFilter constructor.
     *
     * @param {number} min Minimum value
     * @param {number} max Maximum value
     * @param {number} parser Parser applied to input, defaults to `Number.parseInt`
     *
     * @public
     */
    constructor(min, max, parser)
    {
        /**
         * Minimum value.
         *
         * @private
         */
        this.min = min;

        /**
         * Maximum value.
         *
         * @private
         */
        this.max = max;

        /**
         * Parser applied to input.
         *
         * @private
         */
        this.parser = parser || NumberFilter.defaultParser;
    }

    /**
     * Apply filter to a value.
     *
     * @param {*} value
     *
     * @returns {number}
     * @throws {TypeError} If the value is not an array
     * @throws {Error} If the value cannot be parsed or lies outside min and max values.
     * @public
     */
    filter(value)
    {
        const clean = this.parser(value);
        if (! Number.isFinite(clean))
        {
            throw new Error("invalid number: " + value);
        }

        if (Number.isFinite(this.min) && clean < this.min)
        {
            throw new Error("invalid number: " + clean + " must be greater than " + this.min);
        }

        if (Number.isFinite(this.max) && clean > this.max)
        {
            throw new Error("invalid number: " + clean + " must be less than " + this.max);
        }

        return clean;
    }
}

NumberFilter.defaultParser = value => Number.parseInt(value, 10);

module.exports = NumberFilter;
