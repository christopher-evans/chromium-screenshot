/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const {
    describe,
    it
} = require("mocha");
const sinon = require("sinon");
const { ImageWorker } = require("../src/worker");
const Job = require("../src/job");

describe(
    "Job",
    () =>
    {
        describe(
            "#process()",
            () =>
            {
                it(
                    "should pass requests to the worker",
                    () =>
                    {
                        const request = {};
                        const response = {};
                        const worker = sinon.createStubInstance(ImageWorker);

                        worker.work.returns(response);

                        const job = new Job(request, worker);

                        assert.equal(job.process(), response);
                    }
                );
            }
        );
    }
);
