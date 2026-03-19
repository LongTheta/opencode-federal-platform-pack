# review-score Tool

## Purpose

Compute weighted category scores from assessment findings; produce final score, letter grade, confidence, and production readiness.

---

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `categories` | object | Yes | Per-category scores (0–10): security, reliability, performance, cost_awareness, operational_excellence |
| `weights` | object | No | Override defaults: security 0.25, reliability 0.20, performance 0.15, cost_awareness 0.10, operational_excellence 0.30 |
| `findings` | array | No | Findings by severity for confidence adjustment |
| `evidence_found` | array | No | Count of evidence citations per category |
| `missing_evidence` | array | No | Count of missing evidence per category |

---

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `final_score` | number | Weighted sum 0–10 |
| `letter_grade` | string | A | B | C | D | F |
| `confidence` | string | high | medium | low |
| `production_readiness` | string | ready | conditionally_ready | not_ready |
| `category_grades` | object | Per-category letter grade |

---

## When Commands Call It

- `/repo-assess` — After category scoring; before final report
- `/gitops-audit` — After capability scoring; map to Well-Architected categories
- `/federal-checklist` — After control mapping; compute overall score
- `/verify` — When producing verification summary with score

---

## Failure Cases

| Case | Behavior |
|------|----------|
| Missing category | Use 0 for missing; log warning |
| Invalid category score (not 0–10) | Clamp to 0–10 |
| Weights do not sum to 1 | Normalize or reject |

---

## Schema Reference

`schemas/review-score.schema.json` — `summary` and `categories` objects

---

## Example Usage

```json
{
  "categories": {
    "security": 7,
    "reliability": 8,
    "performance": 7,
    "cost_awareness": 6,
    "operational_excellence": 8
  }
}
```

```json
{
  "final_score": 7.5,
  "letter_grade": "C",
  "confidence": "medium",
  "production_readiness": "conditionally_ready"
}
```
