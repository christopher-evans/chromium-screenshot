/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const process = require("process");
const os = require("os");
const Env = require("../src/config/env");
const {
    AggregateFilter,
    BooleanStringFilter,
    DefaultFilter,
    InArrayFilter,
    NumberFilter,
    PathFilter,
    RequiredFilter,
    SpaceSeparatedFilter,
    UrlPathFilter
} = require("../src/filter/index");

const config = () =>
{
    // log levels
    const logLevels = [
        "debug",
        "info",
        "notice",
        "warning",
        "error",
        "critical",
        "alert",
        "emergency"
    ];

    // define input filters
    const requiredFilters = {
        "browser_flags": new SpaceSeparatedFilter(),
        "browser_restart_interval": new NumberFilter(1000, 24 * 60 * 60 * 1000),
        "debug": new BooleanStringFilter(),
        "log_console_enable": new BooleanStringFilter(),
        "log_console_level": new InArrayFilter(logLevels),
        "log_file_enable": new BooleanStringFilter(),
        "log_file_level": new InArrayFilter(logLevels),
        "log_file_path": new PathFilter(),
        "port": new NumberFilter(0, 1 << 16),
        "render_cache": new BooleanStringFilter(),
        "render_timeout": new NumberFilter(0, 60 * 60 * 1000),
        "render_wait_until": new SpaceSeparatedFilter(),
        "route_document": new UrlPathFilter(),
        "route_image": new UrlPathFilter(),
        "route_log": new UrlPathFilter(),
        "route_ping": new UrlPathFilter(),
        "worker_concurrent_calls": new NumberFilter(1, 1 << 8),
        "worker_timeout": new NumberFilter(100, 10 * 60 * 1000)
    };
    const defaultFilters = {
        "worker_concurrency": new DefaultFilter(new NumberFilter(1, 1 << 8), os.cpus().length)
    };

    // require everything
    const allFilters = Object.entries(requiredFilters).reduce(
        (filters, [key, filter]) =>
        {
            filters[key] = new RequiredFilter(filter);

            return filters;
        },
        defaultFilters
    );

    return new Env(
        process.env,
        "npm_package_config_",
        new AggregateFilter(allFilters)
    )
        .fetch(Object.keys(allFilters));
};

module.exports = config();
