/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { BooleanFilter } = require("../../src/filter");

describe(
    "Filter: Boolean",
    () =>
    {
        const filter = new BooleanFilter();

        describe(
            "#filter()",
            () =>
            {
                it(
                    "should cast everything to boolean",
                    () =>
                    {
                        const falseValues = [
                            false,
                            null,
                            undefined,
                            0,
                            "",
                            NaN
                        ];
                        const trueValues = [
                            {},
                            [],
                            "1",
                            "0",
                            true
                        ];

                        falseValues.forEach(value => assert.equal(filter.filter(value), false));
                        trueValues.forEach(value => assert.equal(filter.filter(value), true));
                    }
                );
            }
        );
    }
);
