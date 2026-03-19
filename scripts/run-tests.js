#!/usr/bin/env node
/**
 * Cross-platform test runner. Finds *.test.js in tests/ and runs them.
 * Fixes glob expansion on Linux CI where npm doesn't use a shell.
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const testsDir = path.resolve(__dirname, "../tests");
const files = fs.readdirSync(testsDir)
  .filter((f) => f.endsWith(".test.js"))
  .map((f) => path.join(testsDir, f))
  .sort();

const result = spawnSync(process.execPath, ["--test", ...files], {
  stdio: "inherit",
  cwd: path.resolve(__dirname, ".."),
});

process.exit(result.status ?? 1);
