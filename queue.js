
const contra = require("contra");
const config = require("./config");

// create queue
const queue = contra.queue(
    (job, done) => job.process()
        .then(result => done(result, null))
        .catch(error => done(null, error)),
    config.worker_concurrency
);

module.exports = queue;
