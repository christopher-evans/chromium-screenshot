/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const sinon = require("sinon");
const { describe, it } = require("mocha");
const { AggregateFilter } = require("../../src/filter");

describe(
    "Filter: Aggregate",
    () =>
    {
        describe(
            "#filter()",
            () =>
            {
                it(
                    "should error if the map is not an object",
                    () =>
                    {
                        const maps = [
                            false,
                            null,
                            undefined,
                            0,
                            ""
                        ];

                        maps.forEach(map => assert.throws(() => new AggregateFilter(map)));
                    }
                );
            }
        );

        describe(
            "#filter()",
            () =>
            {
                it(
                    "should error if the input is not an object",
                    () =>
                    {
                        const map = {};
                        const filter = new AggregateFilter(map);
                        const inputs = [
                            false,
                            null,
                            undefined,
                            0,
                            ""
                        ];

                        inputs.forEach(input => assert.throws(() => filter.filter(input)));
                    }
                );
            }
        );

        describe(
            "#filter()",
            () =>
            {
                it(
                    "should apply filters for each key",
                    () =>
                    {
                        const first = {};
                        const second = {};
                        const firstFilter = sinon.createStubInstance(AggregateFilter);
                        const secondFilter = sinon.createStubInstance(AggregateFilter);
                        const data = {
                            "first": 1,
                            "second": 2
                        };
                        const map = {
                            "first": firstFilter,
                            "second": secondFilter
                        };
                        const aggregateFilter = new AggregateFilter(map);

                        firstFilter.filter.returns(first);
                        secondFilter.filter.returns(second);

                        const result = aggregateFilter.filter(data);
                        assert.equal(result.first, first);
                        assert.equal(result.second, second);
                    }
                );
            }
        );
    }
);
