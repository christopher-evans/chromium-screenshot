/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const {
    afterEach,
    beforeEach,
    describe,
    it
} = require("mocha");
const sinon = require("sinon");
const asyncUtil = require("../async-util");
const queue = require("../../queue");
const { WorkerResponder } = require("../../src/responder");
const { ImageWorker } = require("../../src/worker");

describe(
    "Responder: Worker",
    () =>
    {
        // dummy worker stops calls to actual worker
        const worker = sinon.mock(new ImageWorker());
        const sandBox = sinon.createSandbox();

        describe(
            "#respond()",
            () =>
            {
                // stub logger method before each test
                beforeEach(() => sandBox.stub(queue, "push"));

                // restore logger state after each test
                afterEach(() => sandBox.restore());

                it(
                    "should propagate errors from the worker",
                    async () =>
                    {
                        const error = new Error("ERROR");
                        const parameters = {};
                        const responder = new WorkerResponder(() => "application/json", worker);

                        queue.push.callsArgWith(1, null, error);

                        assert.equal(
                            await asyncUtil.unwrap(() => responder.respond(parameters)),
                            error
                        );
                    }
                );

                it(
                    "should identify content type",
                    async () =>
                    {
                        const results = {};
                        const parameters = {};
                        const responder = new WorkerResponder(() => "application/json", worker);

                        queue.push.callsArgWith(1, results, null);

                        const { contentType } = await asyncUtil.unwrap(() => responder.respond(parameters));
                        assert.equal(contentType, "application/json");
                    }
                );

                it(
                    "should propagate worker results",
                    async () =>
                    {
                        const results = {};
                        const parameters = {};
                        const responder = new WorkerResponder(() => "application/json", worker);

                        queue.push.callsArgWith(1, results, null);

                        const { content } = await asyncUtil.unwrap(() => responder.respond(parameters));
                        assert.equal(content, results);
                    }
                );
            }
        );
    }
);
