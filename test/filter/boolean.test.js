/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { booleanFilter } = require("../../src/filter");

describe(
    "Filter: boolean",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                const filter = booleanFilter();

                it(
                    "should map to false with javascript cast",
                    () =>
                    {
                        const falseyValues = [
                            false,
                            0,
                            0.0,
                            - 0,
                            "",
                            null,
                            undefined,
                            NaN
                        ];

                        falseyValues.forEach(falseyValue => assert.strictEqual(filter(falseyValue), false));
                    }
                );

                it(
                    "should map to true with javascript cast",
                    () =>
                    {
                        const truthyValues = [
                            "0",
                            1,
                            "1",
                            [],
                            {},
                            new Set(),
                            /a/
                        ];

                        truthyValues.forEach(truthyValue => assert.strictEqual(filter(truthyValue), true));
                    }
                );
            }
        );
    }
);
