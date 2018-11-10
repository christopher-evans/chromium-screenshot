/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const path = require("path");

class Path
{
    filter(value)
    {
        return path.resolve(value);
    }
}

module.exports = Path;
