const fs = require("fs");

const data = fs
	.readFileSync("./cookies/tiktok.com_cookies.txt")
	.toString()
	.split(/\r?\n/)
	.slice(4)
	.map((e) => e.split("	"))
	.map((e) => {
		return {
			name: e[5],
			value: e[6],
			path: e[2],
			domain: e[0],
			secure: Boolean(e[3]?.toLowerCase),
			httpOnly: false,
			expiry: e[4],
			sameSite: "None",
		};
	});

fs.writeFileSync("./cookies/cookies.json", JSON.stringify(data));

console.log("Done converting!");
