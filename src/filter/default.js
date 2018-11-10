/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Filter that returns a default if the input is empty.
 *
 * A Default filter wraps another filter which is applied for non-empty input.
 *
 * Input is said to be empty if it is not `undefined`.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class Default
{
    /**
     * Default constructor.
     *
     * @param {{filter: Function}} source Source filter
     * @param {*} defaultValue Default value
     * @public
     */
    constructor(source, defaultValue)
    {
        /**
         * Source filter.
         *
         * @private
         */
        this.source = source;

        /**
         * Default value.
         *
         * @private
         */
        this.defaultValue = defaultValue;
    }

    /**
     * Apply filter to a value.
     *
     * @param {*} value
     *
     * @returns {*}
     * @public
     */
    filter(value)
    {
        if (this.empty(value))
        {
            return this.defaultValue;
        }

        return this.source.filter(value);
    }

    /**
     * Determine if a value is empty.
     *
     * @param {*} value
     *
     * @returns {boolean}
     * @private
     */
    empty(value)
    {
        return value === undefined;
    }
}

module.exports = Default;
