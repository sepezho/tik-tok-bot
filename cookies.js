const fs = require("fs");

const setCookies = (driver) =>
	new Promise((resolve) => {
		const interval = setInterval(async () => {
			const cookies = await driver?.manage()?.getCookies();
			if (cookies?.find((e) => e.name === "sessionid")) {
				await fs.writeFileSync("./cookies.json", JSON.stringify(cookies));
				clearInterval(interval);
				console.log("Set cookies done.");
				resolve();
			}
		}, 5000);
	});

module.exports = {
	setCookies,
	cookies: JSON.parse(fs.readFileSync("./cookies.json")),
};
