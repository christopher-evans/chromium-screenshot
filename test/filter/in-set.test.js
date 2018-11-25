/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { inSetFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");

describe(
    "Filter: inSet",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                it(
                    "should error for values not in the haystack",
                    () =>
                    {
                        const referenceValue = {};
                        const filter = inSetFilter(
                            new Set([referenceValue, 1, "2"])
                        );
                        const notPresentValues = [
                            {},
                            "1",
                            2,
                            null,
                            undefined,
                            "",
                            NaN
                        ];

                        notPresentValues.forEach(
                            notPresentValue => assert.throws(() => filter(notPresentValue), FilterError)
                        );
                    }
                );

                it(
                    "should reflect for values in the haystack",
                    () =>
                    {
                        const referenceValue = {};
                        const filter = inSetFilter(
                            new Set([referenceValue, 1, "2"])
                        );
                        const presentValues = [
                            referenceValue,
                            1,
                            "2"
                        ];

                        presentValues.forEach(presentValue => assert.strictEqual(filter(presentValue), presentValue));
                    }
                );
            }
        );
    }
);
