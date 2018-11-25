/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { spaceSeparatedFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");

describe(
    "Filter: stringSeparated",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                const filter = spaceSeparatedFilter();

                it(
                    "should error for non-string values",
                    () =>
                    {
                        const notStrings = [
                            false,
                            null,
                            undefined,
                            0,
                            NaN,
                            [],
                            {}
                        ];

                        notStrings.forEach(value => assert.throws(() => filter(value), FilterError));
                    }
                );

                it(
                    "should always return an array",
                    () =>
                    {
                        const values = [
                            "",
                            " ",
                            "a b"
                        ];

                        values.forEach(value => assert(Array.isArray(filter(value))));
                    }
                );

                it(
                    "should return one value per space-separated entry",
                    () =>
                    {
                        const testValues = {
                            "": 0,
                            " ": 0,
                            " a": 1,
                            "a ": 1,
                            " a ": 1,
                            " \t ": 1,
                            " \n ": 1,
                            "a b": 2
                        };

                        Object.entries(testValues).forEach(
                            ([string, count]) => assert.equal(filter(string).length, count)
                        );
                    }
                );
            }
        );
    }
);
