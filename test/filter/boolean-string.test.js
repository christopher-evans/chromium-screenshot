/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { booleanStringFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");

describe(
    "Filter: booleanString",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                const filter = booleanStringFilter();

                it(
                    "should error for non-string values",
                    () =>
                    {
                        const notStrings = [
                            false,
                            null,
                            undefined,
                            0,
                            NaN
                        ];

                        notStrings.forEach(value => assert.throws(() => filter(value), FilterError));
                    }
                );

                it(
                    "should map '0' and the empty string to false",
                    () =>
                    {
                        const values = [
                            "",
                            "0"
                        ];

                        values.forEach(value => assert.strictEqual(filter(value), false));
                    }
                );

                it(
                    "should map everything else to true",
                    () =>
                    {
                        const values = [
                            "1",
                            "-1",
                            "false",
                            "NaN",
                            "off"
                        ];

                        values.forEach(value => assert.strictEqual(filter(value), true));
                    }
                );
            }
        );
    }
);
