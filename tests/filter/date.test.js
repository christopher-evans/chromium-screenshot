
const assert = require("assert");
const { describe, it } = require("mocha");
const { DateFilter } = require("../../src/filter");

describe(
    "Filter: Date",
    () =>
    {
        const filter = new DateFilter();

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

                // just do some elementary tests
                // mainly hand this off to the iso lib
                it(
                    "should error for non-iso8601 strings",
                    () =>
                    {
                        const values = [
                            "2000",
                            "2000-01",
                            "2000-01-01T",
                            "2000-01-01T00",
                            "2000-01-01T00:00:00.",
                            "2000-01-01T00:00:00.0123456",
                            "2000-01-01T00:00:00.000+",
                            "2000-01-01T00:00:00.000+00",
                            "2000-01-01T00:00:00.000+00:"
                        ];

                        values.forEach(value => assert.throws(() => filter.filter(value)));
                    }
                );

                it(
                    "should parse valid iso8601 strings",
                    () =>
                    {
                        const values = [
                            "2000-01-01",
                            "2000-01-01T00:00:00",
                            "2000-01-01T00:00:00.000",
                            "2000-01-01T00:00:00.000Z",
                            "2000-01-01T00:00:00.000+00:00"
                        ];

                        values.forEach(
                            value =>
                            {
                                const filteredValue = filter.filter(value);

                                assert.ok(filteredValue instanceof Date);
                                assert.equal(filteredValue.toISOString(), "2000-01-01T00:00:00.000Z");
                            }
                        );
                    }
                );
            }
        );
    }
);
