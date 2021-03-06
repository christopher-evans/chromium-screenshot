/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Image = require("./image");
const Page = require("./page");
const Puppeteer = require("./puppeteer");

module.exports = {
    "ImageWorker": Image,
    "PageWorker": Page,
    "PuppeteerWorker": Puppeteer
};
