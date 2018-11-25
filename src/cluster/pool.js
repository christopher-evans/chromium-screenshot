/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const cluster = require("cluster");
const EventEmitter = require("events");

class WorkerPool extends EventEmitter
{
    constructor(size, workers, discard, respawnWait, logger)
    {
        super();

        this.size = size;
        this.workers = workers;
        this.discard = discard;
        this.respawnWait = respawnWait;
        this.logger = logger;
    }

    start()
    {
        while (this.workers.size < this.size)
        {
            this.spawn();
        }
    }

    spawn()
    {
        if (this.workers.size >= this.size)
        {
            // don't exceed max workers
            this.logger.warn("Unexpected call to spawn: size already met");

            return;
        }

        const worker = cluster.fork();
        const { pid } = worker.process;

        worker.on("disconnect", () => this.disconnect.call(this, worker));
        worker.on("exit", (code, signal) => this.disconnect.call(this, worker, code, signal));
        worker.on("message", message => this.emit("message", worker, message));

        this.workers.add(worker);
        this.logger.info("Worker started", { pid });
    }

    schedule()
    {
        setTimeout(this.spawn.bind(this), this.respawnWait);
    }

    remove(worker)
    {
        this.workers.delete(worker);
        this.schedule();

        const { pid } = worker.process;
        this.logger.info("Worker scheduled for re-spawn", { pid });
    }

    disconnect(worker)
    {
        const logInfo = {
            "pid": worker.process.pid,
            "dead": worker.isDead()
        };

        if (! this.workers.has(worker))
        {
            this.logger.notice("Worker disconnected but not in pool", logInfo);

            return;
        }

        this.discard.disconnected(worker);
        this.remove(worker);
    }

    exit(worker, code, signal)
    {
        const logInfo = {
            "pid": worker.process.pid,
            "connected": worker.isConnected(),
            "code": code,
            "signal": signal
        };

        if (! this.workers.has(worker))
        {
            this.logger.notice("Worker exited but not in pool", logInfo);

            return;
        }

        this.discard.exited(worker);
        this.remove(worker);
    }

    send(message, sendHandle, callback)
    {
        this.workers.forEach(worker => worker.send(message, sendHandle, callback));
    }
}

module.exports = WorkerPool;
