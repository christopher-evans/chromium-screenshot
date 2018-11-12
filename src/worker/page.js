/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Worker fetches a page from a Chromium instance.
 *
 * The page is passed to a child worker.
 *
 * @author Christopher Evans <cmevans@tutanota.com>
 */
class Page
{
    /**
     * Page constructor.

     * @param {{work: Function}} source Child worker
     * @param {cache} cache Enable / disable page cache
     * @param {winston.Logger} logger Target for errors
     *
     * @public
     */
    constructor(source, cache, logger)
    {
        this.source = source;
        this.cache = cache;
        this.logger = logger;
    }

    /**
     * Create page and pass to worker callback.
     *
     * @param {puppeteer.Browser} browser Chromium instance
     * @param {Object} request Screenshot parameters
     * @param {function} callback Worker callback
     *
     * @void
     * @public
     */
    async work(browser, request, callback)
    {
        try
        {
            const page = await this.page(browser);

            await this.source.work(page, request, callback);

            if (! page.isClosed())
            {
                // close page asynchronously
                page.close()
                    .catch(
                        error => this.logger.log(
                            "error",
                            "Unable to close page",
                            {
                                "error": error
                            }
                        )
                    );
            }
        }
        catch (error)
        {
            callback(error, null);
        }
    }

    /**
     * Create a browser page
     *
     * @param {puppeteer.Browser} browser Browser
     *
     * @void
     * @private
     */
    async page(browser)
    {
        const { logger } = this;
        const page = await browser.newPage();

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
            httpRequest => logger.log(
                "warn",
                "HTTP failed request",
                {
                    "method": httpRequest.method(),
                    "url": httpRequest.url()
                }
            )
        );

        await page.setCacheEnabled(this.cache);

        return page;
    }
}

module.exports = Page;
