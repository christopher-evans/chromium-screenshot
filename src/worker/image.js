/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Worker taking a screenshot of a given URL
 *
 * Uses a Chromium instance to render the page as an image.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class Image
{
    /**
     * Image constructor.

     * @param {number} timeout Page timeout
     * @param {Array} waitUntil Array of events that should be triggered before the screenshot is taken
     *
     * @public
     */
    constructor(timeout, waitUntil)
    {
        this.timeout = timeout;
        this.waitUntil = waitUntil;
    }

    /**
     * Create screenshot and pass to worker callback.
     *
     * @param {puppeteer.Page} page Browser page
     * @param {Object} request Screenshot parameters
     * @param {function} callback Worker callback
     *
     * @void
     * @public
     */
    async work(page, request, callback)
    {
        try
        {
            callback(null, await this.screenshot(page, request));
        }
        catch (error)
        {
            callback(error, null);
        }
    }

    /**
     * Create screenshot from a browser and screenshot parameters.
     *
     * @param {puppeteer.Page} page Browser page
     * @param {Object} request Screenshot parameters
     *
     * @void
     * @private
     */
    async screenshot(page, request)
    {
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

        return page.screenshot(screenshotParameters);
    }
}

module.exports = Image;
