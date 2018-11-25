/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const regexFilter = require("./regex");
const { FilterError } = require("../error");

const dateRegex = new RegExp(
    "^\\d{4}-\\d{2}-\\d{2}" + // Match YYYY-MM-DD
    "((T\\d{2}:\\d{2}(:\\d{2})?)" + // Match THH:mm:ss
    "(\\.\\d{1,6})?" + // Match .sssss
    "(Z|(\\+|-)\\d{2}:\\d{2})?)?$" // Time zone (Z or +hh:mm)
);

const sourceFilter = regexFilter(dateRegex);
const filter = value =>
{
    const checkedValue = sourceFilter(value);

    const unixMilliseconds = Date.parse(checkedValue);
    if (Number.isNaN(unixMilliseconds))
    {
        throw new FilterError("failed to parse date '" + checkedValue + "'");
    }

    return new Date(unixMilliseconds);
};

const dateFilter = () => filter;

module.exports = dateFilter;
