/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const logger = require("../../logger");

class ImageWorker
{
    constructor(browser, enableCache, timeout, waitUntil)
    {
        this.browser = browser;
        this.enableCache = enableCache;
        this.timeout = timeout;
        this.waitUntil = waitUntil;
    }

    async work(request)
    {
        const browserInstance = await this.browser.fetch();
        const page = await browserInstance.newPage();
        const notices = [];

        // add listeners
        page.on(
            "error",
            error =>
            {
                throw error;
            }
        );
        page.on(
            "pageerror",
            error =>
            {
                throw error;
            }
        );

        // @TODO make notices an object keyed by level
        // then push to different levels
        page.on(
            "console",
            message => logger.log(
                "debug",
                "Page console",
                {
                    "message": message.text()
                }
            )
        );

        page.on(
            "requestfailed",
            httpRequest =>
            {
                notices.push("Failed HTTP request: '" + httpRequest.method() + " " + httpRequest.url() + "'");

                logger.log(
                    "warn",
                    "HTTP failed request",
                    {
                        "method": httpRequest.method(),
                        "url": httpRequest.url()
                    }
                );
            }
        );

        await page.setCacheEnabled(this.enableCache);
        await page.setViewport(
            {
                "width": request.width,
                "height": request.height
            }
        );
        await page.goto(
            request.url,
            {
                "timeout": this.timeout,
                "waitUnit": this.waitUntil
            }
        );

        const screenshotParameters = {
            "type": request.imageFormat,
            "omitBackground": request.omitBackground
        };

        if (request.imageFormat === "jpeg")
        {
            screenshotParameters.quality = request.quality;
        }

        if (request.fullPage)
        {
            screenshotParameters.fullPage = true;
        }
        else
        {
            screenshotParameters.clip = {
                "x": 0,
                "y": 0,
                "width": request.width,
                "height": request.height
            };
        }

        const imageBuffer = await page.screenshot(screenshotParameters);

        // close page asynchronously
        page.close()
            .catch(
                error => logger.log(
                    "error",
                    "Unable to close page",
                    {
                        "error": error
                    }
                )
            );

        return imageBuffer;
    }
}

module.exports = ImageWorker;
