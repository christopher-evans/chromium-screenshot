/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Koa = require("koa");
const router = require("./router");
const logger = require("./logger");
const metrics = require("./metrics");
const {
    cacheMiddleware,
    errorMiddleware,
    requestLogMiddleware,
    notFoundMiddleware,
    securityMiddleware
} = require("../src/middleware");

const app = new Koa();

// set up logging above error middleware
// errors in the log middleware will be handled
// by the default Koa error handler
app.use(requestLogMiddleware(logger, metrics));

// add error handling before all remaining middleware
app.use(errorMiddleware(logger));

// set / remove security / cache headers
app.use(securityMiddleware());
app.use(cacheMiddleware());

// app routes
app.use(router.routes());
app.use(router.allowedMethods());

// fall through to 404
app.use(notFoundMiddleware());

module.exports = app;
