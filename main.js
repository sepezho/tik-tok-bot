require("chromedriver");
const webdriver = require("selenium-webdriver");
const cookies = require("./cookies");

const app = async () => {
	const driver = new webdriver.Builder().forBrowser("chrome").build();

	await driver.get("https://www.tiktok.com");
	await cookies.forEach(
		async (e) =>
			await driver.manage().addCookie({ name: e.name, value: e.value })
	);

	await driver.navigate().refresh();
	await driver.get("https://www.tiktok.com/upload?lang=en");

	const uploadInput = await driver.wait(
		webdriver.until.elementLocated(webdriver.By.className("upload-btn-input"))
	);

	uploadInput.sendKeys("/Users/sepezho/Downloads/1.mp4");

	const uploadBtn = await driver.wait(
		webdriver.until.elementLocated(
			webdriver.By.xpath(
				"//*[text()='Post' and not(contains(@class, 'tiktok-btn-pc-disabled'))]"
			)
		)
	);

	uploadBtn.click();

	const uploadAnotherBtn = await driver.wait(
		webdriver.until.elementLocated(
			webdriver.By.xpath("//*[text()='Upload another video']")
		)
	);

	uploadAnotherBtn.click();
};

app();