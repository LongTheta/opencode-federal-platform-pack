# OpenCode Review Output Template

Use this template for Well-Architected review outputs. Choose **Full Report** or **Concise Summary** based on scope.

**Schema:** `schemas/review-score.schema.json`  
**Scoring model:** `docs/scoring-model.md`  
**Full template:** `docs/report-template.md`

---

## Full Report

```markdown
# OpenCode Architecture Review

**Target:** [name]
**Type:** [repository | service | platform | architecture]
**Scope:** [scope or path]
**Review Date:** [ISO 8601 date]

---

## Executive Summary

[2–4 sentences: overall assessment, final score, grade, production readiness, top risk or blocker if any.]

---

## Summary Metrics

| Metric | Value |
|--------|-------|
| Final Score | [x.x/10] |
| Letter Grade | [A | B | C | D | F] |
| Confidence | [high | medium | low] |
| Production Readiness | [ready | conditionally_ready | not_ready] |

---

## Category Scores

| Category | Score | Weight | Grade |
|----------|-------|--------|-------|
| Security | [x/10] | 25% | [A–F] |
| Reliability | [x/10] | 20% | [A–F] |
| Performance | [x/10] | 15% | [A–F] |
| Cost Awareness | [x/10] | 10% | [A–F] |
| Operational Excellence | [x/10] | 30% | [A–F] |

---

## Category Details

For each category (Security, Reliability, Performance, Cost Awareness, Operational Excellence):

- **Score:** [x/10]
- **Rationale:** [Brief justification]
- **Evidence Found:** [List file paths, configs, manifests]
- **Missing Evidence:** [What could not be verified]
- **Risks:** [List risks]
- **Recommended Actions:** [List actions]

---

## Findings by Severity

### Critical
- [Finding] — [Evidence] — [Recommendation]

### High
- [Finding] — [Evidence] — [Recommendation]

### Medium
- [Finding] — [Evidence] — [Recommendation]

### Low
- [Finding] — [Evidence] — [Recommendation]

### Informational
- [Finding] — [Evidence]

---

## Top Priorities

1. **[Title]** — [Reason] — Severity: [critical | high | medium | low] — Owner: [hint]
2. **[Title]** — [Reason] — Severity: [critical | high | medium | low] — Owner: [hint]
3. **[Title]** — [Reason] — Severity: [critical | high | medium | low] — Owner: [hint]
```

---

## Concise Summary

```markdown
# OpenCode Review Summary

**Target:** [name]
**Final Score:** [x.x/10]
**Grade:** [A–F]
**Confidence:** [high | medium | low]
**Production Readiness:** [ready | conditionally_ready | not_ready]

---

## Category Scores

| Category | Score |
|----------|-------|
| Security | [x/10] |
| Reliability | [x/10] |
| Performance | [x/10] |
| Cost Awareness | [x/10] |
| Operational Excellence | [x/10] |

---

## Top Risks

1. [Risk]
2. [Risk]
3. [Risk]

---

## Top Priorities

1. [Action]
2. [Action]
3. [Action]
```

---

## Letter Grades

| Grade | Score Range |
|-------|-------------|
| A | 9.0 – 10.0 |
| B | 8.0 – 8.9 |
| C | 7.0 – 7.9 |
| D | 5.5 – 6.9 |
| F | below 5.5 |
