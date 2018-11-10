/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const check = require("check-types");

class SpaceSeparated
{
    filter(value)
    {
        if (! check.string(value))
        {
            throw new Error("invalid value: not a string");
        }

        return value.split(" ").filter(entry => entry.length > 0);
    }
}

module.exports = SpaceSeparated;
