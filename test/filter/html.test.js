/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { htmlFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");
const type = require("../../src/type");

describe(
    "Filter: html",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                const filter = htmlFilter();

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
                    "should always return a string",
                    () =>
                    {
                        const strings = [
                            "",
                            "<!DOCTYPE html>",
                            "<p></p>"
                        ];

                        strings.forEach(value => assert(type.string(filter(value))));
                    }
                );
            }
        );
    }
);
