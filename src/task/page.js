/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const pageTask = (source, logger) =>
{
    const fetch = async browser =>
    {
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
            message => logger.debug(
                "Page console",
                {
                    "message": message.text()
                }
            )
        );

        page.on(
            "requestfailed",
            httpRequest => logger.warn(
                "HTTP failed request",
                {
                    "method": httpRequest.method(),
                    "url": httpRequest.url()
                }
            )
        );

        // @TODO cache parameter
        await page.setCacheEnabled(false);

        return page;
    };

    return async (browser, parameters) =>
    {
        // @TODO try / catch, log errors
        const page = await fetch(browser);
        const result = await source(page, parameters);

        if (! page.isClosed())
        {
            // close page asynchronously
            page.close()
                .catch(
                    error => logger.error(
                        "Unable to close page",
                        {
                            "error": error
                        }
                    )
                );
        }

        return result;
    };
};

module.exports = pageTask;
