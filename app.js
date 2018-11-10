
const bodyParser = require("body-parser");
const express = require("express");
const expressWinston = require("express-winston");
const helmet = require("helmet");
const logger = require("./logger");
const router = require("./router");

// init app
const app = express();
app.use(helmet());
app.use(bodyParser.json());

// don't generate e-tags
app.set("etag fn", null);


// express-winston logger makes sense BEFORE the router
app.use(
    expressWinston.logger(
        {
            "winstonInstance": logger,
            "level": "debug",
            "meta": true,
            // @TODO format
            "msg": "{{req.ip}} - {{req.hostname}} '{{req.method}} {{req.baseUrl}}'"
                + " {{res.statusCode}} {{res._contentLength}} {{res.responseTime}}ms"
        }
    )
);

// now we can tell the app to use our routing code:
app.use(router);


// express-winston errorLogger makes sense AFTER the router.
app.use(
    expressWinston.errorLogger(
        {
            "winstonInstance": logger,
            "level": "error"
            // @TODO formatasync
        }
    )
);


// handle 404
app.use(
    (request, response) =>
    {
        response.status(404);

        response.send(
            {
                "error": true,
                "message": "Not found"
            }
        );
    }
);


// error handler
app.use(
    (error, request, response) =>
    {
        const status = error.status || 500;

        response.status(status);
        response.send(
            {
                "error": true,
                "message": error.message
            }
        );
    }
);

module.exports = app;
