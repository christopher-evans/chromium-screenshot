
const Browser = require("../src/browser");
const config = require("./config");
const logger = require("./logger");

// create browser
const browser = new Browser(config.browser_flags);

// don't reuse a single browser too long
setInterval(browser.clear, config.browser_restart_interval);

const enableCache = config.render_cache;
const timeout = config.render_timeout;
const waitUntil = config.render_wait_until;

module.exports = async (request, callback) =>
{
    const browserInstance = await browser.fetch();
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

    await page.setCacheEnabled(enableCache);
    await page.setViewport(
        {
            "width": request.width,
            "height": request.height
        }
    );
    await page.goto(
        request.url,
        {
            "timeout": timeout,
            "waitUnit": waitUntil
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

    callback(null, imageBuffer);
};
