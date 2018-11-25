/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { BrowserInstance, BrowserDiscard } = require("../src/browser");
const config = require("./config");
const logger = require("./logger");

// launch browser
const discardedBrowsers = new Set();

const browserDiscard = new BrowserDiscard(15 * 1000, discardedBrowsers, logger);
const browser = new BrowserInstance(
    {
        "args": ["--disable-dev-shm-usage", "--no-sandbox"]
    },
    browserDiscard,
    logger
);

// don't re-use a single instance too long
setInterval(browser.restart.bind(browser), 10 * 1000);

module.exports = browser;
