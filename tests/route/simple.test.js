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
const httpMocks = require("node-mocks-http");
const { SimpleRoute } = require("../../src/route");

describe(
    "Route: Simple",
    () =>
    {
        describe(
            "#route()",
            () =>
            {
                it(
                    "should send the specified content type",
                    () =>
                    {
                        const contentTypes = [
                            "application/json",
                            "image/jpeg",
                            "image/png",
                            "text/html"
                        ];

                        contentTypes.forEach(
                            contentType =>
                            {
                                const request = httpMocks.createRequest({});
                                const response = httpMocks.createResponse();
                                const route = new SimpleRoute(() => "", contentType);

                                route.route(request, response);

                                assert.equal(response.getHeader("Content-Type"), contentType);
                            }
                        );
                    }
                );

                it(
                    "should send the specified content",
                    () =>
                    {
                        const contents = [
                            {
                                "contentType": "text/plain",
                                "content": "text"
                            },
                            {
                                "contentType": "application/json",
                                "content": {
                                    "json": "object"
                                }
                            }
                        ];

                        contents.forEach(
                            ({ content, contentType }) =>
                            {
                                const request = httpMocks.createRequest({});
                                const response = httpMocks.createResponse();
                                const route = new SimpleRoute(() => content, contentType);

                                route.route(request, response);

                                assert.equal(response._getData(), content);
                            }
                        );
                    }
                );
            }
        );
    }
);
