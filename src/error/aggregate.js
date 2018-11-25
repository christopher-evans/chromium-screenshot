/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// @TODO and json serialization for logger

const FilterError = require("./filter");

class AggregateError extends FilterError
{
    constructor(errors, message)
    {
        super(message);

        this.name = "AggregateError";
        this.errors = errors;
    }

    toString()
    {
        if (this.errors.size === 0)
        {
            return super.toString();
        }

        let formatted = "Filter Error:\n";
        this.errors.forEach((error, key) => formatted += "\t" + key + ": " + error.message);

        return formatted;
    }

    toJSON()
    {
        const json = {};

        this.errors.forEach((error, key) => json[key] = error.message);

        return json;
    }
}

module.exports = AggregateError;
