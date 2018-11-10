/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { UrlFilter } = require("../../src/filter");

describe(
    "Filter: Url",
    () =>
    {
        const filter = new UrlFilter();

        describe(
            "#filter()",
            () =>
            {
                it(
                    "should error for non-string input",
                    () =>
                    {
                        const values = [
                            false,
                            null,
                            undefined,
                            0,
                            NaN,
                            [],
                            {}
                        ];

                        values.forEach(value => assert.throws(() => filter.filter(value)));
                    }
                );

                it(
                    "should error for invalid urls",
                    () =>
                    {
                        const values = [
                            "",
                            "invalid-url"
                        ];

                        values.forEach(value => assert.throws(() => filter.filter(value)));
                    }
                );

                it(
                    "should return the value for valid urls",
                    () =>
                    {
                        const values = [
                            "http://user@host:40/path?query#fragment"
                        ];

                        values.forEach(value => assert.equal(filter.filter(value), value));
                    }
                );
            }
        );
    }
);
