
const process = require("process");
const Env = require("./src/config/env");
const {
    AggregateFilter,
    BooleanFilter,
    InArrayFilter,
    NumberFilter,
    PathFilter,
    RequiredFilter,
    SpaceSeparatedFilter,
    UrlPathFilter
} = require("./src/filter");

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
    const filterMap = {
        "browser_flags": new SpaceSeparatedFilter(),
        "browser_restart_interval": new NumberFilter(60 * 1000, 24 * 60 * 60 * 1000),
        "debug": new BooleanFilter(),
        "log_console_enable": new BooleanFilter(),
        "log_console_level": new InArrayFilter(logLevels),
        "log_file_enable": new BooleanFilter(),
        "log_file_level": new InArrayFilter(logLevels),
        "log_file_path": new PathFilter(),
        "port": new NumberFilter(0, 1 << 16),
        "render_cache": new BooleanFilter(),
        "render_timeout": new NumberFilter(0, 60 * 60 * 1000),
        "render_wait_until": new SpaceSeparatedFilter(),
        "route_document": new UrlPathFilter(),
        "route_image": new UrlPathFilter(),
        "route_log": new UrlPathFilter(),
        "route_ping": new UrlPathFilter(),
        "worker_concurrency": new NumberFilter(1, 1 << 8)
    };

    // require everything
    const requiredFilters = Object.entries(filterMap).reduce(
        (filters, [key, filter]) =>
        {
            filters[key] = new RequiredFilter(filter);

            return filters;
        },
        {}
    );


    return new Env(
        process.env,
        "npm_package_config_",
        new AggregateFilter(requiredFilters)
    )
        .fetch(Object.keys(filterMap));
};

module.exports = config();
