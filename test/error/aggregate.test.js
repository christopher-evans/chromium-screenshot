/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const { AggregateError, FilterError } = require("../../src/error");

describe(
    "Error: Filter",
    () =>
    {
        describe(
            "::constructor",
            () =>
            {
                it(
                    "should extend FilterError",
                    () =>
                    {
                        const error = new AggregateError();

                        assert(error instanceof FilterError);
                    }
                );

                it(
                    "should be named AggregateError",
                    () =>
                    {
                        const error = new AggregateError();

                        assert.strictEqual(error.name, "AggregateError");
                    }
                );
            }
        );

        const errorSets = [
            {},
            {
                "first": "9b4ca0aa-18ae-4dea-a8b3-f846d3838b93",
                "second": "8ee3a219-cc8f-4d74-97f3-89f2388684e4"
            }
        ];
        const mapErrors = errorSet => new Map(
            Object.entries(errorSet).map(
                ([key, message]) => [key, new Error(message)]
            )
        );

        describe(
            "::toString",
            () =>
            {
                it(
                    "should relay each error message",
                    () =>
                    {
                        errorSets.forEach(
                            errorSet =>
                            {
                                const errors = mapErrors(errorSet);
                                const testErrorString = (new AggregateError("", errors)).toString();

                                Object.values(errorSet).forEach(message => assert(testErrorString.includes(message)));
                            }
                        );
                    }
                );
                it(
                    "should relay each key message",
                    () =>
                    {
                        errorSets.forEach(
                            errorSet =>
                            {
                                const errors = mapErrors(errorSet);
                                const testErrorString = (new AggregateError("", errors)).toString();

                                Object.keys(errorSet).forEach(message => assert(testErrorString.includes(message)));
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
                    "should contain each key",
                    () =>
                    {
                        errorSets.forEach(
                            errorSet =>
                            {
                                const errors = mapErrors(errorSet);
                                const testErrorKeys = Object.keys((new AggregateError("", errors)).toJSON());

                                Object.keys(errorSet).forEach(key => assert(testErrorKeys.includes(key)));
                            }
                        );
                    }
                );

                it(
                    "should contain each value",
                    () =>
                    {
                        errorSets.forEach(
                            errorSet =>
                            {
                                const errors = mapErrors(errorSet);
                                const testErrorValues = Object.values((new AggregateError("", errors)).toJSON());

                                Object.values(errorSet).forEach(value => assert(testErrorValues.includes(value)));
                            }
                        );
                    }
                );
            }
        );
    }
);
