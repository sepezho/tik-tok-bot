require("chromedriver");
const webdriver = require("selenium-webdriver");
const cookiesModule = require("./cookies");
const upload = require("./upload");

const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);

const rootFolder = "/Users/sepezho/Downloads/IST_DATA";
const storiesFolder = rootFolder + "/media/stories";
const includedFiles = ".mp4";

const app = async () => {
	const driver = new webdriver.Builder().forBrowser("chrome").build();
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
	await readdir(storiesFolder, async (_, foldersArr) => {
		let elements = 0;
		let folders = 0;
		await Promise.all(
			foldersArr.sort().map(async (folder) => {
				await readdir(`${storiesFolder}/${folder}/`, async (_, filesArr) => {
					folders++;
					if (filesArr) {
						let files = 0;
						await Promise.all(
							filesArr
								.filter((s) => s.includes(includedFiles))
								.map(async (file) => {
									files++;
									elements++;
									videoUrls.push(`${storiesFolder}/${folder}/${file}`);
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
cookiesModule.setCookies();

// 243220796_592264591905403_6641425870994584131_n_17948459671557931
// 000000000_000000000000000_0000000000000000000_n_2686656624118093700
