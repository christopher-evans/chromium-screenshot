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
const type = require("../../src/type");

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

                const dataSets = [
                    {},
                    {
                        "first": 1
                    },
                    {
                        "first": 1,
                        "second": {
                            "key": new Map()
                        }
                    }
                ];
                const stubFilters = (dataSet, stub) =>
                {
                    const filters = new Map();
                    Object.entries(dataSet).forEach(
                        ([key, value]) => filters.set(key, stub(key, value))
                    );

                    return filters;
                };

                it(
                    "should return an object",
                    () =>
                    {
                        dataSets.forEach(
                            dataSet =>
                            {
                                const filters = stubFilters(dataSet, (_, value) => sinon.stub().returns(value));
                                const testFilter = aggregateFilter(filters);

                                assert(type.object(testFilter(dataSet)));
                            }
                        );
                    }
                );

                it(
                    "should apply filters for each key",
                    () =>
                    {
                        dataSets.forEach(
                            dataSet =>
                            {
                                const filters = stubFilters(dataSet, (_, value) => sinon.stub().returns(value));
                                const testFilter = aggregateFilter(filters);

                                assert.deepStrictEqual(testFilter(dataSet), dataSet);
                            }
                        );
                    }
                );

                it(
                    "should aggregate errors",
                    () =>
                    {
                        dataSets.forEach(
                            dataSet =>
                            {
                                const errors = new Map();
                                const filters = stubFilters(
                                    dataSet,
                                    key =>
                                    {
                                        const error = new FilterError();

                                        errors.set(key, error);

                                        return sinon.stub().throws(error);
                                    }
                                );
                                const testFilter = aggregateFilter(filters);

                                if (errors.size > 0)
                                {
                                    assert.throws(
                                        () => testFilter({}),
                                        {
                                            "name": "AggregateError",
                                            "errors": errors
                                        }
                                    );
                                }
                            }
                        );
                    }
                );
            }
        );
    }
);
