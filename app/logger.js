/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const fs = require("fs");
const winston = require("winston");
const config = require("./config");

const logger = winston.createLogger(
    {
        "name": "app.log",
        "format": winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        "transports": []
    }
);

if (config.log_file_enable)
{
    const path = config.log_file_path;
    if (! fs.existsSync(path))
    {
        fs.writeFileSync(path, "");
    }

    // throws an error on failure
    fs.accessSync(path, fs.constants.W_OK);
    logger.add(
        new winston.transports.File(
            {
                "filename": path,
                "level": config.log_console_level
            }
        )
    );
}

if (config.log_console_enable)
{
    logger.add(
        new winston.transports.Console(
            {
                "format": winston.format.simple(),
                "level": config.log_console_level
            }
        )
    );
}

module.exports = logger;
