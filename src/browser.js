
const puppeteer = require("puppeteer");

class Browser
{
    constructor(flags)
    {
        this.flags = flags;
    }

    fetch()
    {
        if (! this.promise)
        {
            this.promise = puppeteer.launch(
                {
                    "args": this.flags
                }
            )
                .then(
                    instance =>
                    {
                        // listen for browser closed / crashed
                        instance.on("disconnected", this.clear.bind(this));

                        this.instance = instance;

                        return instance;
                    }
                );
        }

        return this.promise;
    }

    clear()
    {
        const { instance } = this;
        if (instance)
        {
            instance.close();
        }

        // set null here in case something else runs before the "disconnected" event
        this.instance = null;
        this.promise = null;
    }
}

module.exports = Browser;
