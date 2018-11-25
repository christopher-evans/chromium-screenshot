/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const sinon = require("sinon");
const { dynamicDefaultFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");

describe(
    "Filter: dynamicDefault",
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
                        const defaultFunction = () => defaultValue;
                        const sourceFilter = sinon.stub();
                        const filter = dynamicDefaultFilter(sourceFilter, defaultFunction);

                        assert.strictEqual(filter(undefined), defaultValue);
                    }
                );

                it(
                    "should apply the source filter for defined values",
                    () =>
                    {
                        const defaultFunction = () => ({});
                        const returnValue = {};
                        const sourceFilter = sinon.stub().returns(returnValue);
                        const filter = dynamicDefaultFilter(sourceFilter, defaultFunction);
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
                        const defaultFunction = () => ({});
                        const error = new FilterError();
                        const sourceFilter = sinon.stub().throws(error);
                        const filter = dynamicDefaultFilter(sourceFilter, defaultFunction);

                        assert.throws(() => filter(true), FilterError);
                    }
                );
            }
        );
    }
);
