/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { FilterError } = require("../../src/error");

describe(
    "Error: Filter",
    () =>
    {
        describe(
            "::constructor",
            () =>
            {
                it(
                    "should extend Error",
                    () =>
                    {
                        const error = new FilterError();

                        assert(error instanceof Error);
                    }
                );

                it(
                    "should be named FilterError",
                    () =>
                    {
                        const error = new FilterError();

                        assert.strictEqual(error.name, "FilterError");
                    }
                );
            }
        );

        describe(
            "::toString",
            () =>
            {
                it(
                    "should relay the error message",
                    () =>
                    {
                        const messages = [
                            "9b4ca0aa-18ae-4dea-a8b3-f846d3838b93"
                        ];

                        messages.forEach(
                            message =>
                            {
                                const error = new FilterError(message);

                                assert(error.toString().includes(message));
                            }
                        );
                    }
                );
            }
        );

        describe(
            "::toJSON",
            () =>
            {
                it(
                    "should relay the error message",
                    () =>
                    {
                        const messages = [
                            "9b4ca0aa-18ae-4dea-a8b3-f846d3838b93"
                        ];

                        messages.forEach(
                            message =>
                            {
                                const error = new FilterError(message);

                                assert(error.toJSON().includes(message));
                            }
                        );
                    }
                );
            }
        );
    }
);
