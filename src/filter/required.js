/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
