
const assert = require("assert");
const { describe, it } = require("mocha");
const sanitizeHtml = require("sanitize-html");
const { HtmlFilter } = require("../../src/filter");

describe(
    "Filter: Html",
    () =>
    {
        describe(
            "#filter()",
            () =>
            {
                it(
                    "should error if the value is not a string",
                    () =>
                    {
                        const filter = new HtmlFilter();
                        const notStrings = [
                            false,
                            1,
                            NaN,
                            {},
                            /regex/
                        ];

                        notStrings.forEach(value => assert.throws(() => filter.filter(value)));
                    }
                );

                it(
                    "should apply sanitize-html to strings",
                    () =>
                    {
                        const strings = [
                            "hello",
                            "<script>alert('hello')</script>"
                        ];
                        const filter = new HtmlFilter();

                        strings.forEach(string => assert.equal(filter.filter(string), sanitizeHtml(string)));
                    }
                );
            }
        );
    }
);
