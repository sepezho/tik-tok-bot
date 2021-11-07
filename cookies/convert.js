const fs = require("fs");

const data = fs
	.readFileSync("./cookies/tiktok.com_cookies.txt")
	.toString()
	.split(/\r?\n/)
	.slice(4)
	.map((e) => e.split("	"))
	.map((e) => ({
		name: e[5],
		value: e[6],
	}));

fs.writeFileSync("./cookies/cookies.json", JSON.stringify(data));
console.log("Done converting!");
