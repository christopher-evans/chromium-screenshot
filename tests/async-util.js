/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const unwrap = async fn =>
{
    try
    {
        return await fn();
    }
    catch (error)
    {
        return error;
    }
};

module.exports = {
    "unwrap": unwrap
};
