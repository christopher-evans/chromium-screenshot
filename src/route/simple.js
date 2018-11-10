/**
 * This file is part of the chromium-screenshot package
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Simple
{
    constructor(responder, contentType)
    {
        this.responder = responder;
        this.contentType = contentType;
    }

    route(request, response)
    {
        response.header("Content-Type", this.contentType);
        response.send(this.responder());
        response.end();
    }
}

module.exports = Simple;
