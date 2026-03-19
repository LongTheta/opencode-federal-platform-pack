#!/usr/bin/env node
/**
 * Quality gate check - returns verdict from findings.
 * Usage: node scripts/quality-gate-check.js [path/to/findings.json]
 * Input: { "blockers": [...], "warnings": [...], "informational": [...] }
 * Output: { "verdict": "pass"|"pass_with_warnings"|"fail", "push_ready": bool }
 */

function computeVerdict(data) {
  const blockers = data.blockers || [];
  const warnings = data.warnings || [];
  const verdict = blockers.length > 0 ? "fail" : warnings.length > 0 ? "pass_with_warnings" : "pass";
  const push_ready = verdict !== "fail";
  return { verdict, push_ready };
}

module.exports = { computeVerdict };

const { readInput } = require("./lib/read-input.js");

async function main() {
  const input = await readInput(process.argv[2]);
  const data = JSON.parse(input || "{}");
  const { verdict, push_ready } = computeVerdict(data);
  const result = {
    verdict,
    push_ready,
    timestamp: new Date().toISOString(),
    blocker_count: (data.blockers || []).length,
    warning_count: (data.warnings || []).length,
  };
  console.log(JSON.stringify(result, null, 2));
  process.exit(verdict === "fail" ? 2 : 0);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
