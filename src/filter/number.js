
class NumberFilter
{
    constructor(min, max, parser)
    {
        this.min = min;
        this.max = max;
        this.parser = parser || NumberFilter.defaultParser;
    }

    filter(value)
    {
        const clean = this.parser(value);
        if (! Number.isFinite(clean))
        {
            throw new Error("invalid number: " + value);
        }

        if (Number.isFinite(this.min) && clean < this.min)
        {
            throw new Error("invalid number: " + clean + " must be greater than " + this.min);
        }

        if (Number.isFinite(this.max) && clean > this.max)
        {
            throw new Error("invalid number: " + clean + " must be less than " + this.max);
        }

        return clean;
    }
}

NumberFilter.defaultParser = value => Number.parseInt(value, 10);

module.exports = NumberFilter;
