/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const time = require("../time");

const imageTask = metrics =>
    async (page, parameters) =>
    {
        await page.setViewport(
            {
                "width": parameters.width,
                "height": parameters.height
            }
        );

        await page.goto(
            parameters.url,
            {
                "timeout": this.timeout,
                "waitUnit": this.waitUntil
            }
        );

        const screenshotParameters = {
            "type": parameters.imageFormat,
            "omitBackground": parameters.omitBackground
        };

        if (parameters.imageFormat === "jpeg")
        {
            screenshotParameters.quality = parameters.quality;
        }

        if (parameters.fullPage)
        {
            screenshotParameters.fullPage = true;
        }
        else
        {
            screenshotParameters.clip = {
                "x": 0,
                "y": 0,
                "width": parameters.width,
                "height": parameters.height
            };
        }
        const start = time.fetch();

        const result = await page.screenshot(screenshotParameters);

        metrics.timing("image.screenshot", time.ms(start), 0.1);

        return result;
    };

module.exports = imageTask;
