require("chromedriver");
const webdriver = require("selenium-webdriver");
const cookies = require("./cookies");

(async () => {
	const driver = new webdriver.Builder().forBrowser("chrome").build();
	await driver.get("https://www.tiktok.com");
	cookies.forEach((e) =>
		driver.manage().addCookie({ name: e.name, value: e.value })
	);
	console.log("------------------");
	console.log("Done.");
})();
