/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
