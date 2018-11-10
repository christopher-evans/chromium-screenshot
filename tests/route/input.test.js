
const assert = require("assert");
const {
    describe,
    it
} = require("mocha");
const sinon = require("sinon");
const httpMocks = require("node-mocks-http");
const { InputRoute } = require("../../src/route");
const { BooleanFilter } = require("../../src/filter");
const { LogResponder } = require("../../src/responder");

describe(
    "Route: Input",
    () =>
    {
        describe(
            "#route()",
            () =>
            {
                it(
                    "should return 400 & error state for invalid input",
                    () =>
                    {
                        const filter = sinon.createStubInstance(BooleanFilter);
                        const responder = sinon.createStubInstance(LogResponder);
                        const route = new InputRoute(responder, filter);
                        const request = httpMocks.createRequest({});
                        const response = httpMocks.createResponse();

                        filter.filter.throws();

                        route.route(request, response, () => true);

                        const data = JSON.parse(response._getData());
                        assert.equal(response._getStatusCode(), 400);
                        assert.equal(data.error, true);
                    }
                );

                it(
                    "should pass responder errors to next middleware",
                    done =>
                    {
                        // set up route
                        const filter = sinon.createStubInstance(BooleanFilter);
                        const responder = sinon.createStubInstance(LogResponder);
                        const route = new InputRoute(responder, filter);

                        // mock
                        const error = new Error();
                        const request = httpMocks.createRequest({});
                        const response = httpMocks.createResponse();
                        const middleware = sinon.spy();

                        responder.respond.returns(
                            new Promise(
                                (resolve, reject) =>
                                {
                                    reject(error);

                                    setTimeout(
                                        () =>
                                        {
                                            assert(middleware.calledOnceWithExactly(error));
                                            done();
                                        },
                                        0
                                    );
                                }
                            )
                        );

                        route.route(request, response, middleware);
                    }
                );

                it(
                    "should write responder content and type to response",
                    done =>
                    {
                        // set up route
                        const filter = sinon.createStubInstance(BooleanFilter);
                        const responder = sinon.createStubInstance(LogResponder);
                        const route = new InputRoute(responder, filter);

                        // mock
                        const request = httpMocks.createRequest({});
                        const response = httpMocks.createResponse();
                        const responderData = {
                            "contentType": "text/plain",
                            "content": "text"
                        };

                        responder.respond.returns(
                            new Promise(
                                resolve =>
                                {
                                    resolve(responderData);

                                    setTimeout(
                                        () =>
                                        {
                                            assert.equal(response.getHeader("Content-Type"), responderData.contentType);
                                            assert.equal(response._getData(), responderData.content);

                                            done();
                                        },
                                        0
                                    );
                                }
                            )
                        );

                        route.route(request, response, () => true);
                    }
                );
            }
        );
    }
);
