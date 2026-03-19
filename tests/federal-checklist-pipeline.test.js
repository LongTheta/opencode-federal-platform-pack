/**
 * Integration test: evidence-extractor → federal-control-mapper pipeline on fixture-repo.
 * Simulates the data flow used by /federal-checklist.
 * Run: node --test tests/federal-checklist-pipeline.test.js
 */

const { describe, it } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const fixtureDir = path.join(root, "examples/fixture-repo");

let _cachedPipeline;
function getPipelineOutput() {
  if (!_cachedPipeline) {
    if (!fs.existsSync(fixtureDir)) return null;
    const evOut = execSync(`node scripts/evidence-extractor.js "${fixtureDir}"`, {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 1024 * 1024,
    });
    const mapOut = execSync("node scripts/federal-control-mapper.js -", {
      cwd: root,
      input: evOut,
      encoding: "utf8",
    });
    _cachedPipeline = JSON.parse(mapOut);
  }
  return _cachedPipeline;
}

describe("federal-checklist pipeline on fixture-repo", () => {
  it("runs evidence-extractor → federal-control-mapper on fixture-repo", () => {
    const data = getPipelineOutput();
    if (!data) return;
    assert.ok(Array.isArray(data.control_mapping), "control_mapping is array");
    assert.ok(data.coverage && typeof data.coverage === "object", "coverage exists");
    assert.ok(Array.isArray(data.gaps), "gaps is array");
    assert.ok(Array.isArray(data.evidence_found), "evidence_found is array");
    assert.ok(Array.isArray(data.remediation_roadmap), "remediation_roadmap is array");
  });

  it("maps fixture-repo artifacts to expected control families", () => {
    const data = getPipelineOutput();
    if (!data) return;
    const families = data.control_mapping.map((m) => m.family);
    assert.ok(families.length >= 1, "at least one control family mapped");
    const hasConfigOrPipeline = families.some((f) => ["CM", "SA", "SI", "AC"].includes(f));
    assert.ok(hasConfigOrPipeline, "config/pipeline artifacts mapped to CM/SA/SI/AC");
  });
});
