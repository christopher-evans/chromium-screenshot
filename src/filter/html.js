
const check = require("check-types");
const sanitizeHtml = require("sanitize-html");

class Html
{
    filter(value)
    {
        if (! check.string(value))
        {
            throw new Error("invalid html: not a string");
        }

        return sanitizeHtml(value);
    }
}

module.exports = Html;
