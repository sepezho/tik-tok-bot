const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);
const webdriver = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const cookiesModule = require("./cookies/cookies");
const worker = require("./worker");

const includedFiles = ".mp4";
const folder = "tok-tok-bot/media";

const bot = async () => {
	const options = new firefox.Options();

	options.addArguments("-headless");
	options.addArguments("-standalone");

	const driver = new webdriver.Builder()
		.forBrowser("firefox")
		.setFirefoxOptions(options)
		.build();

	await driver.get("https://www.tiktok.com");

	for (const cookie of cookiesModule.cookies) {
		if (cookie.name)
			await driver
				.manage()
				.addCookie({ name: cookie.name, value: cookie.value });
	}

	await driver.get("https://www.tiktok.com/upload?lang=en");

	const videoUrls = [];
	let elements = 0;

	await readdir(folder, async (_, files) => {
		if (files)
			await Promise.all(
				files
					.filter((s) => s.includes(includedFiles))
					.map(async (file) => {
						videoUrls.push(`${folder}/${file}`);
						elements++;
						if (!files.filter((s) => s.includes(includedFiles))[elements]) {
							await worker(videoUrls, elements, webdriver, driver);
						}
					})
			);
	});
};

bot();
