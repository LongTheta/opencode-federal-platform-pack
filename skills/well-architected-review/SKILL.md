---
name: well-architected-review
description: Universal platform engineering review. Evaluates any repo or system against Security, Reliability, Performance, Cost, and Operations. Cloud-agnostic. Produces score, findings, risks, recommendations. Use for repo assessment, platform design, GitOps audit, quality gate, or federal checklist.
risk_tier: 0
---

# Well-Architected Review

Universal platform engineering review skill. **Cloud-agnostic.** Applies Well-Architected and DevOps best practices to any environment.

## When to Use

- Repository assessment
- Platform architecture design
- GitOps / CI/CD audit
- Quality gate evaluation
- Federal compliance checklist
- Pre-production readiness

## Evaluation Categories

| Category | What to Assess |
|----------|----------------|
| **Security** | Access control (least privilege), secrets management, encryption (at rest, in transit), network exposure, supply chain |
| **Reliability** | Failure modes, recovery strategy (RTO/RPO), health checks, redundancy, no single point of failure |
| **Performance** | Scaling (elasticity), bottlenecks, latency, resource limits |
| **Cost** | Right-sizing, waste, cost attribution/tagging, budget visibility |
| **Operations** | Observability (logs, metrics, traces), audit trail, documentation, runbooks, change control |

## Workflow

1. **Gather artifacts** — Repo structure, IaC, CI/CD, configs, manifests, docs.
2. **Evaluate each category** — Score 0–10; document evidence and gaps.
3. **Identify risks** — Rank by severity (Critical, High, Medium, Low).
4. **Document evidence** — What was observed; what was not found.
5. **Recommend actions** — Prioritized; concrete; effort and impact.

## Output Format

Use `output-template.md` for human-readable output. Structure:

```markdown
# OpenCode Review Summary

**Target:** [name]
**Final Score:** [x.x/10]
**Grade:** [A–F]
**Confidence:** [High / Medium / Low]
**Production Readiness:** [Ready / Conditionally Ready / Not Ready]

## Category Scores
- Security: [x/10]
- Reliability: [x/10]
- Performance: [x/10]
- Cost Awareness: [x/10]
- Operational Excellence: [x/10]

## Top Risks
1. ...
2. ...
3. ...

## Top Priorities
1. ...
2. ...
3. ...
```

Also include: Evidence Found, Missing Evidence (per category or overall). For structured output, use `schemas/review-score.schema.json`.

## Mandatory Rules

- **Evidence before conclusions** — Cite file, config, or manifest. No claims without proof.
- **Missing evidence** — State explicitly; recommend validation.
- **Severity** — Critical (block prod), High (prioritize), Medium (important), Low (nice to have).
- **If a system would fail a Well-Architected review, it must be flagged.**

## Evidence Labels

| Label | Meaning |
|-------|---------|
| **Observed** | Direct evidence in repo |
| **Inferred** | Derived from patterns |
| **Missing Evidence** | No evidence; cannot assume |
| **Contradictory** | Conflicting signals |

## Verdict

| Verdict | When |
|---------|------|
| **ready** | No critical failures; minor gaps acceptable with plan |
| **conditional** | High-risk findings; fix before prod or accept documented risk |
| **not_ready** | Critical failures; do not deploy |

## Schema

Use `schemas/review-score.schema.json` for structured output. It supports weighted category scores (Security 25%, Reliability 20%, Performance 15%, Cost Awareness 10%, Operational Excellence 30%), letter grades, per-category evidence/risks/actions, findings by severity, and top_priorities. See `docs/scoring-model.md` for the scoring model.

## References

- `instructions/aws-derived-principles.md` — Universal principles (cloud-agnostic)
