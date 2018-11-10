
class Required
{
    constructor(source)
    {
        this.source = source;
    }

    filter(value)
    {
        if (this.empty(value))
        {
            throw new Error("value is required");
        }

        return this.source.filter(value);
    }

    empty(value)
    {
        return value === undefined;
    }
}

module.exports = Required;
