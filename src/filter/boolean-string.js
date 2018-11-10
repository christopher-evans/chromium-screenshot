
const check = require("check-types");

class BooleanString
{
    filter(value)
    {
        if (! check.string(value))
        {
            throw new Error("invalid value: not a string");
        }

        return value.length !== 0 && value !== "0";
    }
}

module.exports = BooleanString;
