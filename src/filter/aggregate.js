
const check = require("check-types");

class Aggregate
{
    constructor(map)
    {
        if (! check.object(map))
        {
            throw new Error("invalid map: not an object");
        }

        this.map = map;
    }

    filter(object)
    {
        if (! check.object(object))
        {
            throw new Error("invalid input: not an object");
        }

        return Object.entries(this.map).reduce(
            (values, [key, filter]) =>
            {
                values[key] = filter.filter(object[key]);

                return values;
            },
            {}
        );
    }
}

module.exports = Aggregate;
