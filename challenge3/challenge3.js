require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
var key = webdriver.Key;
var by = webdriver.By;
var until = webdriver.until;

describe("challenge3 suite", function(){
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

    it("Should loop through popular section and print link and text", async function() {
        var popular_array = await driver.findElements(by.xpath("//div[@id='tabTrending']//a"));
        console.log(popular_array.length);
        for (var i = 0; i < popular_array.length; i++){
            console.log(await popular_array[i].getText() + " - " + await popular_array[i].getAttribute("href"));
        }
    });
 
});