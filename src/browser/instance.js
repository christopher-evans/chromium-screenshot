/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const EventEmitter = require("events");
const puppeteer = require("puppeteer");

class BrowserInstance extends EventEmitter
{
    constructor(settings, discard, logger)
    {
        super();

        this.settings = settings;
        this.discard = discard;
        this.logger = logger;
        this.instance = null;
        // cache the listener so we can make on/off calls
        this.listener = this.disconnected.bind(this);
    }

    async launch()
    {
        const instance = await puppeteer.launch(this.settings);
        const process = await instance.process();

        instance.on("disconnected", this.listener);

        this.logger.info(
            "Browser started",
            {
                "pid": process.pid
            }
        );

        this.instance = instance;

        this.emit("launch", instance);
    }

    async restart()
    {
        // fetch old instance
        const { instance } = this;

        // don't listen for disconnect on old instance
        instance.off("disconnected", this.listener);

        // create new instance
        await this.launch();

        // discard old instance
        this.discard.restarted(instance);
    }

    async disconnected()
    {
        this.instance = null;

        await this.launch();

        this.logger.error("Browser disconnected");
    }

    wsEndpoint()
    {
        if (! this.instance)
        {
            return "";
        }

        return this.instance.wsEndpoint();
    }
}

module.exports = BrowserInstance;
