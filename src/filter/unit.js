
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
