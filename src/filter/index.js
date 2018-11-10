/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Aggregate = require("./aggregate");
const Boolean = require("./boolean");
const BooleanString = require("./boolean-string");
const Date = require("./date");
const Default = require("./default");
const DynamicDefault = require("./dynamic-default");
const Html = require("./html");
const InArray = require("./in-array");
const IsArray = require("./is-array");
const Number = require("./number");
const Path = require("./path");
const Required = require("./required");
const SpaceSeparated = require("./space-separated");
const Unit = require("./unit");
const Url = require("./url");
const UrlPath = require("./url-path");

module.exports = {
    "AggregateFilter": Aggregate,
    "BooleanFilter": Boolean,
    "BooleanStringFilter": BooleanString,
    "DateFilter": Date,
    "DefaultFilter": Default,
    "DynamicDefaultFilter": DynamicDefault,
    "HtmlFilter": Html,
    "InArrayFilter": InArray,
    "IsArrayFilter": IsArray,
    "NumberFilter": Number,
    "PathFilter": Path,
    "RequiredFilter": Required,
    "SpaceSeparatedFilter": SpaceSeparated,
    "UnitFilter": Unit,
    "UrlFilter": Url,
    "UrlPathFilter": UrlPath
};
