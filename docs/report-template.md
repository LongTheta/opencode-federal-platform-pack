# OpenCode Review Report Template

Use this template for full and concise review outputs. Replace placeholders with actual content.

---

## Full Report Template

```markdown
# OpenCode Architecture Review

**Target:** [name]  
**Type:** [repository | service | platform | architecture]  
**Scope:** [scope or path]  
**Review Date:** [ISO 8601 date]

---

## Executive Summary

[2–4 sentences: overall assessment, final score, grade, production readiness, and top risk or blocker if any.]

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

### Security (25%)

- **Score:** [x/10]
- **Rationale:** [Brief justification]
- **Evidence Found:** [List file paths, configs, manifests]
- **Missing Evidence:** [What could not be verified]
- **Risks:** [List risks]
- **Recommended Actions:** [List actions]

### Reliability (20%)

- **Score:** [x/10]
- **Rationale:** [Brief justification]
- **Evidence Found:** [List]
- **Missing Evidence:** [List]
- **Risks:** [List]
- **Recommended Actions:** [List]

### Performance (15%)

- **Score:** [x/10]
- **Rationale:** [Brief justification]
- **Evidence Found:** [List]
- **Missing Evidence:** [List]
- **Risks:** [List]
- **Recommended Actions:** [List]

### Cost Awareness (10%)

- **Score:** [x/10]
- **Rationale:** [Brief justification]
- **Evidence Found:** [List]
- **Missing Evidence:** [List]
- **Risks:** [List]
- **Recommended Actions:** [List]

### Operational Excellence (30%)

- **Score:** [x/10]
- **Rationale:** [Brief justification]
- **Evidence Found:** [List]
- **Missing Evidence:** [List]
- **Risks:** [List]
- **Recommended Actions:** [List]

---

## Findings by Severity

### Critical
- [Finding title] — [Evidence] — [Recommendation]

### High
- [Finding title] — [Evidence] — [Recommendation]

### Medium
- [Finding title] — [Evidence] — [Recommendation]

### Low
- [Finding title] — [Evidence] — [Recommendation]

### Informational
- [Finding title] — [Evidence]

---

## Top Priorities

1. **[Title]** — [Reason] — Severity: [critical | high | medium | low] — Owner: [hint]
2. **[Title]** — [Reason] — Severity: [critical | high | medium | low] — Owner: [hint]
3. **[Title]** — [Reason] — Severity: [critical | high | medium | low] — Owner: [hint]

---

## Appendix

[Optional: raw data, tool outputs, or references.]
```

---

## Concise Summary Template

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
