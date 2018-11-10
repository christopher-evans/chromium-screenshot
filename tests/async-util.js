
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
