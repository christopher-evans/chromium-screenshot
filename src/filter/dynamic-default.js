
const check = require("check-types");

class DynamicDefault
{
    constructor(source, defaultValue)
    {
        this.source = source;
        this.defaultValue = defaultValue;
    }

    filter(value)
    {
        if (this.empty(value))
        {
            return this.defaultValue();
        }

        return this.source.filter(value);
    }

    empty(value)
    {
        return value === undefined;
    }
}

module.exports = DynamicDefault;
