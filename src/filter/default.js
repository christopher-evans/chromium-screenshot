
class Default
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
            return this.defaultValue;
        }

        return this.source.filter(value);
    }

    /**
     * Desc
     *
     * @param value
     *
     * @returns {boolean}
     *
     * @private
     */
    empty(value)
    {
        return value === undefined;
    }
}

module.exports = Default;
