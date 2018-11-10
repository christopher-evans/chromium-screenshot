/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const path = require("path");
const { PathFilter } = require("../../src/filter");

describe(
    "Filter: Path",
    () =>
    {
        describe(
            "#filter()",
            () =>
            {
                it(
                    "should resolve arguments to an absolute path",
                    () =>
                    {
                        const filter = new PathFilter();

                        const files = [
                            "tmp.txt",
                            "../../",
                            "."
                        ];

                        files.forEach(file => assert(path.isAbsolute(filter.filter(file))));
                    }
                );

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
                        const filter = new PathFilter();

                        notStrings.forEach(value => assert.throws(() => filter.filter(value)));
                    }
                );
            }
        );
    }
);
