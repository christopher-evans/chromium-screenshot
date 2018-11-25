/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const type = require("../type");

const dynamicDefault = (source, defaultValue) =>
    value =>
    {
        if (type.undefined(value))
        {
            return defaultValue();
        }

        return source(value);
    };

module.exports = dynamicDefault;
