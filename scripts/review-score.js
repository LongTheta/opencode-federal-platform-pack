#!/usr/bin/env node
/**
 * Compute weighted review score from category scores.
 * Usage: node scripts/review-score.js [path/to/scores.json]
 * Or pipe JSON: echo '{"security":7,"reliability":8,...}' | node scripts/review-score.js -
 */

const WEIGHTS = {
  security: 0.25,
  reliability: 0.2,
  performance: 0.15,
  cost_awareness: 0.1,
  operational_excellence: 0.3,
};

const GRADE_BANDS = [
  [9, 10, "A"],
  [8, 8.9, "B"],
  [7, 7.9, "C"],
  [5.5, 6.9, "D"],
  [0, 5.4, "F"],
];

function scoreToGrade(s) {
  for (const [lo, hi, g] of GRADE_BANDS) {
    if (s >= lo && s <= hi) return g;
  }
  return "F";
}

function computeFinalScore(categories) {
  let sum = 0;
  for (const [cat, weight] of Object.entries(WEIGHTS)) {
    const s = Math.min(10, Math.max(0, Number(categories[cat]) || 0));
    sum += s * weight;
  }
  return Math.round(sum * 10) / 10;
}

function productionReadiness(findings) {
  const critical = (findings?.critical || []).length;
  const high = (findings?.high || []).length;
  if (critical > 0) return "not_ready";
  if (high > 0) return "conditionally_ready";
  return "ready";
}

// Export for tests
if (typeof module !== "undefined" && module.exports) {
  module.exports = { scoreToGrade, computeFinalScore, productionReadiness, WEIGHTS, GRADE_BANDS };
}

const { readInput } = require("./lib/read-input.js");

async function main() {
  const input = await readInput(process.argv[2]);
  const data = JSON.parse(input || "{}");
  const categories = data.categories || data;
  const finalScore = computeFinalScore(categories);
  const grade = scoreToGrade(finalScore);
  const pr = productionReadiness(data.findings);
  const confidence = data.confidence || "medium";
  console.log(JSON.stringify({ final_score: finalScore, letter_grade: grade, confidence, production_readiness: pr }, null, 2));
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
