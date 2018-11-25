/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { dateFilter } = require("../../src/filter");
const { FilterError } = require("../../src/error");

describe(
    "Filter: date",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                const filter = dateFilter();

                it(
                    "should error for non-string values",
                    () =>
                    {
                        const notStrings = [
                            false,
                            null,
                            undefined,
                            0,
                            NaN,
                            /a/,
                            new Map()
                        ];

                        notStrings.forEach(value => assert.throws(() => filter(value), FilterError));
                    }
                );

                it(
                    "should error for non-matching strings",
                    () =>
                    {
                        const notDates = [
                            "",
                            "a",
                            "200-01-01",
                            "2000-1-01",
                            "2000-01-1",
                            "2000-01-01T",
                            "2000-01-01T00",
                            "2000-01-01T00:",
                            "2000-01-01T00:00:",
                            "2000-01-01T00:00:00.",
                            "2000-01-01T00:00:00.0000000",
                            "2000-01-01T00:00:00.000000+00:",
                            "2000-01-01T00:00:00.000000+00:000",
                            "2000-01-01T00:00:00.000000ZZ",
                            "2000-01-01T.0000000"
                        ];

                        notDates.forEach(value => assert.throws(() => filter(value), FilterError));
                    }
                );

                it(
                    "should error for nonsense dates",
                    () =>
                    {
                        const notDates = [
                            "2000-99-01T00:00:00",
                            "2000-00-01T00:00:00",
                            "2000-01-99T00:00:00",
                            "2000-01-00T00:00:00",
                            "2000-01-01T99:00:00",
                            "2000-01-01T00:99:00",
                            "2000-01-01T00:00:99",
                            "2000-01-01T00:00:00.000000+99:00",
                            "2000-01-01T00:00:00.000000+00:99"
                        ];

                        notDates.forEach(value => assert.throws(() => filter(value), FilterError));
                    }
                );

                it(
                    "should return a Date object for valid dates",
                    () =>
                    {
                        const dates = [
                            "2000-01-01",
                            "2000-01-01T00:00:00",
                            "2000-01-01T00:00:00.000000",
                            "2000-01-01T00:00:00.000000+00:00"
                        ];

                        dates.forEach(value => assert(filter(value) instanceof Date));
                    }
                );
            }
        );
    }
);
