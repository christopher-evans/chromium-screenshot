/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Filter that returns a default if the input is empty.
 *
 * The default is the result of a callback function.
 *
 * Input is said to be empty if it is not `undefined`.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class DynamicDefault
{
    /**
     * DynamicDefault constructor.
     *
     * @param {{filter: Function}} source Source filter
     * @param {Function} defaultValue Default value callback
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
         * Default value callback.
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
            return this.defaultValue();
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

module.exports = DynamicDefault;
