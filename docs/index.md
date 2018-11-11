# Chromium Screenshot

Screenshot service using [Chromium][] and [Puppeteer][].


## Getting started

To start the server run:
```bash
$ npm i --production
$ npm start
```

By default the server will listen on port 8080. To use a different port run:
```bash
$ npm config set chromium-screenshot:port 40
```

To build and start the image using [Docker][]:
```bash
$ docker build -t chromium-screenshot .
$ docker run -p 40:8080 chromium-screenshot
```


## Routes

Any request containing JSON body _must_ have the correct `Content-Type` header.


### Images

To generate a screenshot make a `POST` request to `/image`

```json
{
    "url": "https://example.com",
    "imageFormat": "jpeg",
    "width": 1024,
    "height": 768,
    "quality": 100
}
```

The image format must be either `jpeg` or `png`.  The quality parameter is ignored if `png` is used.

The parameter `"fullPage": true` may be passed to take a screenshot of the full scrollable page, ignoring the width and
height parameters. The parameter `"omitBackground": true` may be passed to remove the default white background and
capture as transparency in the rendered image. 


### Ping

The ping route is a simple `GET` request to `/ping`.


### Logs

For easier access the logs can be queried over HTTP.  Logs are saved as simple text files so the route should be closed
off if the server is public facing.

To query the logs make a `POST` request to `/log`:

```json
{
    "from": "2018-01-01T00:00:00.000Z",
    "until": "2018-01-02",
    "limit": "100",
    "start": "0",
    "order": "asc",
    "fields": ["level", "message", "timestamp"]
}
```

Any and all of these parameters can be omitted; in general the query should be chosen to limit results to a reasonable
size, because the server won't impose a hard limit.


## Configuration settings

There are a number of configurable options for the server that can be set with:
```bash
$ npm config set chromium-screenshot:<setting> <value>
```

Defaults can be found in the [package.json][] file.

- `browser_flags` <_string_> Space separated flags passed to the chromium instance. A list of available flags can be
  found [here](https://peter.sh/experiments/chromium-command-line-switches/)
- `browser_restart_interval` <_integer_> Interval in ms after which the chromium instance is restarted. If set to zero
  the same instance will be reused indefinitely, so long as it doesn't crash.
- `log_console_enable` <_boolean_> Enable logging to the console
- `log_console_level` <_string_> Only log to console above the provided level (see below for available levels)
- `log_file_enable` <_boolean_> Enable logging to file
- `log_file_level` <_string_> Only log to file above the provided level (see below for available levels)
- `log_file_path` <_string_> Path to log file, either absolute or relative to application route
- `port` <_integer_> Port to listen for connections
- `reder_cache` <_boolean_> Enable Chromium browser cache
- `render_timeout` <_integer_> Time in ms to wait for a page to load (the server will return an error if this is
  exceeded)
- `render_wait_until` <_string_> Event or space-separated list of events that should be triggered before the screenshot
  is taken. Events may include `load`, `domcontentloaded` or `networkidleX` (no more than `X` network connections for
  500ms).
- `route_image` <_string_> Route for image requests.
- `route_ping` <_string_> Route for ping requests.
- `route_log` <_string_> Route for log requests.
- `worker_concurrency` <_integer_> Number of concurrent workers processing the job queue.

Possible log levels are `debug`, `info`, `notice`, `warning`, `error`, `critical`, `alert` and `emergency`.

[Chromium]: https://www.chromium.org/
[Docker]: https://www.docker.com/
[package.json]: ../package.json
[Puppeteer]: https://www.chromium.org/
