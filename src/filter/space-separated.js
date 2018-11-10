
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
