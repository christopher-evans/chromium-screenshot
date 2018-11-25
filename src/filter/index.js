/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const absolutePathFilter = require("./absolute-path");
const aggregateFilter = require("./aggregate");
const booleanFilter = require("./boolean");
const booleanStringFilter = require("./boolean-string");
const dateFilter = require("./date");
const defaultFilter = require("./default");
const dynamicDefaultFilter = require("./dynamic-default");
const htmlFilter = require("./html");
const inSetFilter = require("./in-set");
const ipFilter = require("./ip");
const numberFilter = require("./number");
const regexFilter = require("./regex");
const requiredFilter = require("./required");
const spaceSeparatedFilter = require("./space-separated");
const subsetFilter = require("./subset");
const urlFilter = require("./url");

module.exports =
    {
        absolutePathFilter,
        aggregateFilter,
        booleanFilter,
        booleanStringFilter,
        dateFilter,
        defaultFilter,
        dynamicDefaultFilter,
        htmlFilter,
        inSetFilter,
        ipFilter,
        numberFilter,
        regexFilter,
        requiredFilter,
        spaceSeparatedFilter,
        subsetFilter,
        urlFilter
    };
