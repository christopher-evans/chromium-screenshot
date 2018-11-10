
const assert = require("assert");
const { describe, it } = require("mocha");
const check = require("check-types");
const { SpaceSeparatedFilter } = require("../../src/filter");

describe(
    "Filter: SpaceSeparated",
    () =>
    {
        const filter = new SpaceSeparatedFilter();

        describe(
            "#filter()",
            () =>
            {
                it(
                    "should error for non-string input",
                    () =>
                    {
                        const values = [
                            false,
                            null,
                            undefined,
                            0,
                            NaN,
                            [],
                            {}
                        ];

                        values.forEach(value => assert.throws(() => filter.filter(value)));
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

                        values.forEach(value => assert(check.array(filter.filter(value))));
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
                            ([string, count]) => assert.equal(filter.filter(string).length, count)
                        );
                    }
                );
            }
        );
    }
);
