/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Filter that casts all input to boolean.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class Boolean
{
    /**
     * Apply filter to a value.
     *
     * @param {*} value
     *
     * @returns {boolean}
     * @public
     */
    filter(value)
    {
        return !! value;
    }
}

module.exports = Boolean;
