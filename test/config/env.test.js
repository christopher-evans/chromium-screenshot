/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const assert = require("assert");
const { describe, it } = require("mocha");
const envConfig = require("../../src/config/env");

describe(
    "Config: env",
    () =>
    {
        describe(
            "::invoke",
            () =>
            {
                it(
                    "should return undefined when a value is not present",
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

                        const filter = value => value;
                        const env = envConfig({}, "", filter)(keys);

                        keys.forEach(key => assert.equal(env[key], undefined));
                    }
                );

                // should not return undefined when a value is present

                it(
                    "should remove a prefix from keys",
                    () =>
                    {
                        const filter = value => value;
                        const configSets = [
                            {
                                "values": {
                                    "npm_config_first": "first",
                                    "npm_config_second": "second"
                                },
                                "prefix": "npm_config_"
                            }
                        ];

                        configSets.forEach(
                            ({ values, prefix }) =>
                            {
                                const keys = Object.values(values);
                                const testResultKeys = Object.keys(envConfig(values, prefix, filter)(keys));

                                Object.values(values).forEach(value => assert(testResultKeys.includes(value)));
                            }
                        );
                    }
                );

                // should return undefined if a value is not prefixed

                // should apply a filter to values

                // should only return requested keys
            }
        );
    }
);
