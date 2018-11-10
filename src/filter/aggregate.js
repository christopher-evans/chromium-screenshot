/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const check = require("check-types");

/**
 * Applies a hash map of filters to a hash map of values.
 *
 * Input must be an object of key value pairs, values can be mixed.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class Aggregate
{
    /**
     * Aggregate constructor.
     *
     * @param {Object.<string, {filter: Function}>} map Hash map of filters
     *
     * @throws {TypeError} If the map is not an object
     * @public
     */
    constructor(map)
    {
        if (! check.object(map))
        {
            throw new TypeError("invalid map: not an object");
        }

        /**
         * Hash map of filters.
         *
         * @private
         */
        this.map = map;
    }

    /**
     * Apply filters to a hash map.
     *
     * @param {Object.<string, *>} object Hash map of values
     *
     * @returns {Object.<string, *>}
     * @throws {TypeError} If value is not an object
     * @public
     */
    filter(object)
    {
        if (! check.object(object))
        {
            throw new TypeError("invalid input: not an object");
        }

        return Object.entries(this.map).reduce(
            (values, [key, filter]) =>
            {
                values[key] = filter.filter(object[key]);

                return values;
            },
            {}
        );
    }
}

module.exports = Aggregate;
