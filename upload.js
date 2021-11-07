const upload = (webdriver, driver, url, consolelog) =>
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
			console.log(`${consolelog} Posted`);
		} catch (e) {
			console.log(`${consolelog} Crashed`);
			console.log("╠═════", e);
			reject();
		}
		try {
			await driver
				.wait(
					webdriver.until.elementLocated(
						webdriver.By.xpath("//*[text()='Upload another video']")
					)
				)
				.click();
			resolve();
		} catch (e) {
			console.log(`${consolelog} Crashed, but already posted`);
			console.log("╠═════", e);
			await driver.navigate().refresh();
			resolve();
		}
	}).catch(async () => {
		await driver.get("https://www.tiktok.com/upload?lang=en");
		await upload(webdriver, driver, url, consolelog);
	});

module.exports = upload;
