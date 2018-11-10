
const assert = require("assert");
const { describe, it } = require("mocha");
const { InArrayFilter } = require("../../src/filter");

describe(
    "Filter: InArray",
    () =>
    {
        describe(
            "#filter()",
            () =>
            {
                it(
                    "should error if the value is not present",
                    () =>
                    {
                        const reference = {};
                        const haystack = ["17", 11, reference];
                        const notPresent = [{}, "11", 17];
                        const filter = new InArrayFilter(haystack);

                        notPresent.forEach(value => assert.throws(() => filter.filter(value)));
                    }
                );

                it(
                    "should return the value if it is present",
                    () =>
                    {
                        const reference = {};
                        const haystack = ["17", 11, reference];
                        const present = [reference, 11, "17"];
                        const filter = new InArrayFilter(haystack);

                        present.forEach(value => assert.equal(filter.filter(value), value));
                    }
                );
            }
        );
    }
);
