
const assert = require("assert");
const { describe, it } = require("mocha");
const sinon = require("sinon");
const { DynamicDefaultFilter } = require("../../src/filter");

describe(
    "Filter: DynamicDefault",
    () =>
    {
        const reference = {};
        const defaultFunction = () => reference;
        const pipeFilter = sinon.createStubInstance(DynamicDefaultFilter);
        pipeFilter.filter.returnsArg(0);

        describe(
            "#filter()",
            () =>
            {
                it(
                    "should return the default for empty values",
                    () =>
                    {
                        const filter = new DynamicDefaultFilter(pipeFilter, defaultFunction);
                        const empty = undefined;

                        assert.equal(filter.filter(empty), reference);
                    }
                );

                it(
                    "should apply the source filter for non-empty values",
                    () =>
                    {
                        const filter = new DynamicDefaultFilter(pipeFilter, defaultFunction);
                        const notEmpty = [
                            false,
                            null,
                            0,
                            ""
                        ];

                        notEmpty.forEach(value => assert.equal(filter.filter(value), value));
                    }
                );
            }
        );
    }
);
