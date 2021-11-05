const webdriver = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

const cookiesModule = require("./cookies");
const upload = require("./upload");

const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);

const includedFiles = ".mp4";
const folder = "/Users/sepezho/Downloads/IST_DATA/media/stories";
//const folder = "/tik-tok-bot"

const app = async () => {
	const options = new firefox.Options();

	options.addArguments("-headless");
	options.addArguments("-standalone");

	const driver = new webdriver.Builder()
		.forBrowser("firefox")
		.setFirefoxOptions(options)
		.build();

	await driver.get("https://www.tiktok.com");

	if (cookiesModule.cookies.find((e) => e.name === "sessionid")) {
		cookiesModule.cookies.forEach((e) =>
			driver.manage().addCookie({ name: e.name, value: e.value })
		);
	} else {
		await cookiesModule.setCookies(driver);
	}

	await driver.navigate().refresh();
	await driver.get("https://www.tiktok.com/upload?lang=en");

	const videoUrls = [];
	console.log("------------------");
	await readdir(folder, async (_, foldersArr) => {
		let elements = 0;
		let folders = 0;
		await Promise.all(
			foldersArr.sort().map(async (folder) => {
				await readdir(`${folder}/${folder}/`, async (_, filesArr) => {
					folders++;
					if (filesArr) {
						let files = 0;
						await Promise.all(
							filesArr
								.filter((s) => s.includes(includedFiles))
								.map(async (file) => {
									files++;
									elements++;
									videoUrls.push(`${folder}/${folder}/${file}`);
									if (
										!filesArr.filter((s) => s.includes(includedFiles))[files] &&
										!foldersArr[folders]
									) {
										console.log(`Have ${elements} to upload`);
										let elementNumber = 0;
										for (const url of videoUrls) {
											elementNumber++;
											const consolelog = `* ${url} (${elementNumber} of ${elements})`;
											console.log(`${consolelog} Start`);
											await upload(driver, url, consolelog);
											console.log(`${consolelog} Done`);
										}
									}
								})
						);
					}
				});
			})
		);
	});
	console.log("------------------");
	console.log("Done.");
};

app();
