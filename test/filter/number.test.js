/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const sinon = require("sinon");
const { numberFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");

describe(
    "Filter: number",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                it(
                    "should error when the parser fails",
                    () =>
                    {
                        const nonFiniteValues = [
                            NaN,
                            Number.POSITIVE_INFINITY,
                            Number.NEGATIVE_INFINITY
                        ];

                        nonFiniteValues.forEach(
                            nonFiniteValue =>
                            {
                                const parser = sinon.stub().returns(nonFiniteValue);
                                const filter = numberFilter(undefined, undefined, parser);

                                // nonFiniteValue passed in here is already returned by the parser
                                assert.throws(() => filter(nonFiniteValue), FilterError);
                            }
                        );
                    }
                );

                it(
                    "should error when the minimum value is exceeded",
                    () =>
                    {
                        const min = 0;
                        const values = [- 1, - Number.MAX_VALUE, - Number.EPSILON, - Number.MIN_VALUE];

                        values.forEach(
                            value =>
                            {
                                const parser = sinon.stub().returns(value);
                                const filter = numberFilter(min, undefined, parser);

                                // value passed in here is already returned by the parser
                                assert.throws(() => filter(value), FilterError);
                            }
                        );
                    }
                );

                it(
                    "should error when the maximum value is exceeded",
                    () =>
                    {
                        const max = 0;
                        const values = [1, Number.MAX_VALUE, Number.EPSILON, Number.MIN_VALUE];

                        values.forEach(
                            value =>
                            {
                                const parser = sinon.stub().returns(value);
                                const filter = numberFilter(undefined, max, parser);

                                // value passed in here is already returned by the parser
                                assert.throws(() => filter(value), FilterError);
                            }
                        );
                    }
                );

                it(
                    "should return a number for finite values",
                    () =>
                    {
                        const values = [1, Number.MAX_VALUE, Number.EPSILON, Number.MIN_VALUE];

                        values.forEach(
                            value =>
                            {
                                const parser = sinon.stub().returns(value);
                                const filter = numberFilter(undefined, undefined, parser);

                                // value passed in here is already returned by the parser
                                assert(Number.isFinite(filter(value)));
                            }
                        );
                    }
                );
            }
        );
    }
);
