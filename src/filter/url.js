/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const validUrl = require("valid-url");
const { FilterError } = require("../error");
const type = require("../type");

const filter = value =>
{
    if (! type.string(value))
    {
        throw new FilterError("invalid url: not a string");
    }

    if (! validUrl.isUri(value))
    {
        throw new FilterError("invalid url: unable to parse URL");
    }

    return value;
};

const urlFilter = () => filter;

module.exports = urlFilter;
