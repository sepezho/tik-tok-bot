const webdriver = require("selenium-webdriver");

const upload = (driver, url, consolelog) =>
	new Promise(async (resolve, reject) => {
		try {
			setTimeout(reject, 60000);

			await driver
				.wait(
					webdriver.until.elementLocated(
						webdriver.By.className("upload-btn-input")
					)
				)
				.sendKeys(url);

			console.log(`${consolelog} Uploading`);

			await driver
				.wait(
					webdriver.until.elementLocated(
						webdriver.By.xpath(
							"//*[text()='Post' and not(contains(@class, 'tiktok-btn-pc-disabled'))]"
						)
					)
				)
				.click();

			const nextBtn = await driver.wait(
				webdriver.until.elementLocated(
					webdriver.By.xpath("//*[text()='Upload another video']")
				)
			);

			nextBtn.click();
			resolve();
		} catch (e) {
			console.log(`${consolelog} `, e);
			console.log(`${consolelog} Crashed`);
			reject();
		}
	}).catch(async () => {
		await driver.navigate().refresh();
		await upload(driver, url, consolelog);
	});

module.exports = upload;
