
const path = require("path");

class Path
{
    filter(value)
    {
        return path.resolve(value);
    }
}

module.exports = Path;
