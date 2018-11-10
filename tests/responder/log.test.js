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
const logger = require("../../logger");
const { LogResponder } = require("../../src/responder");

describe(
    "Responder: Log",
    () =>
    {
        const responder = new LogResponder(logger);
        const sandBox = sinon.createSandbox();

        describe(
            "#respond()",
            () =>
            {
                // stub logger method before each test
                beforeEach(() => sandBox.stub(logger, "query"));

                // restore logger state after each test
                afterEach(() => sandBox.restore());

                it(
                    "should propagate errors from the logger",
                    async () =>
                    {
                        const parameters = {};
                        const error = new Error("ERROR");

                        logger.query.callsArgWith(1, error, null);

                        assert.equal(
                            await asyncUtil.unwrap(() => responder.respond(parameters)),
                            error
                        );
                    }
                );

                it(
                    "should identify content as JSON",
                    async () =>
                    {
                        const parameters = {};
                        const results = {};

                        logger.query.callsArgWith(1, null, results);

                        const { contentType } = await asyncUtil.unwrap(() => responder.respond(parameters));
                        assert.equal(contentType, "application/json");
                    }
                );

                it(
                    "should propagate log query results",
                    async () =>
                    {
                        const parameters = {};
                        const results = {};

                        logger.query.callsArgWith(1, null, results);

                        const { content } = await asyncUtil.unwrap(() => responder.respond(parameters));
                        assert.equal(content, results);
                    }
                );
            }
        );
    }
);
