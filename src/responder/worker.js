/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const queue = require("../../queue");
const Job = require("../job");

class Worker
{
    constructor(contentType, worker)
    {
        this.contentType = contentType;
        this.worker = worker;
    }

    respond(parameters)
    {
        return new Promise(
            (resolve, reject) =>
            {
                // add request to queue
                queue.push(
                    new Job(parameters, this.worker),
                    (result, error) =>
                    {
                        if (error)
                        {
                            // @TODO wrap error for front end
                            return reject(error);
                        }

                        return resolve(
                            {
                                "content": result,
                                "contentType": this.contentType(parameters)
                            }
                        );
                    }
                );
            }
        );
    }
}

module.exports = Worker;
