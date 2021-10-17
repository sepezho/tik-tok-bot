const https = require("https");
const fs = require("fs");

const url = "";

https.get(url, (res) => {
	const path = "./story.mp4";
	const filePath = fs.createWriteStream(path);
	res.pipe(filePath);
	filePath.on("finish", () => {
		filePath.close();
		console.log("Done!");
	});
});
