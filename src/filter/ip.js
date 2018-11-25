/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const validateIp = require("validate-ip-node");
const { FilterError } = require("../error");
const type = require("../type");

const filter = value =>
{
    if (! type.string(value))
    {
        throw new FilterError("invalid ip: not a string");
    }

    if (! validateIp(value))
    {
        throw new FilterError("invalid ip: unable to parse IP");
    }

    return value;
};

const ipFilter = () => filter;

module.exports = ipFilter;
