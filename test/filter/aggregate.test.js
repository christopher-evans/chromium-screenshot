/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const sinon = require("sinon");
const { describe, it } = require("mocha");
const { aggregateFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");

describe(
    "Filter: aggregate",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                it(
                    "should error for non-object values",
                    () =>
                    {
                        const notObjects = [
                            false,
                            null,
                            undefined,
                            0,
                            NaN,
                            "",
                            /a/,
                            new Map()
                        ];
                        const filter = aggregateFilter(new Map());

                        notObjects.forEach(value => assert.throws(() => filter(value), FilterError));
                    }
                );

                it(
                    "should apply filters for each key",
                    () =>
                    {
                        const data = {
                            "first": 1,
                            "second": {
                                "key": new Map()
                            }
                        };
                        const firstFilter = sinon.stub().returns(data.first);
                        const secondFilter = sinon.stub().returns(data.second);
                        const filter = aggregateFilter(
                            new Map(
                                Object.entries(
                                    {
                                        "first": firstFilter,
                                        "second": secondFilter
                                    }
                                )
                            )
                        );

                        assert.deepStrictEqual(filter(data), data);
                    }
                );

                it(
                    "should aggregate errors",
                    () =>
                    {
                        const firstError = new FilterError();
                        const secondError = new FilterError();
                        const firstFilter = sinon.stub().throws(firstError);
                        const secondFilter = sinon.stub().throws(secondError);
                        const filter = aggregateFilter(
                            new Map(
                                Object.entries(
                                    {
                                        "first": firstFilter,
                                        "second": secondFilter
                                    }
                                )
                            )
                        );

                        assert.throws(
                            () => filter({}),
                            {
                                "name": "AggregateError",
                                "errors": new Map(
                                    Object.entries(
                                        {
                                            "first": firstError,
                                            "second": secondError
                                        }
                                    )
                                )
                            }
                        );
                    }
                );
            }
        );
    }
);
