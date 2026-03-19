# Universal Platform Engineering Principles

Derived from Well-Architected and DevOps best practices. **Cloud-agnostic.** Apply to all OpenCode workflows regardless of environment.

---

## 1. Pillar Mapping (Universal Concepts)

| Original Concept | Universal Principle |
|------------------|---------------------|
| IAM | **Least-privilege access control** — Roles over users; minimal permissions; no wildcards; MFA for privileged access |
| CloudTrail | **Audit logging required** — Immutable audit trail; who did what, when; retention policy |
| CloudWatch | **Observability required** — Logs, metrics, traces; centralized; queryable; alertable |
| KMS | **Encryption at rest and in transit** — TLS for data in motion; key management for data at rest |
| Multi-AZ | **High availability and fault tolerance** — No single point of failure; failover; health checks |
| Auto Scaling | **Elasticity and demand-based scaling** — Scale up/down with load; avoid over-provisioning |
| Tagging | **Ownership, cost tracking, accountability** — Project, environment, owner, cost center, purpose |
| Security Groups | **Network segmentation** — Deny by default; explicit allow; minimal public exposure |
| Secrets Manager | **External secrets management** — No plaintext in code; vault or managed service; rotation |
| Backup/Recovery | **Recovery strategy** — RTO/RPO defined; backups tested; restore documented |
| CI/CD | **Deployment safety** — Automated; approval gates; immutable artifacts; traceable |
| IaC | **Infrastructure as Code** — Declarative; versioned; drift detection; validation in pipeline |

---

## 2. Non-Negotiable Principles

- **Evidence before conclusions** — Never claim implementation without proof. Cite file, config, or manifest.
- **Cheapest safe baseline first** — Start simple; add complexity only when justified by requirements.
- **Managed services preferred** where they reduce ops burden, risk, and cost volatility.
- **Security cannot be traded away** for minor savings or convenience.
- **Avoid over-engineering** — Match architecture to workload and team capability.
- **Make outputs practical** for real teams with real constraints.
- **If a system would fail a Well-Architected review, it must be flagged.**

---

## 3. Required Behaviors for All Recommendations

Every recommendation must align to:

| Pillar | What to Check |
|--------|---------------|
| **Security** | Access control, secrets, encryption, network exposure, supply chain |
| **Reliability** | Failure modes, recovery, health checks, redundancy |
| **Performance** | Scaling, bottlenecks, latency, resource limits |
| **Cost awareness** | Right-sizing, waste, cost attribution, budget visibility |
| **Operational excellence** | Observability, documentation, runbooks, change control |

Every system must have:

- **Observability** — Logs, metrics, traces; alerting; dashboards
- **Auditability** — Who changed what; when; why (audit trail)
- **Scalability** — Can handle growth; no hard limits without plan
- **Failure handling** — Graceful degradation; recovery path; runbooks
- **Documentation** — README, architecture, runbooks for major components

---

## 4. Evidence Labels

All findings must use exactly one:

| Label | Definition |
|-------|------------|
| **Observed** | Direct evidence in config, code, or manifest |
| **Inferred** | Derived from patterns, naming, or partial evidence |
| **Missing Evidence** | No evidence; recommend validation |
| **Contradictory Evidence** | Conflicting signals; flag for review |

Do not assume controls exist without evidence.

---

## 5. Severity Classification

| Severity | When |
|----------|------|
| **Critical** | Must fix before production — secrets in code, public exposure, no access control |
| **High** | Significant gap; prioritize — no audit trail, no recovery strategy, manual deploy |
| **Medium** | Important improvement — missing tags, suboptimal scaling, partial observability |
| **Low** | Nice to have — hygiene, formatting, minor optimizations |

---

## 6. Output Standardization

All review outputs must include:

1. **Executive Summary** — Overall posture, top risks, verdict
2. **Architecture Score** — 0–10 per category (Security, Reliability, Performance, Cost, Operations)
3. **Key Risks** — Ranked by severity
4. **Evidence Found** — What was observed; file paths, configs
5. **Missing Evidence** — What could not be verified; recommend validation
6. **Recommended Actions** — Prioritized; concrete; with effort and impact

---

## 7. Recommendation Style

- **Actionable** — Specific fix, not vague advice
- **Tradeoffs** — Cost, reliability, security, ops
- **Effort level** — Low / Medium / High
- **Impact** — What improves
- **Phased remediation** — Quick wins → medium-term → strategic

---

## 8. Cost Rules

- Use **rough bands only** — Very Low, Low, Moderate, High, Very High
- **No fake precision** — Never imply exact numbers from repos alone
- **Flag cost drivers** — Top 3 in every cost snapshot
- **Suggest cheaper alternatives** where appropriate
- **Over-engineering check** — Flag excessive complexity
- Label estimates: observed / inferred / unknown

---

## 9. Security Rules (Universal)

- **Flag wildcard permissions** — `*` in actions or resources
- **Flag public exposure** — Backend in public subnet; 0.0.0.0/0 without justification
- **Flag missing encryption** — No TLS, no encryption-at-rest signals
- **Flag hardcoded secrets** — In code, config, env files
- **Flag missing audit trail** — No access logs; no change audit
- **Never downgrade security** solely to save cost

---

## 10. Architecture Rules

- **Default to simpler patterns** unless complexity is justified
- **Managed services** require explicit justification to avoid
- **Multi-region / multi-zone** require explicit justification
- **Public-facing services** must be intentional and justified
- **Search codebase first** — Align with existing patterns
