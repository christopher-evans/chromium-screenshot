
const assert = require("assert");
const { describe, it } = require("mocha");
const { UnitFilter } = require("../../src/filter");

describe(
    "Filter: Unit",
    () =>
    {
        describe(
            "#filter()",
            () =>
            {
                it(
                    "should error for non-string input",
                    () =>
                    {
                        const filter = new UnitFilter();
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
                    "should error for non-matching regex",
                    () =>
                    {
                        const filter = new UnitFilter(/(?!)/);
                        const values = [
                            "",
                            " ",
                            "abc"
                        ];

                        values.forEach(value => assert.throws(() => filter.filter(value)));
                    }
                );

                it(
                    "should return the value for matching regexes",
                    () =>
                    {
                        const testValues = {
                            "": /^$/,
                            " ": /./,
                            "abc": /abc/
                        };

                        Object.entries(testValues).forEach(
                            ([string, regex]) =>
                            {
                                const filter = new UnitFilter(regex);

                                assert.equal(filter.filter(string), string);
                            }
                        );
                    }
                );
            }
        );
    }
);
