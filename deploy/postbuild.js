const fs = require('fs');
const def = "export * from './deploy';";
fs.writeFileSync('./dist/index.d.ts', def);

const packageFile = fs.readFileSync('./package.json');
const packageObject = JSON.parse(packageFile);
// packageObject.dependencies = {};
packageObject.devDependencies = {};
packageObject.scripts = {};
fs.writeFileSync('./dist/package.json', JSON.stringify(packageObject));

fs.copyFileSync("./README.md", "./dist/README.md");
