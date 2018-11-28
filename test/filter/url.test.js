/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { urlFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");
const type = require("../../src/type");

describe(
    "Filter: url",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                const filter = urlFilter();

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
                            "https://google.com",
                            "ftp://url.com",
                            "mailto:example@example.com"
                        ];

                        strings.forEach(value => assert(type.string(filter(value))));
                    }
                );

                it(
                    "should error for invalid URLs",
                    () =>
                    {
                        // don't check the URL spec, just make sure we get the right error for
                        // some obvious failures
                        const strings = [
                            "not-a-url",
                            "--",
                            ""
                        ];

                        strings.forEach(value => assert.throws(() => filter(value)), FilterError);
                    }
                );
            }
        );
    }
);
