const fs = require("fs");
const path = require("path");

const outputDirectory = path.join(__dirname, "..", "_site");
fs.rmSync(outputDirectory, { recursive: true, force: true });
