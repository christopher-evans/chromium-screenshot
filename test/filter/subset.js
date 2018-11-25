/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { subsetFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");

describe(
    "Filter: inSet",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                it(
                    "should error if any value is not present",
                    () =>
                    {
                        const reference = {};
                        const haystack = new Set(["17", 11, reference]);
                        const subsets = [
                            [17],
                            ["11"],
                            ["17", 11, {}]
                        ];
                        const filter = subsetFilter(haystack);

                        subsets.forEach(value => assert.throws(() => filter(value), FilterError));
                    }
                );

                it(
                    "should error if the value is not iterable",
                    () =>
                    {
                        const haystack = new Set([true]);
                        const notIterable = [
                            false,
                            null,
                            undefined,
                            0,
                            "",
                            NaN,
                            {}
                        ];
                        const filter = subsetFilter(haystack);

                        notIterable.forEach(value => assert.throws(() => filter(value), FilterError));
                    }
                );

                it(
                    "should return the values if all are present",
                    () =>
                    {
                        const reference = {};
                        const haystack = new Set(["17", 11, reference]);
                        const subsets = [
                            [],
                            ["17"],
                            [11],
                            ["17", 11, reference]
                        ];
                        const filter = subsetFilter(haystack);

                        subsets.forEach(value => assert.equal(filter(value), value));
                    }
                );
            }
        );
    }
);
