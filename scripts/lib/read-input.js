/**
 * Shared helper: read JSON input from stdin or file.
 * Usage: const data = JSON.parse(await readInput(process.argv[2]) || "{}");
 */

const fs = require("fs");

function readInput(arg) {
  if (arg === "-" || !arg) {
    return new Promise((resolve) => {
      let data = "";
      process.stdin.on("data", (chunk) => (data += chunk));
      process.stdin.on("end", () => resolve(data));
    });
  }
  return Promise.resolve(fs.readFileSync(arg, "utf8"));
}

module.exports = { readInput };
