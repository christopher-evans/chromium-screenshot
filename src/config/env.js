
class Env
{
    constructor(env, prefix, filter)
    {
        this.env = env;
        this.prefix = prefix;
        this.filter = filter;
    }

    fetch(keys)
    {
        return this.filter.filter(
            keys.reduce(
                (config, key) =>
                {
                    config[key] = this.value(key);

                    return config;
                },
                {}
            )
        );
    }

    value(key)
    {
        return this.env[this.prefix + key];
    }
}

module.exports = Env;
