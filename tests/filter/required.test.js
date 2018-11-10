/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const sinon = require("sinon");
const { RequiredFilter } = require("../../src/filter");

describe(
    "Filter: Required",
    () =>
    {
        describe(
            "#filter()",
            () =>
            {
                it(
                    "should error if value is undefined",
                    () =>
                    {
                        const filter = new RequiredFilter();

                        assert.throws(() => filter.filter(undefined));
                    }
                );

                it(
                    "should apply the source filter for defined values",
                    () =>
                    {
                        const sourceFilter = sinon.createStubInstance(RequiredFilter);
                        const values = [
                            false,
                            null,
                            0
                        ];
                        const filter = new RequiredFilter(sourceFilter);

                        // mock
                        sourceFilter.filter.returnsArg(0);

                        values.forEach(value => assert.equal(filter.filter(value), value));
                    }
                );
            }
        );
    }
);
