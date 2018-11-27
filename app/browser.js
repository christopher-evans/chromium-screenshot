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

const browserDiscard = new BrowserDiscard(config.get("browser_discard_timeout"), discardedBrowsers, logger);
const browser = new BrowserInstance(
    {
        "args": config.get("chrome_flags")
    },
    browserDiscard,
    logger
);

// don't re-use a single instance too long
setInterval(browser.restart.bind(browser), config.get("chrome_timeout"));

module.exports = browser;
