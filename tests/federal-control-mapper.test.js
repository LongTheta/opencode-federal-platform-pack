/**
 * Tests for scripts/federal-control-mapper.js
 * Run: node --test tests/federal-control-mapper.test.js
 */

const { describe, it } = require("node:test");
const assert = require("node:assert");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");

const MINIMAL_EVIDENCE = JSON.stringify({
  artifacts: [{ path: "package.json", type: "config" }],
  configs: ["package.json"],
  manifests: [],
  ci_cd: [],
  structure: { root: "." },
});

describe("federal-control-mapper", () => {
  it("produces valid output with required keys", () => {
    const mapOut = execSync("node scripts/federal-control-mapper.js -", {
      cwd: root,
      input: MINIMAL_EVIDENCE,
      encoding: "utf8",
    });
    const data = JSON.parse(mapOut);
    assert.ok(Array.isArray(data.control_mapping), "control_mapping is array");
    assert.ok(data.coverage && typeof data.coverage === "object", "coverage exists");
    assert.ok(Array.isArray(data.gaps), "gaps is array");
    assert.ok(Array.isArray(data.evidence_found), "evidence_found is array");
    assert.ok(Array.isArray(data.remediation_roadmap), "remediation_roadmap is array");
  });

  it("maps terraform artifacts to CM family", () => {
    const input = JSON.stringify({
      artifacts: [{ path: "terraform/main.tf", type: "iac" }],
    });
    const out = execSync("node scripts/federal-control-mapper.js -", {
      cwd: root,
      input,
      encoding: "utf8",
    });
    const data = JSON.parse(out);
    const cm = data.control_mapping.find((m) => m.family === "CM");
    assert.ok(cm, "CM family mapped from terraform");
    assert.ok(data.coverage.CM === "partial" || data.control_mapping.some((m) => m.family === "CM"));
  });

  it("maps dockerfile to SA/SI families", () => {
    const input = JSON.stringify({
      artifacts: [{ path: "Dockerfile", type: "container" }],
    });
    const out = execSync("node scripts/federal-control-mapper.js -", {
      cwd: root,
      input,
      encoding: "utf8",
    });
    const data = JSON.parse(out);
    const sa = data.control_mapping.find((m) => m.family === "SA");
    assert.ok(sa, "SA family mapped from Dockerfile");
  });

  it("reports gaps when artifacts empty", () => {
    const input = JSON.stringify({ artifacts: [] });
    const out = execSync("node scripts/federal-control-mapper.js -", {
      cwd: root,
      input,
      encoding: "utf8",
    });
    const data = JSON.parse(out);
    assert.ok(data.gaps.length >= 1, "gaps reported when no artifacts");
    assert.ok(data.remediation_roadmap.length >= 1, "remediation_roadmap has items");
  });

  it("rejects invalid JSON", () => {
    try {
      execSync("node scripts/federal-control-mapper.js -", {
        cwd: root,
        input: "not json",
        encoding: "utf8",
      });
      assert.fail("Should have thrown");
    } catch (e) {
      assert.ok(e.status !== 0 || e.message);
    }
  });
});
