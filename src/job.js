/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Job
{
    constructor(request, worker)
    {
        this.request = request;
        this.worker = worker;
    }

    process()
    {
        return this.worker.work(this.request);
    }
}

module.exports = Job;
