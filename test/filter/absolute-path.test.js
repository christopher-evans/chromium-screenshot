/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const path = require("path");
const { absolutePathFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");

describe(
    "Filter: absolutePath",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                const filter = absolutePathFilter();

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
                    "should resolve arguments to an absolute path",
                    () =>
                    {
                        const files = [
                            "tmp.txt",
                            "../../",
                            "."
                        ];

                        files.forEach(file => assert(path.isAbsolute(filter(file))));
                    }
                );
            }
        );
    }
);
