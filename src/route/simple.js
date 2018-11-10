
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
        response.end(this.responder());
    }
}

module.exports = Simple;
