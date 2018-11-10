
let winstonCommon = require("winston/lib/winston/common");
let Transport = require("winston-transport");

winstonCommon.clone = object =>
{
    let copy = Array.isArray(object) ? [] : {};
    for (let prop in object)
    {
        if (Array.isArray(object[prop]))
        {
            copy[prop] = object[prop].slice(0);
        }
        else if (object[prop] instanceof Buffer)
        {
            copy[prop] = object[prop].slice(0);
        }
        else if (typeof object[prop] !== "function")
        {
            copy[prop] = object[prop] instanceof Object ? winstonCommon.clone(object[prop]) : object[prop];
        }
        else if (typeof object[prop] === "function")
        {
            copy[prop] = object[prop];
        }
    }

    return copy;
};

Transport.prototype.normalizeQuery = options =>
{
    options = options || {};

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
