/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { SimpleRoute } = require("../../src/route/index");

const ping = new SimpleRoute(
    () => ({
        "timestamp": Date.now()
    }),
    "application/json"
);

module.exports = ping;
