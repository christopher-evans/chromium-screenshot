
const assert = require("assert");
const { describe, it } = require("mocha");
const { BooleanStringFilter } = require("../../src/filter");

describe(
    "Filter: BooleanString",
    () =>
    {
        const filter = new BooleanStringFilter();

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
                    "should cast strings to boolean",
                    () =>
                    {
                        const falseValues = [
                            "",
                            "0"
                        ];
                        const trueValues = [
                            "1",
                            "-1",
                            "a",
                            "नमस्ते"
                        ];

                        falseValues.forEach(value => assert.equal(filter.filter(value), false));
                        trueValues.forEach(value => assert.equal(filter.filter(value), true));
                    }
                );
            }
        );
    }
);
