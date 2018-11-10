
const assert = require("assert");
const url = require("url");
const { describe, it } = require("mocha");
const { UrlPathFilter } = require("../../src/filter");

describe(
    "Filter: UrlPath",
    () =>
    {
        const filter = new UrlPathFilter();

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
                    "should parse url components for string input",
                    () =>
                    {
                        const values = [
                            "http://user@host:40/path?query#fragment"
                        ];

                        values.forEach(value => assert.deepEqual(filter.filter(value), url.parse(value)));
                    }
                );
            }
        );
    }
);
