/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const image = require("./image");
const log = require("./log");
const ping = require("./ping");

module.exports = {
    "image": image,
    "log": log,
    "ping": ping
};
