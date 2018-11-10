
class Input
{
    constructor(responder, filter)
    {
        this.responder = responder;
        this.filter = filter;
    }

    route(request, response, next)
    {
        let parameters;

        try
        {
            parameters = this.filter.filter(request.body);
        }
        catch (error)
        {
            response.status(400);
            response.json(
                {
                    "error": true,
                    "message": "Invalid request parameters",
                    "detail": {
                        "body": request.body,
                        "detail": error.message
                    }
                }
            );

            return;
        }

        this.responder.respond(parameters)
            .then(
                ({ content, contentType }) =>
                {
                    response.header("Content-Type", contentType);
                    response.end(content);
                },
                error => next(error)
            );
    }
}

module.exports = Input;
