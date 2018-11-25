/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const logQuery = logger =>
    parameters => new Promise(
        (resolve, reject) => logger.query(
            parameters,
            (error, results) =>
            {
                if (error)
                {
                    // @TODO wrap error for front end
                    reject(error);
                }

                resolve(results);
            }
        )
    );

module.exports = logQuery;
