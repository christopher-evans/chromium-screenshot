
const StatsD = require("node-statsd");

const metrics = new StatsD(
    {
        "host": "localhost",
        "port": 8125,
        "prefix": "csk."
    }
);

module.exports = metrics;
