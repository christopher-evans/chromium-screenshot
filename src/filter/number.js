/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { FilterError } = require("../error");

const defaultParser = Number.parseInt;

const numberFilter = (min, max, parser) =>
{
    const finalParser = parser || defaultParser;

    return value =>
    {
        const clean = finalParser(value);

        if (! Number.isFinite(clean))
        {
            throw new FilterError("invalid value: not a number");
        }

        if (Number.isFinite(min) && clean < min)
        {
            throw new FilterError("invalid number: must be at least " + min);
        }

        if (Number.isFinite(max) && clean > max)
        {
            throw new FilterError("invalid number: must be at most " + max);
        }

        return clean;
    };
};

module.exports = numberFilter;
