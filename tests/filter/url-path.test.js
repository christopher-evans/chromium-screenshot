/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const url = require("url");
const { describe, it } = require("mocha");
const { UrlPathFilter } = require("../../src/filter");

describe(
    "Filter: UrlPath",
    () =>
    {
        const filter = new UrlPathFilter();

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
                    "should parse url components for string input",
                    () =>
                    {
                        const values = [
                            "http://user@host:40/path?query#fragment"
                        ];

                        values.forEach(value => assert.equal(filter.filter(value), url.parse(value).path));
                    }
                );
            }
        );
    }
);
