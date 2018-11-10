
const check = require("check-types");

class IsArray
{
    constructor(haystack)
    {
        this.haystack = haystack;
    }

    filter(value)
    {
        if (! check.array(value))
        {
            throw new Error("invalid value: '" + value + "' not an array");
        }

        const { haystack } = this;
        value.forEach(
            entry =>
            {
                if (haystack.indexOf(entry) === - 1)
                {
                    throw new Error("invalid value: " + entry);
                }
            }
        );

        return value;
    }
}

module.exports = IsArray;
