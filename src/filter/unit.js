/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const check = require("check-types");

class Unit
{
    constructor(regex)
    {
        this.regex = regex || Unit.defaultRegex;
    }

    filter(value)
    {
        if (! check.string(value))
        {
            throw new Error("invalid value: not a string");
        }

        if (! this.regex.test(value))
        {
            throw new Error("invalid unit: " + value);
        }

        return value;
    }
}

Unit.defaultRegex = /^\d+(?:\.\d+)?(?:cm|in|mm|px)$/i;

module.exports = Unit;
