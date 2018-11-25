/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const sinon = require("sinon");
const { requiredFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");

describe(
    "Filter: required",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                it(
                    "should error for undefined values",
                    () =>
                    {
                        const sourceFilter = sinon.stub();
                        const filter = requiredFilter(sourceFilter);

                        assert.throws(() => filter(undefined), FilterError);
                    }
                );

                it(
                    "should apply the source filter for defined values",
                    () =>
                    {
                        const returnValue = {};
                        const sourceFilter = sinon.stub().returns(returnValue);
                        const filter = requiredFilter(sourceFilter);
                        const notUndefinedValues = [
                            false,
                            0,
                            0.0,
                            - 0,
                            "",
                            null,
                            NaN
                        ];

                        notUndefinedValues.forEach(
                            notUndefinedValue => assert.strictEqual(filter(notUndefinedValue), returnValue)
                        );
                    }
                );
            }
        );
    }
);
