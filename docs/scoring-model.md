# OpenCode Scoring Model

Universal architecture scoring model for repository, service, platform, or cloud environment reviews. Inspired by AWS Well-Architected best practices; generalized for any target.

---

## Category Weights

| Category | Weight | Description |
|----------|--------|-------------|
| Security | 25% | Identity, encryption, secrets, supply chain, compliance |
| Reliability | 20% | Resilience, failover, recovery, change management |
| Performance | 15% | Efficiency, scaling, latency, resource utilization |
| Cost Awareness | 10% | Resource sizing, waste reduction, cost controls |
| Operational Excellence | 30% | Observability, automation, runbooks, documentation |

**Final score** = Σ (category_score × weight) for all five categories.

---

## Scoring Scale

Each category is scored **0 to 10**:

- **0–2** — Critical gaps; significant risk
- **3–4** — Major gaps; not production-ready
- **5–6** — Partial coverage; conditionally acceptable
- **7–8** — Good coverage; minor improvements needed
- **9–10** — Strong; best practices demonstrated

---

## Letter Grades

| Grade | Score Range | Interpretation |
|-------|-------------|----------------|
| A | 9.0 – 10.0 | Production-ready; minimal risk |
| B | 8.0 – 8.9 | Good; address minor gaps |
| C | 7.0 – 7.9 | Acceptable; improvements recommended |
| D | 5.5 – 6.9 | Below target; significant work required |
| F | below 5.5 | Not ready; critical remediation needed |

---

## Per-Category Fields

Each category must include:

| Field | Required | Description |
|-------|----------|-------------|
| `score` | Yes | 0–10 for this category |
| `weight` | Yes | Category weight (e.g., 0.25 for Security) |
| `rationale` | Yes | Brief justification for the score |
| `evidence_found` | No | File paths, configs, manifests observed |
| `missing_evidence` | No | What could not be verified |
| `risks` | No | Risks identified in this category |
| `recommended_actions` | No | Concrete actions to improve |

---

## Confidence Level

| Level | Criteria |
|-------|----------|
| **high** | Sufficient artifacts; configs, CI, IaC, docs reviewed |
| **medium** | Partial evidence; some areas inferred or assumed |
| **low** | Limited artifacts; significant gaps in visibility |

---

## Severity Levels

| Severity | Definition |
|----------|------------|
| **critical** | Must fix before production; blocks deployment |
| **high** | Significant gap; prioritize before or shortly after launch |
| **medium** | Important improvement; plan for next sprint |
| **low** | Nice to have; backlog |
| **informational** | Observation; no action required |

---

## Production Readiness

| Status | Criteria |
|--------|----------|
| **ready** | No critical findings; high-risk findings addressed or accepted |
| **conditionally_ready** | High-risk findings present; mitigation plan in place |
| **not_ready** | One or more critical findings; deployment blocked |

---

## Commands Using This Model

| Command | Output |
|---------|--------|
| /repo-assess | review-score.schema.json |
| /gitops-audit | review-score.schema.json (GitOps capabilities mapped to categories) |
| /federal-checklist | review-score.schema.json + compliance-report extension |
| /verify | quality-gate.schema.json (verdict); may include score summary |

---

## Schema Reference

See `schemas/review-score.schema.json` for the full JSON schema. Use it to validate review outputs and support automation.
