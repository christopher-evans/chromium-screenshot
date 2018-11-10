
const assert = require("assert");
const { describe, it } = require("mocha");
const { BooleanFilter } = require("../../src/filter");

describe(
    "Filter: Boolean",
    () =>
    {
        const filter = new BooleanFilter();

        describe(
            "#filter()",
            () =>
            {
                it(
                    "should cast everything to boolean",
                    () =>
                    {
                        const falseValues = [
                            false,
                            null,
                            undefined,
                            0,
                            "",
                            NaN
                        ];
                        const trueValues = [
                            {},
                            [],
                            "1",
                            "0",
                            true
                        ];

                        falseValues.forEach(value => assert.equal(filter.filter(value), false));
                        trueValues.forEach(value => assert.equal(filter.filter(value), true));
                    }
                );
            }
        );
    }
);
