/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const defaultMessage = "Filter Error";

class FilterError extends Error
{
    constructor(message)
    {
        super(message || defaultMessage);

        this.name = "FilterError";
    }

    toString()
    {
        return this.message;
    }

    toJSON()
    {
        return this.message;
    }
}

module.exports = FilterError;
