/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const process = require("process");
const winston = require("winston");
const envConfig = require("../src/config/env");
const {
    absolutePathFilter,
    aggregateFilter,
    booleanStringFilter,
    inSetFilter,
    ipFilter,
    numberFilter,
    regexFilter,
    requiredFilter
} = require("../src/filter/index");

const config = () =>
{
    const logLevels = new Set(Object.keys(winston.config.syslog.levels));
    const filters = new Map();

    // keys with required values
    Object.entries(
        {
            "log_console_enable": booleanStringFilter(),
            "log_console_level": inSetFilter(logLevels),
            "log_file_enable": booleanStringFilter(),
            "log_file_level": inSetFilter(logLevels),
            "log_file_path": absolutePathFilter(),
            "queue_concurrency": numberFilter(1, 1 << 8),
            "server_backlog": numberFilter(0, 1 << 16),
            "server_body_max_size": regexFilter(/^\d+(?:\.\d+)?(?:kb|mb)$/i),
            "server_host": ipFilter(),
            "server_port": numberFilter(0, 1 << 16),
            "worker_concurrency": numberFilter(0, 1 << 8),
            "worker_discard_timeout": numberFilter(0, 60 * 1000),
            "worker_respawn_wait": numberFilter(0, 60 * 1000)
        }
    )
        .forEach(([key, filter]) => filters.set(key, requiredFilter(filter)));

    return new Map(
        Object.entries(
            envConfig(
                process.env,
                "npm_package_config_",
                aggregateFilter(filters)
            )(filters.keys())
        )
    );
};

module.exports = config();
