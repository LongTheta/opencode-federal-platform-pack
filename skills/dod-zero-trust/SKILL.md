---
name: dod-zero-trust
description: DoD Zero Trust Strategy 7-pillar assessment. Evaluates User, Device, Network, Data, Application/workload, Visibility/analytics, Automation/orchestration. Use for federal-checklist, repo-assess.
risk_tier: 1
---

# DoD Zero Trust Skill

Assesses alignment to the **DoD Zero Trust Strategy** (7 pillars). Phrase results as readiness indicators and gaps—never as formal compliance. **Reference:** [DoD Zero Trust Strategy](https://dodcio.defense.gov/Portals/0/Documents/Library/DoD-ZTStrategy.pdf). **Target:** FY 2027 for DoD components.

---

## When to Use

- Federal checklist (DoD Zero Trust alignment)
- Repo assessment (Zero Trust posture)
- Pre-ATO or pre-assessment for DoD systems

---

## Seven Pillars

| # | Pillar | What to Assess | Evidence |
|---|--------|----------------|----------|
| 1 | **User** | Identity verification; MFA; least privilege; user posture | IAM, RBAC, MFA config |
| 2 | **Device** | Device posture; compliance; trusted devices | MDM, device attestation (if in repo) |
| 3 | **Network and environment** | Micro-segmentation; deny by default; network isolation | VPC, NetworkPolicy, security groups |
| 4 | **Data** | Encryption; access controls; data classification | KMS, encryption at rest/transit |
| 5 | **Application and workload** | App-level auth; workload identity; container security | OIDC, service accounts, pod security |
| 6 | **Visibility and analytics** | Logging; correlation; alerting; SIEM; dashboards | Logs, metrics, tracing, alerting |
| 7 | **Automation and orchestration** | SOAR; policy orchestration; dynamic security; IR automation; CI/CD security gates | Pipeline automation, policy-as-code, runbooks |

**Critical:** Pillar 7 (Automation and orchestration) must be assessed. Evidence: pipeline automation, policy-as-code (OPA, Checkov), runbooks, CI/CD security gates, incident response automation.

---

## Workflow

1. **Gather artifacts** — IaC, pipelines, manifests, IAM configs, observability configs.
2. **Evaluate each pillar** — Use `checklist.md` for criteria.
3. **Document evidence** — What was observed; what was not found.
4. **Assess readiness** — Per pillar; severity for gaps.
5. **Produce findings** — Include in federal-checklist or review-score output.

---

## Mandatory Rules

- **REQUIRED:** Every finding cites observable evidence or states "Evidence not found."
- **REQUIRED:** Assess all 7 pillars including pillar 7 (Automation and orchestration).
- **REQUIRED:** Use readiness language: "readiness indicator," "gap," "partial."
- **FORBIDDEN:** Claim compliance or "meets DoD Zero Trust."

---

## References

- [DoD Zero Trust Strategy](https://dodcio.defense.gov/Portals/0/Documents/Library/DoD-ZTStrategy.pdf)
- [NIST SP 800-207](https://csrc.nist.gov/publications/detail/sp/800-207/final) — Zero Trust Architecture
- `contexts/federal-compliance-criteria.md` — DoD Zero Trust 7 pillars
