require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
var key = webdriver.Key;
var by = webdriver.By;
var until = webdriver.until;

describe("challenge2 suite", function(){
    this.timeout(20000);
    var driver;
    before(function () {
        driver = new webdriver.Builder()
       .withCapabilities(webdriver.Capabilities.chrome())
       .build();
    });
 
    after(function () {
        return driver.quit();
    });

    it("I open the copart website", function() {
        return driver.get("https://www.copart.com/");
    });
 
    it("The title is 'Auto Auction - Copart USA - Salvage Cars For Sale'", function() {
        return driver.getTitle().then(function(title) {
            assert.equal(title, "Auto Auction - Copart USA - Salvage Cars For Sale");
        });
    });

    it("The title is 'Auto Auction - Copart USA - Salvage Cars For Sale'", async function() {
        var title = await driver.getTitle();
        return assert.include(title, "Auto Auction - Copart USA");
    });

    it("Should run search on copart for exotic", async function() {
        var element = await driver.findElement(by.id("input-search"));
        return element.sendKeys("exotic" + key.ENTER)
    });

    it("Should assert Porsche is in list of results", async function() {
        await driver.wait(until.titleContains('exotic'), 10000);
        console.log(await driver.getTitle());
        var html = await driver.findElement(by.tagName("body")).getAttribute('innerHTML');
        // console.log(html);
        return assert.include(html, "Porsche");
    });
 
});