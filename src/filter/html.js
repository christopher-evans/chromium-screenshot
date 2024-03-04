/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const check = require("check-types");
const sanitizeHtml = require("sanitize-html");

/**
 * Filter that sanitizes html input.
 *
 * Uses the sanitize-html package.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class Html
{
    /**
     * Apply the filter to a value.
     *
     * @param {string} value
     *
     * @returns {string}
     * @throws {TypeError} If the input is not a string
     * @public
     */
    filter(value)
    {
        if (! check.string(value))
        {
            throw new TypeError("invalid html: not a string");
        }

        return sanitizeHtml(value);
    }
}

module.exports = Html;
