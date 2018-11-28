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
    constructor(message, errors)
    {
        super(message);

        this.name = "AggregateError";
        this.errors = errors;
    }

    toString()
    {
        let formatted = "Aggregate Error";

        if (this.errors.size === 0)
        {
            formatted += ": \n";
        }

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
