/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const workerAction = pool =>
    async parameters => pool.exec("image", parameters);

module.exports = workerAction;
