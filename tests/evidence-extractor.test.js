/**
 * Tests for scripts/evidence-extractor.js
 * Run: node --test tests/evidence-extractor.test.js
 */

const { describe, it } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");

let _cachedEvidence;
function getEvidence(dir = ".") {
  const key = dir;
  if (!_cachedEvidence) _cachedEvidence = {};
  if (!_cachedEvidence[key]) {
    const out = execSync(`node scripts/evidence-extractor.js "${dir}"`, {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 1024 * 1024,
    });
    _cachedEvidence[key] = JSON.parse(out);
  }
  return _cachedEvidence[key];
}

describe("evidence-extractor", () => {
  it("produces valid JSON with required keys", () => {
    const data = getEvidence(".");
    assert.ok(Array.isArray(data.artifacts), "artifacts is array");
    assert.ok(Array.isArray(data.configs), "configs is array");
    assert.ok(Array.isArray(data.manifests), "manifests is array");
    assert.ok(Array.isArray(data.ci_cd), "ci_cd is array");
    assert.ok(data.structure && typeof data.structure.root === "string", "structure.root exists");
  });

  it("extracts package.json when run on repo root", () => {
    const data = getEvidence(".");
    const pkg = data.artifacts.find((a) => a.path.includes("package.json"));
    assert.ok(pkg, "package.json found in artifacts");
    assert.strictEqual(pkg.type, "config", "package.json type is config");
  });

  it("extracts .gitlab-ci.yml when present", () => {
    const data = getEvidence(".");
    const ci = data.artifacts.find((a) => a.path.includes(".gitlab-ci.yml"));
    assert.ok(ci, ".gitlab-ci.yml found");
    assert.strictEqual(ci.type, "ci_cd", "gitlab-ci type is ci_cd");
    assert.ok(data.ci_cd.some((p) => p.includes(".gitlab-ci.yml")), "ci_cd array includes gitlab-ci");
  });

  it("excludes node_modules", () => {
    const data = getEvidence(".");
    const nodeMods = data.artifacts.filter((a) => a.path.includes("node_modules"));
    assert.strictEqual(nodeMods.length, 0, "node_modules excluded");
  });

  it("handles fixture-repo directory", () => {
    const fixtureDir = path.join(root, "examples/fixture-repo");
    if (!fs.existsSync(fixtureDir)) return;
    const data = getEvidence(fixtureDir);
    assert.ok(Array.isArray(data.artifacts));
    assert.ok(data.artifacts.length >= 1, "fixture-repo has at least one artifact");
  });
});
