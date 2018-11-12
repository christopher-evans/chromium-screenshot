/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const express = require("express");
const config = require("./config");
const { image, log, ping } = require("./route");

const router = express.Router();
router.get(config.route_ping, ping.route.bind(ping));
router.post(config.route_log, log.route.bind(log));
router.post(config.route_image, image.route.bind(image));

module.exports = router;
