/**
 * Schema validation tests
 * Run: node --test tests/validate-schema.test.js
 * Requires: npm install (ajv, ajv-formats)
 */

const { describe, it } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { validateFileSync } = require("../scripts/validate-schema.js");

const root = path.resolve(__dirname, "..");

describe("validate-schema review-score", () => {
  it("validates valid-review-score.json", () => {
    const fixture = path.join(root, "tests/fixtures/valid-review-score.json");
    const { valid } = validateFileSync("review-score", fixture);
    assert.ok(valid);
  });
});

describe("validate-schema quality-gate", () => {
  it("validates valid-quality-gate.json", () => {
    const fixture = path.join(root, "tests/fixtures/valid-quality-gate.json");
    const { valid } = validateFileSync("quality-gate", fixture);
    assert.ok(valid);
  });
});

describe("validate-schema compliance-report", () => {
  it("validates valid-compliance-report.json", () => {
    const fixture = path.join(root, "tests/fixtures/valid-compliance-report.json");
    const { valid } = validateFileSync("compliance-report", fixture);
    assert.ok(valid);
  });
});

describe("validate-schema example outputs", () => {
  it("validates examples/sample-federal-checklist-output.json", () => {
    const sample = path.join(root, "examples/sample-federal-checklist-output.json");
    if (!fs.existsSync(sample)) return;
    const { valid } = validateFileSync("compliance-report", sample);
    assert.ok(valid);
  });

  it("validates examples/sample-gitops-audit-output.json", () => {
    const sample = path.join(root, "examples/sample-gitops-audit-output.json");
    if (!fs.existsSync(sample)) return;
    const { valid } = validateFileSync("review-score", sample);
    assert.ok(valid);
  });
});

describe("validate-schema rejects invalid", () => {
  it("rejects invalid review-score (missing required)", () => {
    const invalid = path.join(root, "tmp-invalid-test.json");
    fs.writeFileSync(invalid, JSON.stringify({ review_target: { name: "x" } }));
    try {
      const { valid } = validateFileSync("review-score", invalid);
      assert.ok(!valid);
    } finally {
      if (fs.existsSync(invalid)) fs.unlinkSync(invalid);
    }
  });

  it("rejects invalid compliance-report (bad enum values)", () => {
    const invalid = path.join(root, "tests/fixtures/invalid-compliance-report.json");
    if (!fs.existsSync(invalid)) return;
    const { valid } = validateFileSync("compliance-report", invalid);
    assert.ok(!valid);
  });
});
