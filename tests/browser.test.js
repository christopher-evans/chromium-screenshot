
const assert = require("assert");
const {
    afterEach,
    beforeEach,
    describe,
    it
} = require("mocha");
const sinon = require("sinon");
const puppeteer = require("puppeteer");
const EventEmitter = require("events");
const Browser = require("../src/browser");

describe(
    "Browser",
    () =>
    {
        const sandBox = sinon.createSandbox();

        describe(
            "#fetch()",
            () => {
                // stub logger method before each test
                beforeEach(() => sandBox.stub(puppeteer, "launch"));

                // restore logger state after each test
                afterEach(() => sandBox.restore());

                it(
                    "should return the browser instance",
                    async () =>
                    {
                        const browser = new Browser(["--no-sandbox"]);
                        const instance = new EventEmitter();

                        puppeteer.launch.returns(Promise.resolve(instance));

                        assert.equal(await browser.fetch(), instance);
                    }
                );

                it(
                    "should cache the browser instance",
                    async () =>
                    {
                        const browser = new Browser(["--no-sandbox"]);
                        const firstInstance = new EventEmitter();
                        const secondInstance = new EventEmitter();

                        puppeteer.launch.onCall(0).returns(Promise.resolve(firstInstance));
                        puppeteer.launch.onCall(1).returns(Promise.resolve(secondInstance));

                        await browser.fetch();
                        const secondResult = await browser.fetch();

                        sandBox.assert.calledOnce(puppeteer.launch);
                        assert.equal(secondResult, firstInstance);
                    }
                );

                it(
                    "should cache the browser promise",
                    async () =>
                    {
                        const browser = new Browser(["--no-sandbox"]);

                        // this promise never resolves
                        puppeteer.launch.returns(new Promise((resolve, reject) => true));

                        const firstPromise = browser.fetch();
                        const secondPromise = browser.fetch();

                        assert.equal(firstPromise, secondPromise);
                    }
                );

                it(
                    "should clear the instance when the browser disconnects",
                    async () =>
                    {
                        const browser = new Browser(["--no-sandbox"]);
                        const instance = new EventEmitter();

                        // mock
                        puppeteer.launch.returns(Promise.resolve(instance));
                        sandBox.stub(browser, "clear");

                        // fetch instance and trigger disconnect
                        await browser.fetch();

                        // this calls listeners synchronously
                        instance.emit("disconnected");

                        sandBox.assert.calledOnce(browser.clear);
                    }
                );

                it(
                    "should clear the instance when the browser disconnects",
                    async () =>
                    {
                        const browser = new Browser(["--no-sandbox"]);
                        const instance = new EventEmitter();

                        // mock
                        puppeteer.launch.returns(Promise.resolve(instance));
                        sandBox.stub(browser, "clear");

                        // fetch instance and trigger disconnect
                        await browser.fetch();

                        // this calls listeners synchronously
                        instance.emit("disconnected");

                        sandBox.assert.calledOnce(browser.clear);
                    }
                );
            }
        );

        describe(
            "#clear()",
            () =>
            {
                // stub logger method before each test
                beforeEach(() => sandBox.stub(puppeteer, "launch"));

                // restore logger state after each test
                afterEach(() => sandBox.restore());

                it(
                    "should clear the browser instance",
                    async () =>
                    {
                        const browser = new Browser(["--no-sandbox"]);

                        // mock
                        const firstInstance = new EventEmitter();
                        const secondInstance = new EventEmitter();
                        firstInstance.close = () => true;
                        secondInstance.close = () => true;
                        puppeteer.launch.onCall(0).returns(Promise.resolve(firstInstance));
                        puppeteer.launch.onCall(1).returns(Promise.resolve(secondInstance));

                        // fetch, clear then fetch again
                        await browser.fetch();
                        browser.clear();
                        const secondResult = await browser.fetch();

                        sandBox.assert.calledTwice(puppeteer.launch);
                        assert.equal(secondResult, secondInstance);
                    }
                );

                it(
                    "should not repeat calls to close the browser",
                    async () =>
                    {
                        const browser = new Browser(["--no-sandbox"]);

                        // mock
                        const instance = new EventEmitter();
                        instance.close = () => true;
                        const closeSpy = sinon.spy(instance, "close");
                        puppeteer.launch.returns(Promise.resolve(instance));

                        // fetch, clear then fetch again
                        await browser.fetch();
                        browser.clear();
                        browser.clear();

                        sandBox.assert.calledOnce(closeSpy);
                    }
                );
            }
        );
    }
);
