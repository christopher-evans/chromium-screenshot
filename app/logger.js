/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const winston = require("winston");
const config = require("./config");

const logger = winston.createLogger(
    {
        "levels": winston.config.syslog.levels,
        "format": winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        "transports": []
    }
);

if (config.get("log_file_enable"))
{
    logger.add(
        new winston.transports.File(
            {
                "filename": config.get("log_file_path"),
                "level": config.get("log_console_level")
            }
        )
    );
}

if (config.get("log_console_enable"))
{
    logger.add(
        new winston.transports.Console(
            {
                "level": config.get("log_console_level")
            }
        )
    );
}

module.exports = logger;
