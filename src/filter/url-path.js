/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const url = require("url");

/**
 * Filter that validates url paths.
 *
 * Uses the url core package.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class UrlPath
{
    /**
     * Apply filter to a value.
     *
     * @param {string} value
     *
     * @returns {string} The path component of the input considered as a URL, encoded if necessary
     * @throws {Error} If the input is not a string
     * @public
     */
    filter(value)
    {
        return url.parse(value).path;
    }
}

module.exports = UrlPath;
