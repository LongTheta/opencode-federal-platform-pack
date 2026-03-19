---
name: observability-review
description: Observability and continuous monitoring assessment. Evaluates logs, metrics, traces, alerting, dashboards, runbooks, and retention. Aligned to DoD Play 9 (Cyber Resilience), NIST AU (Audit), Well-Architected Operations. Use for repo-assess, gitops-audit, federal-checklist.
risk_tier: 0
---

# Observability Review Skill

Assesses observability and continuous monitoring: logs, metrics, traces, alerting, dashboards, runbooks, and retention. **Aligned to:** DoD DevSecOps Play 9 (Tirelessly Pursue Cyber Resilience), NIST 800-53 AU (Audit and Accountability), Well-Architected Operations pillar.

---

## When to Use

- Repo assessment (observability category)
- GitOps audit (observability capability)
- Federal checklist (logging, monitoring, auditability domain)
- DoD Zero Trust pillar 6 (Visibility and analytics)

---

## Evaluation Domains

| Domain | What to Assess | Evidence |
|--------|----------------|----------|
| **Logging** | Centralized logs; structured format; retention; audit trail | CloudWatch, Loki, ELK, Fluentd config |
| **Metrics** | Application and infra metrics; cardinality; retention | Prometheus, CloudWatch, Datadog |
| **Tracing** | Distributed tracing; correlation IDs | OpenTelemetry, X-Ray, Jaeger |
| **Alerting** | Alerts on errors, latency, availability; on-call | PagerDuty, Opsgenie, alertmanager |
| **Dashboards** | Operational dashboards; SLO/SLI visibility | Grafana, CloudWatch dashboards |
| **Runbooks** | Documented procedures; playbooks | docs/runbooks/, README |
| **Retention** | Log and metric retention; compliance alignment | Retention config |

---

## Workflow

1. **Gather artifacts** — Observability configs, dashboards, runbooks, pipeline (if observability deployed via GitOps).
2. **Evaluate each domain** — Use `checklist.md` for criteria.
3. **Document evidence** — What was observed; what was not found.
4. **Assess readiness** — Per domain; severity for gaps.
5. **Produce findings** — Include in repo-assess, gitops-audit, or federal-checklist output.

---

## Mandatory Rules

- **REQUIRED:** Every finding cites observable evidence or states "Evidence not found."
- **REQUIRED:** Map to NIST AU (Audit), DoD Play 9 where applicable.
- **FORBIDDEN:** Claim compliance; use "readiness," "gap," "partial."

---

## References

- [DoD Enterprise DevSecOps 2.0 Playbook](https://dl.dod.cyber.mil/wp-content/uploads/devsecops/pdf/DoD-Enterprise-DevSecOps-2.0-Playbook.pdf) — Play 9 (Cyber Resilience)
- NIST 800-53 AU — Audit and Accountability
- `skills/well-architected-review/` — Operations pillar
- `skills/gitops-capability-audit/` — Observability capability
