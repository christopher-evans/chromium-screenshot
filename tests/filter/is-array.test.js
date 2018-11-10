/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { IsArrayFilter } = require("../../src/filter");

describe(
    "Filter: IsArray",
    () =>
    {
        describe(
            "#filter()",
            () =>
            {
                it(
                    "should error if any value is not present",
                    () =>
                    {
                        const reference = {};
                        const haystack = ["17", 11, reference];
                        const subsets = [
                            [17],
                            ["11"],
                            ["17", 11, {}]
                        ];
                        const filter = new IsArrayFilter(haystack);

                        subsets.forEach(value => assert.throws(() => filter.filter(value)));
                    }
                );

                it(
                    "should error if the value is not an array",
                    () =>
                    {
                        const haystack = [true];
                        const notArrays = [
                            false,
                            null,
                            undefined,
                            0,
                            "",
                            NaN
                        ];
                        const filter = new IsArrayFilter(haystack);

                        notArrays.forEach(value => assert.throws(() => filter.filter(value)));
                    }
                );

                it(
                    "should return the values if all are present",
                    () =>
                    {
                        const reference = {};
                        const haystack = ["17", 11, reference];
                        const subsets = [
                            [],
                            ["17"],
                            [11],
                            ["17", 11, reference]
                        ];
                        const filter = new IsArrayFilter(haystack);

                        subsets.forEach(value => assert.equal(filter.filter(value), value));
                    }
                );
            }
        );
    }
);
