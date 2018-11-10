
const check = require("check-types");
const isostring = require("isostring");

class DateFilter
{
    filter(value)
    {
        if (! check.string(value) || ! isostring(value))
        {
            throw new Error("invalid date: '" + value + "'");
        }

        return new Date(value);
    }
}

module.exports = DateFilter;
