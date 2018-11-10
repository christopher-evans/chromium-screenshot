
const assert = require("assert");
const { describe, it } = require("mocha");
const { NumberFilter } = require("../../src/filter");

describe(
    "Filter: Number",
    () =>
    {
        describe(
            "#filter()",
            () =>
            {
                const intParser = value => Number.parseInt(value, 10);

                it(
                    "should error if the value is numeric",
                    () =>
                    {
                        const notNumeric = [
                            false,
                            null,
                            undefined,
                            "",
                            "a1",
                            NaN
                        ];
                        const filter = new NumberFilter(null, null, intParser);

                        notNumeric.forEach(value => assert.throws(() => filter.filter(value)));
                    }
                );

                it(
                    "should error if the value below minimum",
                    () =>
                    {
                        const filter = new NumberFilter(0, null, intParser);

                        assert.throws(() => filter.filter(- 1));
                    }
                );

                it(
                    "should error if the value exceeds maximum",
                    () =>
                    {
                        const filter = new NumberFilter(0, 1, intParser);

                        assert.throws(() => filter.filter(2));
                    }
                );

                it(
                    "should apply the parser to values",
                    () =>
                    {
                        const fixedValue = 21;
                        const parser = () => fixedValue;
                        const filter = new NumberFilter(null, null, parser);
                        const values = [- 1, 0, 1];

                        values.forEach(value => assert.equal(filter.filter(value), fixedValue));
                    }
                );
            }
        );
    }
);
