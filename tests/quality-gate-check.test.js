/**
 * Unit tests for scripts/quality-gate-check.js
 * Run: node --test tests/quality-gate-check.test.js
 */

const { describe, it } = require("node:test");
const assert = require("node:assert");
const { computeVerdict } = require("../scripts/quality-gate-check.js");

describe("computeVerdict", () => {
  it("returns fail when blockers exist", () => {
    const { verdict, push_ready } = computeVerdict({ blockers: [{ id: "x" }] });
    assert.strictEqual(verdict, "fail");
    assert.strictEqual(push_ready, false);
  });
  it("returns pass_with_warnings when only warnings", () => {
    const { verdict, push_ready } = computeVerdict({ warnings: [{ id: "x" }] });
    assert.strictEqual(verdict, "pass_with_warnings");
    assert.strictEqual(push_ready, true);
  });
  it("returns pass when no blockers or warnings", () => {
    const { verdict, push_ready } = computeVerdict({});
    assert.strictEqual(verdict, "pass");
    assert.strictEqual(push_ready, true);
  });
  it("returns pass when only informational", () => {
    const { verdict } = computeVerdict({ informational: [{ id: "x" }] });
    assert.strictEqual(verdict, "pass");
  });
  it("blockers take precedence over warnings", () => {
    const { verdict } = computeVerdict({ blockers: [{}], warnings: [{}] });
    assert.strictEqual(verdict, "fail");
  });
});
