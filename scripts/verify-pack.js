#!/usr/bin/env node
/**
 * Smoke test / verification for opencode-federal-platform-pack.
 * Verifies: structure, schemas, sample validation, scripts.
 */

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
let errors = 0;

function ok(msg) {
  console.log("✓", msg);
}

function fail(msg) {
  console.error("✗", msg);
  errors++;
}

// Required paths
const required = [
  ".opencode/opencode.json",
  ".opencode/commands/repo-assess.md",
  ".opencode/plugins/federal-platform-enforcement.js",
  ".opencode/plugins/governance-plugin/rules-map.md",
  "schemas/review-score.schema.json",
  "schemas/quality-gate.schema.json",
  "skills/well-architected-review/SKILL.md",
  "rules/evidence-before-claims.md",
  "INSTALL.md",
  "llms.txt",
];

for (const p of required) {
  if (fs.existsSync(path.join(root, p))) ok(p);
  else fail(`Missing: ${p}`);
}

// opencode.json has 25+ commands, 17+ agents
try {
  const cfg = JSON.parse(fs.readFileSync(path.join(root, ".opencode/opencode.json"), "utf8"));
  const cmds = Object.keys(cfg.command || {});
  if (cmds.length >= 25) ok(`opencode.json has ${cmds.length} commands`);
  else fail(`opencode.json has ${cmds.length} commands (expected 25+)`);
  const agents = Object.keys(cfg.agent || {});
  if (agents.length >= 17) ok(`opencode.json has ${agents.length} agents`);
  else fail(`opencode.json has ${agents.length} agents (expected 17+)`);
} catch (e) {
  fail(`opencode.json parse error: ${e.message}`);
}

// Validate sample fixtures against schemas (if ajv available)
try {
  const { validateFileSync } = require("./validate-schema.js");
  const reviewFixture = path.join(root, "tests/fixtures/valid-review-score.json");
  const complianceFixture = path.join(root, "tests/fixtures/valid-compliance-report.json");
  if (fs.existsSync(reviewFixture)) {
    const { valid } = validateFileSync("review-score", reviewFixture);
    if (valid) ok("review-score schema validates fixture");
    else fail("review-score schema validation failed");
  }
  if (fs.existsSync(complianceFixture)) {
    const { valid } = validateFileSync("compliance-report", complianceFixture);
    if (valid) ok("compliance-report schema validates fixture");
    else fail("compliance-report schema validation failed");
  }
} catch (e) {
  const msg = (e.message || "") + (e.stderr || "");
  if (msg.includes("ajv") || msg.includes("ERR_MODULE_NOT_FOUND")) {
    ok("Schema validation skipped (run npm install for full check)");
  } else {
    fail(`Schema validation: ${e.message}`);
  }
}

// review-score script
try {
  const { execSync } = require("child_process");
  const out = execSync(
    'node scripts/review-score.js -',
    { cwd: root, input: '{"security":7,"reliability":8,"performance":7,"cost_awareness":6,"operational_excellence":8}', encoding: "utf8" }
  );
  const r = JSON.parse(out);
  if (r.final_score !== undefined && r.letter_grade) ok("review-score.js works");
  else fail("review-score.js output invalid");
} catch (e) {
  fail(`review-score.js: ${e.message}`);
}

// evidence-extractor + federal-control-mapper (run once, reuse output)
let evOut;
try {
  const { execSync } = require("child_process");
  evOut = execSync("node scripts/evidence-extractor.js .", { cwd: root, encoding: "utf8", maxBuffer: 1024 * 1024 });
  const ev = JSON.parse(evOut);
  if (Array.isArray(ev.artifacts) && Array.isArray(ev.configs)) ok("evidence-extractor.js works");
  else fail("evidence-extractor.js output invalid");
} catch (e) {
  fail(`evidence-extractor.js: ${e.message}`);
}

try {
  if (evOut) {
    const { execSync } = require("child_process");
    const mapOut = execSync("node scripts/federal-control-mapper.js -", { cwd: root, input: evOut, encoding: "utf8" });
    const map = JSON.parse(mapOut);
    if (Array.isArray(map.control_mapping) && Array.isArray(map.gaps)) ok("federal-control-mapper.js works");
    else fail("federal-control-mapper.js output invalid");
  }
} catch (e) {
  fail(`federal-control-mapper.js: ${e.message}`);
}

// target-architecture-synthesizer script
try {
  const { execSync } = require("child_process");
  const out = execSync("node scripts/target-architecture-synthesizer.js .", { cwd: root, encoding: "utf8", maxBuffer: 1024 * 1024 });
  const r = JSON.parse(out);
  if (Array.isArray(r.options) && r.options.length >= 1) ok("target-architecture-synthesizer.js works");
  else fail("target-architecture-synthesizer.js output invalid");
} catch (e) {
  fail(`target-architecture-synthesizer.js: ${e.message}`);
}

// quality-gate-check script
try {
  const { execSync } = require("child_process");
  const out = execSync(
    'node scripts/quality-gate-check.js -',
    { cwd: root, input: '{"blockers":[],"warnings":[]}', encoding: "utf8" }
  );
  const r = JSON.parse(out);
  if (r.verdict === "pass" && r.push_ready) ok("quality-gate-check.js works");
  else fail("quality-gate-check.js output invalid");
} catch (e) {
  fail(`quality-gate-check.js: ${e.message}`);
}

// Unit tests run separately via npm test in CI

console.log("");
if (errors > 0) {
  console.error(`${errors} failure(s)`);
  process.exit(1);
}
console.log("All checks passed.");
process.exit(0);
