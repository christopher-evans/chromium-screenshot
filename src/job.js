
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
