const fs = require("fs");

const packageFile = fs.readFileSync("./package.json");
const packageObject = JSON.parse(packageFile);
packageObject.scripts = {};
fs.writeFileSync("./dist/package.json", JSON.stringify(packageObject));
fs.copyFileSync("./README.md", "./dist/README.md");
