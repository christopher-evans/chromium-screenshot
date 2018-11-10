
class Log
{
    constructor(logger)
    {
        this.logger = logger;
    }

    respond(parameters)
    {
        return new Promise(
            (resolve, reject) =>
            {
                this.logger.query(
                    parameters,
                    (error, results) =>
                    {
                        if (error)
                        {
                            // @TODO wrap error for front end
                            return reject(error);
                        }

                        return resolve(
                            {
                                "content": results,
                                "contentType": "application/json"
                            }
                        );
                    }
                );
            }
        );
    }
}

module.exports = Log;
