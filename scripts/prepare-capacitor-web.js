const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "www");
const files = [
  "index.html",
  "styles.css",
  "script.js",
  "manifest.webmanifest",
  "sw.js"
];

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDirectory(source, target) {
  fs.mkdirSync(target, { recursive: true });
  for (const item of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, item.name);
    const targetPath = path.join(target, item.name);

    if (item.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      copyFile(sourcePath, targetPath);
    }
  }
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const file of files) {
  copyFile(path.join(rootDir, file), path.join(outputDir, file));
}

copyDirectory(path.join(rootDir, "icons"), path.join(outputDir, "icons"));

const downloadsDir = path.join(rootDir, "downloads");
if (fs.existsSync(downloadsDir)) {
  copyDirectory(downloadsDir, path.join(outputDir, "downloads"));
}

console.log("Prepared Capacitor web assets in www/");
