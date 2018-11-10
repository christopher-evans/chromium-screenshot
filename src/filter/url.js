
const validUrl = require("valid-url");

class Url
{
    filter(value)
    {
        if (! validUrl.isUri(value))
        {
            throw new Error("invalid URL");
        }

        return value;
    }
}

module.exports = Url;
