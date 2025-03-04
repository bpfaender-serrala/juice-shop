const fs = require('fs');
const path = require('path');
const stripComments = require('strip-comments');

function processFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}:`, err);
      return;
    }
    const stripped = stripComments(data);
    fs.writeFile(filePath, stripped, (err) => {
      if (err) {
        console.error(`Error writing ${filePath}:`, err);
      } else {
        console.log(`Processed ${filePath}`);
      }
    });
  });
}

function walkDir(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }
    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.isFile() && fullPath.endsWith('.ts')) {
        processFile(fullPath);
      }
    });
  });
}

// Assuming your source files are in the 'src' directory
walkDir('./frontend/src/app');
