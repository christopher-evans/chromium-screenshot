/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const imageTask = require("./image");
const pageTask = require("./page");
const puppeteerTask = require("./puppeteer");

module.exports =
    {
        imageTask,
        pageTask,
        puppeteerTask
    };
