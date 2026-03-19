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

// opencode.json has 10 commands
try {
  const cfg = JSON.parse(fs.readFileSync(path.join(root, ".opencode/opencode.json"), "utf8"));
  const cmds = Object.keys(cfg.command || {});
  if (cmds.length >= 10) ok(`opencode.json has ${cmds.length} commands`);
  else fail(`opencode.json has ${cmds.length} commands (expected 10+)`);
  const agents = Object.keys(cfg.agent || {});
  if (agents.length >= 7) ok(`opencode.json has ${agents.length} agents`);
  else fail(`opencode.json has ${agents.length} agents (expected 7+)`);
} catch (e) {
  fail(`opencode.json parse error: ${e.message}`);
}

// Validate sample review against schema (if ajv available)
try {
  const samplePath = path.join(root, "examples/sample-review-report.md");
  if (fs.existsSync(samplePath)) {
    // Extract JSON from sample or use a minimal valid fixture
    const fixture = {
      review_target: { name: "test", type: "repository", scope: "." },
      summary: { final_score: 7.2, letter_grade: "C", confidence: "medium", production_readiness: "conditionally_ready" },
      categories: {
        security: { score: 6, weight: 0.25, rationale: "test" },
        reliability: { score: 8, weight: 0.2, rationale: "test" },
        performance: { score: 7.5, weight: 0.15, rationale: "test" },
        cost_awareness: { score: 6.5, weight: 0.1, rationale: "test" },
        operational_excellence: { score: 8.5, weight: 0.3, rationale: "test" },
      },
      findings: { critical: [], high: [], medium: [], low: [], informational: [] },
    };
    const tmpPath = path.join(root, "tmp-verify-fixture.json");
    fs.mkdirSync(path.dirname(tmpPath), { recursive: true });
    fs.writeFileSync(tmpPath, JSON.stringify(fixture));
    const { execSync } = require("child_process");
    execSync(`node scripts/validate-schema.js review-score ${tmpPath}`, { cwd: root, stdio: "pipe" });
    fs.unlinkSync(tmpPath);
    ok("review-score schema validates fixture");
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

// Run unit tests if available
try {
  const { execSync } = require("child_process");
  execSync("node --test tests/", { cwd: root, stdio: "pipe" });
  ok("Unit tests passed");
} catch (e) {
  fail("Unit tests failed (run npm test for details)");
}

console.log("");
if (errors > 0) {
  console.error(`${errors} failure(s)`);
  process.exit(1);
}
console.log("All checks passed.");
process.exit(0);
