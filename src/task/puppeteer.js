/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const browserState = require("../state/browser");

const puppeteerTask = (source, logger) =>
{
    const state = browserState();

    return async parameters =>
    {
        // @TODO try / catch, log errors
        const browser = await state();

        return source(browser, parameters);
    };
};

module.exports = puppeteerTask;
