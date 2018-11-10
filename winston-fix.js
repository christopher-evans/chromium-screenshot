
const winstonCommon = require("winston/lib/winston/common");
const Transport = require("winston-transport");

winstonCommon.clone = object =>
{
    const copy = Array.isArray(object) ? [] : {};

    Object.entries(object).forEach(
        ([key, value]) =>
        {
            if (Array.isArray(value))
            {
                copy[key] = value.slice(0);
            }
            else if (value instanceof Buffer)
            {
                copy[key] = value.slice(0);
            }
            else if (typeof value !== "function")
            {
                copy[key] = value instanceof Object ? winstonCommon.clone(value) : value;
            }
            else if (typeof value === "function")
            {
                copy[key] = value;
            }
        }
    );

    return copy;
};

Transport.prototype.normalizeQuery = settings =>
{
    const options = settings || {};

    // limit
    options.rows = options.rows || options.limit || 10;

    // starting row offset
    options.start = options.start || 0;

    // now
    options.until = options.until || new Date();
    if (typeof options.until !== "object")
    {
        options.until = new Date(options.until);
    }

    // now - 24
    options.from = options.from || (options.until - (24 * 60 * 60 * 1000));
    if (typeof options.from !== "object")
    {
        options.from = new Date(options.from);
    }

    // "asc" or "desc"
    options.order = options.order || "desc";

    // which fields to select
    options.fields = options.fields;

    return options;
};

Transport.prototype.formatResults = results => results;
