/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const process = require("process");

const fetch = () => process.hrtime();

const ms = start =>
{
    const current = process.hrtime();

    return (current[0] - start[0]) * 1000 + (current[1] - start[1]) / 1000000;
};

module.exports = {
    fetch,
    ms
};
