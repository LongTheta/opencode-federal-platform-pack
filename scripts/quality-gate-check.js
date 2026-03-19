#!/usr/bin/env node
/**
 * Quality gate check - returns verdict from findings.
 * Usage: node scripts/quality-gate-check.js [path/to/findings.json]
 * Input: { "blockers": [...], "warnings": [...], "informational": [...] }
 * Output: { "verdict": "pass"|"pass_with_warnings"|"fail", "push_ready": bool }
 */

async function main() {
  let input;
  const arg = process.argv[2];
  if (arg === "-" || !arg) {
    input = await new Promise((r) => {
      let d = "";
      process.stdin.on("data", (c) => (d += c));
      process.stdin.on("end", () => r(d));
    });
  } else {
    input = require("fs").readFileSync(arg, "utf8");
  }
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

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
