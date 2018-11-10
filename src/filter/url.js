/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const validUrl = require("valid-url");

class Url
{
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
