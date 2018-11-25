/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const sanitizeHtml = require("sanitize-html");
const { FilterError } = require("../error");
const type = require("../type");

const htmlFilter = settings =>
    value =>
    {
        if (type.string(value))
        {
            throw new FilterError("invalid html: not a string");
        }

        return sanitizeHtml(value, settings);
    };

module.exports = htmlFilter;
