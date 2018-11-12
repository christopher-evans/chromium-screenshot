/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const logger = require("../logger");
const { LogResponder } = require("../../src/responder/index");
const { InputRoute } = require("../../src/route/index");
const {
    AggregateFilter,
    DateFilter,
    DefaultFilter,
    DynamicDefaultFilter,
    InArrayFilter,
    IsArrayFilter,
    NumberFilter
} = require("../../src/filter/index");

const log = new InputRoute(
    new LogResponder(logger),
    new AggregateFilter(
        {
            "from": new DynamicDefaultFilter(new DateFilter(), () => new Date(Date.now() - 24 * 60 * 60 * 1000)),
            "until": new DynamicDefaultFilter(new DateFilter(), () => new Date()),
            "limit": new DefaultFilter(new NumberFilter(0, 1 << 16), 100),
            "start": new DefaultFilter(new NumberFilter(0), 0),
            "order": new DefaultFilter(new InArrayFilter(["asc", "desc"]), "asc"),
            "fields": new DefaultFilter(
                new IsArrayFilter(["level", "message", "timestamp"]), ["level", "message", "timestamp"]
            )
        }
    )
);

module.exports = log;
