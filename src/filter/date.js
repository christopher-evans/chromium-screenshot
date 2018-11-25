/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { FilterError } = require("../error");
const type = require("../type");

const regex = new RegExp(
    "^\\d{4}-\\d{2}-\\d{2}" + // Match YYYY-MM-DD
    "((T\\d{2}:\\d{2}(:\\d{2})?)" + // Match THH:mm:ss
    "(\\.\\d{1,6})?" + // Match .sssss
    "(Z|(\\+|-)\\d{2}:\\d{2})?)?$" // Time zone (Z or +hh:mm)
);

const filter = value =>
{
    if (! type.string(value))
    {
        throw new FilterError("invalid date: not a string");
    }

    if (! regex.test(value))
    {
        throw new FilterError("invalid date '" + value + "': format not recognised");
    }

    const date = Date.parse(value);
    if (Number.isNaN(date))
    {
        throw new FilterError("failed to parse date '" + value + "'");
    }

    return date;
};

const date = () => filter;

module.exports = date;
