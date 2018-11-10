
const url = require("url");

class UrlPath
{
    filter(value)
    {
        return url.parse(value);
    }
}

module.exports = UrlPath;
