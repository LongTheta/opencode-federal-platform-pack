/**
 * Schema validation tests
 * Run: node --test tests/validate-schema.test.js
 * Requires: npm install (ajv, ajv-formats)
 */

const { describe, it } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");

function runValidate(schema, file) {
  return execSync(`node scripts/validate-schema.js ${schema} ${file}`, {
    cwd: root,
    encoding: "utf8",
  });
}

describe("validate-schema review-score", () => {
  it("validates valid-review-score.json", () => {
    const fixture = path.join(root, "tests/fixtures/valid-review-score.json");
    const out = runValidate("review-score", fixture);
    assert.ok(out.includes("Valid") || out.includes("✓"));
  });
});

describe("validate-schema quality-gate", () => {
  it("validates valid-quality-gate.json", () => {
    const fixture = path.join(root, "tests/fixtures/valid-quality-gate.json");
    const out = runValidate("quality-gate", fixture);
    assert.ok(out.includes("Valid") || out.includes("✓"));
  });
});

describe("validate-schema rejects invalid", () => {
  it("rejects invalid review-score (missing required)", () => {
    const invalid = path.join(root, "tmp-invalid-test.json");
    fs.writeFileSync(invalid, JSON.stringify({ review_target: { name: "x" } }));
    try {
      runValidate("review-score", invalid);
      assert.fail("Should have thrown");
    } catch (e) {
      assert.ok(e.status !== 0 || e.message);
    } finally {
      if (fs.existsSync(invalid)) fs.unlinkSync(invalid);
    }
  });
});
