#!/usr/bin/env node
/**
 * Cross-platform test runner. Finds *.test.js in tests/ and runs them.
 * Accepts optional group arg: unit | integration | evidence
 *   unit       - validate-schema, review-score, quality-gate-check (fast, no execSync)
 *   integration - federal-control-mapper, federal-checklist-pipeline (execSync on fixtures)
 *   evidence   - evidence-extractor (walks repo, slowest)
 * Fixes glob expansion on Linux CI where npm doesn't use a shell.
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const testsDir = path.resolve(__dirname, "../tests");

const GROUPS = {
  unit: ["validate-schema.test.js", "review-score.test.js", "quality-gate-check.test.js"],
  integration: ["federal-control-mapper.test.js", "federal-checklist-pipeline.test.js"],
  evidence: ["evidence-extractor.test.js"],
};

const groupArg = process.argv[2];
let files;
if (groupArg && GROUPS[groupArg]) {
  files = GROUPS[groupArg]
    .map((f) => path.join(testsDir, f))
    .filter((p) => fs.existsSync(p));
} else {
  files = fs.readdirSync(testsDir)
    .filter((f) => f.endsWith(".test.js"))
    .map((f) => path.join(testsDir, f))
    .sort();
}

const result = spawnSync(process.execPath, ["--test", ...files], {
  stdio: "inherit",
  cwd: path.resolve(__dirname, ".."),
});

process.exit(result.status ?? 1);
