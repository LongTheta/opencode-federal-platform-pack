#!/usr/bin/env node
/**
 * Federal control mapper — map repo artifacts to NIST 800-53 control families.
 * Usage: node scripts/federal-control-mapper.js [artifacts.json]
 *   Or: node scripts/evidence-extractor.js . | node scripts/federal-control-mapper.js -
 * Input: JSON with artifacts array (from evidence-extractor) or stdin
 * Output: JSON to stdout (control_mapping, gaps, evidence_found, remediation_roadmap)
 * See: .opencode/tools/federal-control-mapper.md
 */

const fs = require("fs");
const path = require("path");
const { NIST_FAMILIES } = require("./lib/federal-controls.js");

// Heuristic mapping: artifact path/type -> NIST control families
const ARTIFACT_TO_CONTROLS = {
  iam: ["AC", "IA", "AC-2", "AC-3", "IA-2", "IA-5"],
  terraform: ["CM", "CM-2", "CM-3"],
  dockerfile: ["SA", "SA-12", "SI-3", "SI-7"],
  docker: ["SA", "SA-12", "SI-3"],
  k8s: ["AC", "CM", "SC", "AC-2", "CM-2", "SC-7"],
  deployment: ["CM", "CM-3"],
  secret: ["IA", "IA-5", "SC", "SC-28"],
  vault: ["IA-5", "SC-28"],
  cloudwatch: ["AU", "AU-2", "AU-3", "SI-4"],
  log: ["AU", "AU-2", "AU-6"],
  audit: ["AU", "AU-2", "AU-9"],
  github: ["CM", "SA-11", "SI-3"],
  gitlab: ["CM", "SA-11", "SI-3"],
  pipeline: ["CM", "SA-11", "SA-12"],
  sbom: ["SA-12", "SI-7"],
  trivy: ["SI-3", "SA-11"],
  network: ["SC", "SC-7", "SC-8"],
  vpc: ["SC-7"],
  tls: ["SC", "SC-8", "SC-13"],
};

function mapArtifactToControls(artifact) {
  const p = (artifact.path || "").toLowerCase();
  const t = (artifact.type || "").toLowerCase();
  const combined = p + " " + t;
  const controls = new Set();
  for (const [key, ctrls] of Object.entries(ARTIFACT_TO_CONTROLS)) {
    if (combined.includes(key)) ctrls.forEach((c) => controls.add(c));
  }
  return Array.from(controls);
}

function main() {
  let input;
  const arg = process.argv[2];
  if (arg === "-" || !arg) {
    input = fs.readFileSync(0, "utf8");
  } else {
    const p = path.resolve(arg);
    if (!fs.existsSync(p)) {
      console.error("File not found:", p);
      process.exit(1);
    }
    input = fs.readFileSync(p, "utf8");
  }
  let data;
  try {
    data = JSON.parse(input);
  } catch (e) {
    console.error("Invalid JSON input");
    process.exit(1);
  }
  const artifacts = data.artifacts || [];
  const controlMapping = [];
  const evidenceByControl = new Map();
  for (const art of artifacts) {
    const controls = mapArtifactToControls(art);
    for (const ctrl of controls) {
      controlMapping.push({
        family: ctrl.split("-")[0],
        control_id: ctrl,
        status: "Partial",
        evidence: art.path,
        gap: "",
      });
      if (!evidenceByControl.has(ctrl)) evidenceByControl.set(ctrl, []);
      evidenceByControl.get(ctrl).push(art.path);
    }
  }
  const evidenceFound = Array.from(evidenceByControl.entries()).map(([control_id, paths]) => ({
    control_id,
    evidence: paths,
  }));
  const covered = new Set(controlMapping.map((m) => m.control_id.split("-")[0]));
  const gaps = NIST_FAMILIES.filter((f) => !covered.has(f));
  const remediationRoadmap = gaps.map((f) => `Add evidence for NIST ${f} family`);
  const output = {
    control_mapping: controlMapping.length ? controlMapping : [{ family: "AC", control_id: "AC-2", status: "Gap", evidence: "", gap: "No artifacts" }],
    coverage: Object.fromEntries(NIST_FAMILIES.map((f) => [f, covered.has(f) ? "partial" : "gap"])),
    gaps,
    evidence_found: evidenceFound,
    remediation_roadmap: remediationRoadmap,
  };
  console.log(JSON.stringify(output, null, 2));
}

main();
