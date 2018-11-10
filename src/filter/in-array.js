
class InArray
{
    constructor(haystack)
    {
        this.haystack = haystack;
    }

    filter(value)
    {
        if (! this.haystack.includes(value))
        {
            throw new Error("invalid value: '" + value + "'");
        }

        return value;
    }
}

module.exports = InArray;
