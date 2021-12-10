const fs = require("fs");

const data = fs
	.readFileSync("./cookies/tiktok.com_cookies.txt")
	.toString()
	.split(/\r?\n/)
	.slice(4)
	.map((e) => e.split("	"))
    .filter((e) => e[0] === ".tiktok.com")
    .filter((e) => e[5] === "sit_tt")
	.map((e) => ({
		name: e[5],
		value: e[6],
	}));

fs.writeFileSync("./cookies/cookies.json", JSON.stringify(data));
console.log("Done converting!");
