# Tests

Unit tests and schema validation for the federal platform pack.

---

## Run Tests

```bash
npm install
npm test
```

Uses Node's built-in test runner (`node --test`).

---

## Test Files

| File | Purpose |
|------|---------|
| `review-score.test.js` | Unit tests for scoreToGrade, computeFinalScore, productionReadiness |
| `quality-gate-check.test.js` | Unit tests for computeVerdict |
| `validate-schema.test.js` | Schema validation for fixtures |
| `fixtures/valid-review-score.json` | Valid review-score fixture |
| `fixtures/valid-quality-gate.json` | Valid quality-gate fixture |

---

## Adding Tests

1. Create `tests/<name>.test.js`
2. Use `node:test` and `node:assert`
3. Run `npm test`
