/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class BrowserDiscard
{
    constructor(discardTimeout, instances, logger)
    {
        this.discardTimeout = discardTimeout;
        this.instances = instances;
        this.logger = logger;
    }

    restarted(instance)
    {
        // add to pool so we can track closures
        this.instances.add(instance);

        // set a hard limit on time to close browser
        setTimeout(this.close.bind(this), this.discardTimeout, instance);

        this.logger.info("Browser queued for closure");
    }

    isClosed(instance)
    {
        return ! this.instances.has(instance);
    }

    async close(instance)
    {
        if (this.isClosed(instance))
        {
            return;
        }

        await instance.close();
        this.instances.delete(instance);

        this.logger.info("Browser closed");
    }
}

module.exports = BrowserDiscard;
