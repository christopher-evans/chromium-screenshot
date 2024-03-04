/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const validUrl = require("valid-url");

/**
 * Filter that validates urls.
 *
 * Uses the valid-url package.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class Url
{
    /**
     * Apply filter to a value.
     *
     * @param {string} value
     *
     * @returns {string} Identical in input parameter
     * @throws {Error} If the input is not a valid URL.
     * @public
     */
    filter(value)
    {
        if (! validUrl.isUri(value))
        {
            throw new Error("invalid URL");
        }

        return value;
    }
}

module.exports = Url;
