- TLS
- Add route to render PDF
- Add e2e tests (https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/)
- Write tests to ensure efficient concurrency (`ab -n 100 -c 10 -p params.json -m POST -T application/json http://localhost:8080/image`)
- If the browser crashes, requests queued to that browser rely on the worker failing to be re-queued
- Make chromium instance configurable
