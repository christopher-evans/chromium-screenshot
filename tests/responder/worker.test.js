/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const {
    it,
    afterEach,
    beforeEach,
    describe
} = require("mocha");
const sinon = require("sinon");
const asyncUtil = require("../async-util");
const { WorkerResponder } = require("../../src/responder");
const BrowserPool = require("../../src/browser-pool");

describe(
    "Responder: Worker",
    () =>
    {
        // dummy worker stops calls to actual worker
        // const worker = sinon.mock(new ImageWorker());
        const sandBox = sinon.createSandbox();

        describe(
            "#respond()",
            () =>
            {
                // stub logger method before each test
                beforeEach(() => false);

                // restore logger state after each test
                afterEach(() => sandBox.restore());

                it(
                    "should propagate errors from the worker",
                    async () =>
                    {
                        const error = new Error("ERROR");
                        const parameters = {};
                        const worker = sinon.stub();
                        const browserPool = sinon.createStubInstance(BrowserPool);
                        const responder = new WorkerResponder(worker, browserPool, () => "application/json");

                        worker.callsArgWith(2, error, null);

                        const result = await asyncUtil.unwrap(() => responder.respond(parameters));

                        assert.equal(result, error);
                    }
                );

                it(
                    "should identify content type",
                    async () =>
                    {
                        const results = {
                            "data": []
                        };
                        const parameters = {};
                        const worker = sinon.stub();
                        const browserPool = sinon.createStubInstance(BrowserPool);
                        const responder = new WorkerResponder(worker, browserPool, () => "application/json");

                        worker.callsArgWith(2, null, results);

                        const { contentType } = await asyncUtil.unwrap(() => responder.respond(parameters));
                        assert.equal(contentType, "application/json");
                    }
                );

                it(
                    "should propagate worker results",
                    async () =>
                    {
                        const bufferData = [255];
                        const parameters = {};
                        const worker = sinon.stub();
                        const browserPool = sinon.createStubInstance(BrowserPool);
                        const responder = new WorkerResponder(worker, browserPool, () => "application/json");

                        worker.callsArgWith(
                            2,
                            null,
                            {
                                "data": bufferData
                            }
                        );

                        const { content } = await asyncUtil.unwrap(() => responder.respond(parameters));
                        assert.deepEqual(content, Buffer.from(bufferData));
                    }
                );
            }
        );
    }
);
