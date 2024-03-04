/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Configuration for use with node `process.env`.
 *
 * The prefix `"npm_package_config_"` is stripped from config values and a filter applied.
 *
 * @author Christopher Evans <cvns.github@gmail.com>
 */
class Env
{
    /**
     * Env constructor.
     *
     * @param {Object} env Node `process.env` object
     * @param {string} prefix Config key prefix
     * @param {{filter: Function}} filter Filters to apply to config values
     *
     * @public
     */
    constructor(env, prefix, filter)
    {
        /**
         * Node `process.env` object.
         *
         * @private
         */
        this.env = env;

        /**
         * Prefix to strip from config values.
         *
         * @private
         */
        this.prefix = prefix;

        /**
         * Filter to apply to configuration object.
         *
         * @private
         */
        this.filter = filter;
    }

    /**
     * Fetch config values for an array of keys.
     *
     * Applies the instance filters to the values.
     *
     * @param {Array} keys
     *
     * @returns {Object.<string, *>}
     * @public
     */
    fetch(keys)
    {
        return this.filter.filter(
            keys.reduce(
                (config, key) =>
                {
                    config[key] = this.value(key);

                    return config;
                },
                {}
            )
        );
    }

    /**
     * Fetch a single raw configuration value by key.
     *
     * Key should not include the prefix.
     *
     * @param {string} key
     *
     * @returns {*}
     * @private
     */
    value(key)
    {
        return this.env[this.prefix + key];
    }
}

module.exports = Env;
