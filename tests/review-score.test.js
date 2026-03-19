/**
 * Unit tests for scripts/review-score.js
 * Run: node --test tests/review-score.test.js
 */

const { describe, it } = require("node:test");
const assert = require("node:assert");
const {
  scoreToGrade,
  computeFinalScore,
  productionReadiness,
  WEIGHTS,
} = require("../scripts/review-score.js");

describe("scoreToGrade", () => {
  it("returns A for 9.0-10", () => {
    assert.strictEqual(scoreToGrade(9), "A");
    assert.strictEqual(scoreToGrade(9.5), "A");
    assert.strictEqual(scoreToGrade(10), "A");
  });
  it("returns B for 8.0-8.9", () => {
    assert.strictEqual(scoreToGrade(8), "B");
    assert.strictEqual(scoreToGrade(8.5), "B");
    assert.strictEqual(scoreToGrade(8.9), "B");
  });
  it("returns C for 7.0-7.9", () => {
    assert.strictEqual(scoreToGrade(7), "C");
    assert.strictEqual(scoreToGrade(7.5), "C");
  });
  it("returns D for 5.5-6.9", () => {
    assert.strictEqual(scoreToGrade(5.5), "D");
    assert.strictEqual(scoreToGrade(6), "D");
    assert.strictEqual(scoreToGrade(6.9), "D");
  });
  it("returns F for below 5.5", () => {
    assert.strictEqual(scoreToGrade(5.4), "F");
    assert.strictEqual(scoreToGrade(0), "F");
  });
});

describe("computeFinalScore", () => {
  it("computes weighted average correctly", () => {
    const cat = {
      security: 8,
      reliability: 8,
      performance: 8,
      cost_awareness: 8,
      operational_excellence: 8,
    };
    const score = computeFinalScore(cat);
    assert.strictEqual(score, 8);
  });
  it("weights sum to 1", () => {
    const sum = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
    assert.strictEqual(Math.round(sum * 100) / 100, 1);
  });
  it("clamps category scores to 0-10", () => {
    const cat = {
      security: 15,
      reliability: -1,
      performance: 7,
      cost_awareness: 6,
      operational_excellence: 8,
    };
    const score = computeFinalScore(cat);
    assert.ok(score >= 0 && score <= 10);
  });
  it("handles missing categories as 0", () => {
    const score = computeFinalScore({});
    assert.strictEqual(score, 0);
  });
});

describe("productionReadiness", () => {
  it("returns not_ready when critical findings exist", () => {
    assert.strictEqual(productionReadiness({ critical: [{}] }), "not_ready");
  });
  it("returns conditionally_ready when only high findings", () => {
    assert.strictEqual(productionReadiness({ high: [{}] }), "conditionally_ready");
  });
  it("returns ready when no critical or high", () => {
    assert.strictEqual(productionReadiness({ medium: [{}], low: [{}] }), "ready");
    assert.strictEqual(productionReadiness({}), "ready");
  });
});
