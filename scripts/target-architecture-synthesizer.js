#!/usr/bin/env node
/**
 * Target architecture synthesizer — derive recommended architecture options from repo artifacts.
 * Usage: node scripts/target-architecture-synthesizer.js [directory]
 * Pipes: evidence-extractor → federal-control-mapper → synthesizes options from gaps.
 * See: .opencode/tools/target-architecture-synthesizer.md
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { NIST_FAMILIES } = require("./lib/federal-controls.js");

const root = path.resolve(__dirname, "..");

function main() {
  const dir = process.argv[2] || process.cwd();
  const absDir = path.resolve(dir);
  if (!fs.existsSync(absDir) || !fs.statSync(absDir).isDirectory()) {
    console.error("Directory not found:", absDir);
    process.exit(1);
  }

  const evOut = execSync(`node scripts/evidence-extractor.js "${absDir}"`, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024,
  });
  const mapOut = execSync("node scripts/federal-control-mapper.js -", {
    cwd: root,
    input: evOut,
    encoding: "utf8",
  });

  const map = JSON.parse(mapOut);
  const gaps = map.gaps || [];
  const roadmap = map.remediation_roadmap || [];
  const coverage = map.coverage || {};

  // Build options from gaps: minimal vs comprehensive
  const gapFamilies = NIST_FAMILIES.filter((f) => coverage[f] === "gap" || gaps.includes(f));

  const optionMinimal = {
    name: "Minimal — address critical gaps",
    description: "Add evidence for highest-priority NIST families: AC, IA, SC, AU",
    pros: ["Lower effort", "Faster path to conditionally_ready"],
    cons: ["Partial coverage", "More gaps remain"],
    score: 6,
    risks: ["Some controls remain unaddressed"],
    items: roadmap.slice(0, 3),
  };

  const optionComprehensive = {
    name: "Comprehensive — full control coverage",
    description: "Add evidence for all gap families: " + gapFamilies.join(", "),
    pros: ["Full coverage", "FedRAMP readiness"],
    cons: ["Higher effort", "Longer timeline"],
    score: 8,
    risks: ["Requires SBOM, observability, secrets, IaC"],
    items: roadmap,
  };

  const output = {
    options: [optionMinimal, optionComprehensive],
    decision_log: [
      { decision: "Gap families", rationale: gapFamilies.join(", ") || "None" },
      { decision: "Evidence found", rationale: `${(map.evidence_found || []).length} controls` },
    ],
    architecture_score: {
      security: gapFamilies.includes("AC") || gapFamilies.includes("IA") ? 5 : 7,
      reliability: gapFamilies.includes("CP") ? 5 : 7,
      operations: gapFamilies.includes("AU") ? 5 : 7,
    },
    key_risks: roadmap.slice(0, 5),
    evidence_missing: gapFamilies.map((f) => `NIST ${f} family`),
  };

  console.log(JSON.stringify(output, null, 2));
}

main();
