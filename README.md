# Chromium Screenshot

### Master
[![Build Status](https://travis-ci.org/christopher-evans/chromium-screenshot.svg?branch=master)](https://travis-ci.org/christopher-evans/chromium-screenshot)
[![Coverage Status](https://coveralls.io/repos/github/christopher-evans/chromium-screenshot/badge.svg?branch=master)](https://coveralls.io/github/christopher-evans/chromium-screenshot?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/c33ffd2289a1f3ecf8ff/maintainability)](https://codeclimate.com/github/christopher-evans/chromium-screenshot/maintainability)


## Documentation

This package is documented [here](https://christopher-evans.github.io/chromium-screenshot/).  To generate the
docs run run `npm install`, ensure [MkDocs][] is installed and available as `mkdocs` and run `npm run docs`.


## Dependencies

This package requires Node.js 8.x or later; modules required by the package are
documented in the [package.json][] file.


## Code Quality

To run the unit tests and generate a coverage report in `/coverage` with [Mocha][]
and [Istanbul][] run `npm install` followed by `npm test` at the command line.

To run [ESLint][] run `npm install` followed by `npm run lint` at the command line.




[ESLint]: https://eslint.org/
[Istanbul]: https://istanbul.js.org/
[MkDocs]: https://www.mkdocs.org/
[Mocha]: https://mochajs.org/
[package.json]: ./package.json
