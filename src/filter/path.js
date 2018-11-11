/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const path = require("path");

/**
 * Filter that resolved file paths to absolute paths.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class Path
{
    /**
     * Apply filter to a value.
     *
     * @param {string} value
     *
     * @returns {string} Absolute file path
     * @throws {Error} If the value is not a string
     * @public
     */
    filter(value)
    {
        return path.resolve(value);
    }
}

module.exports = Path;
