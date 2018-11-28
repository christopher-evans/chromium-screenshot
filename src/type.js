/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const { toString } = Object.prototype;
const { isArray } = Array;
const type =
    {
        "array": value => isArray(value),
        "iterable": value => value && value[Symbol.iterator],
        "map": value => toString.call(value) === "[object Map]",
        "object": value => toString.call(value) === "[object Object]",
        "set": value => toString.call(value) === "[object Set]",
        "string": value => toString.call(value) === "[object String]",
        "undefined": value => undefined === value
    };

module.exports = type;
