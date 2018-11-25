/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const envConfig = (values, prefix, filter) =>
{
    const value = key => values[prefix + key];

    return keys => filter(
        Array.from(keys).reduce(
            (config, key) =>
            {
                config[key] = value(key);

                return config;
            },
            {}
        )
    );
};

module.exports = envConfig;
