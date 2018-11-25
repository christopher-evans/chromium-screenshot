/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const sinon = require("sinon");
const { defaultFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");

describe(
    "Filter: default",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                it(
                    "should return the default for undefined values",
                    () =>
                    {
                        const defaultValue = {};
                        const sourceFilter = sinon.stub();
                        const filter = defaultFilter(sourceFilter, defaultValue);

                        assert.strictEqual(filter(undefined), defaultValue);
                    }
                );

                it(
                    "should apply the source filter for defined values",
                    () =>
                    {
                        const defaultValue = {};
                        const returnValue = {};
                        const sourceFilter = sinon.stub().returns(returnValue);
                        const filter = defaultFilter(sourceFilter, defaultValue);
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

                it(
                    "should propagate errors from the source filter",
                    () =>
                    {
                        const error = new FilterError();
                        const sourceFilter = sinon.stub().throws(error);
                        const filter = defaultFilter(sourceFilter, {});

                        assert.throws(() => filter(true), error);
                    }
                );
            }
        );
    }
);
