const upload = require("./upload");

const worker = async (videoUrls, elements, webdriver, driver) => {
	console.log(`╔═════════════╣ Have ${elements} to upload ╠═════════════╣`);
	let elementNumber = 0;
	for (const url of videoUrls) {
		elementNumber++;
		const consolelog = `╠═════ ${url} (${elementNumber} of ${elements})`;
		console.log(`${consolelog} Start`);
		await driver.executeScript("window.scroll(0, 200)");
		await upload(webdriver, driver, url, consolelog);
		console.log(`${consolelog} Done`);
		if (elements === elementNumber) {
			await driver.close();
			console.log(`╚═════════╣ Done! ${elements} TikToks uploaded! ╠════════╣`);
		}
	}
};

module.exports = worker;
