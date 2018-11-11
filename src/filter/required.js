/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Filter that throws an error if the input is empty.
 *
 * A Required filter wraps another filter which is applied for non-empty input.
 *
 * Input is said to be empty if it is not `undefined`.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class Required
{
    /**
     * Required constructor.
     *
     * @param {{filter: Function}} source Source filter
     * @public
     */
    constructor(source)
    {
        this.source = source;
    }

    /**
     * Apply filter to a value.
     *
     * @param {*} value
     *
     * @returns {*}
     * @throws {Error} If the value is empty
     * @public
     */
    filter(value)
    {
        if (this.empty(value))
        {
            throw new Error("value is required");
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

module.exports = Required;
