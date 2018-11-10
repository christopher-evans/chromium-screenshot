/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const sinon = require("sinon");
const Env = require("../../src/config/env");
const BooleanFilter = require("../../src/filter/boolean");

describe(
    "Config: Env",
    () =>
    {
        const pipeFilter = sinon.createStubInstance(BooleanFilter);
        pipeFilter.filter.returnsArg(0);

        describe(
            "#value()",
            () =>
            {
                it(
                    "should return undefined when the value is not present",
                    () =>
                    {
                        const keys = [
                            "",
                            "abc",
                            " ",
                            "abc def",
                            "åß∂ƒ©˙∆˚¬…æ",
                            "नमस्ते"
                        ];
                        const env = new Env({}, "", pipeFilter);

                        keys.forEach(key => assert.equal(env.value(key), undefined));
                    }
                );

                it(
                    "should reflect the value if it is present",
                    () =>
                    {
                        const reference = {};
                        const values = {
                            "": 12,
                            "a": reference,
                            "नमस्ते": "नमस्ते"
                        };
                        const env = new Env(values, "", pipeFilter);

                        Object.entries(values).forEach(([key, value]) => assert.equal(env.value(key), value));
                    }
                );

                it(
                    "should add a prefix to keys",
                    () =>
                    {
                        const prefix = "prefix_";
                        const key = "key";
                        const reference = {};

                        // create prefixed values
                        const values = {};
                        values[prefix + key] = reference;

                        const env = new Env(values, prefix, pipeFilter);

                        assert.equal(env.value(key), reference);
                    }
                );

                it(
                    "should return undefined if a value is not prefixed",
                    () =>
                    {
                        const prefix = "prefix_";
                        const values = {
                            "key": true
                        };

                        const env = new Env(values, prefix, pipeFilter);

                        assert.equal(env.value("key"), undefined);
                    }
                );
            }
        );

        describe(
            "#fetch()",
            () =>
            {
                it(
                    "should only return requested keys",
                    () =>
                    {
                        const values = {
                            "a": 1,
                            "b": 2,
                            "c": 3
                        };

                        const keySets = [
                            [],
                            ["a"],
                            ["a", "b"],
                            ["a", "b", "c"]
                        ];
                        const env = new Env(values, "", pipeFilter);

                        keySets.forEach(
                            keySet => assert.deepStrictEqual(
                                Object.keys(env.fetch(keySet)),
                                keySet
                            )
                        );
                    }
                );

                it(
                    "should reflect values and references",
                    () =>
                    {
                        const reference = {};
                        const values = {
                            "a": 1,
                            "b": reference
                        };

                        const keys = ["a", "b"];
                        const env = new Env(values, "", pipeFilter);

                        assert.deepStrictEqual(env.fetch(keys), values);
                    }
                );

                it(
                    "should apply a filter to values",
                    () =>
                    {
                        const reference = {};
                        const constantFilter = sinon.createStubInstance(BooleanFilter);
                        const values = {
                            "a": 1,
                            "b": 2
                        };
                        constantFilter.filter.returns(reference);

                        const keys = ["a", "b"];
                        const env = new Env(values, "", constantFilter);

                        assert.equal(env.fetch(keys), reference);
                    }
                );
            }
        );
    }
);
