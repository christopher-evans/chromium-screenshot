/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class WorkerDiscard
{
    constructor(workers, discardTimeout, logger)
    {
        this.workers = workers;
        this.discardTimeout = discardTimeout;
        this.logger = logger;
    }

    disconnected(worker)
    {
        if (worker.isDead())
        {
            // worker is dead and disconnected
            return;
        }

        const { pid } = worker.process;
        this.logger.info("Worker disconnected but not dead", { pid });
        this.workers.add(worker);
        this.schedule(worker);
    }

    exited(worker)
    {
        if (! worker.isConnected())
        {
            // worker is dead and disconnected
            return;
        }

        const { pid } = worker.process;
        this.logger.info("Worker dead but not disconnected", { pid });
        this.workers.add(worker);
        this.schedule(worker);
    }

    schedule(worker)
    {
        setTimeout(this.clean.bind(this), this.discardTimeout, worker);
    }

    clean(worker)
    {
        if (! worker.isDead())
        {
            // @TODO send SIGTERM?
            const { pid } = worker.process;
            this.logger.warn("Worker dead but not disconnected", { worker, pid });
        }

        if (worker.isConnected())
        {
            // @TODO disconnect?
            const { pid } = worker.process;
            this.logger.warn("Worker disconnected but not dead", { worker, pid });
        }

        this.workers.delete(worker);
    }
}

module.exports = WorkerDiscard;
