---
name: gitops-capability-audit
description: Internal audit skill for platform engineering teams. Assesses 7 GitOps capability areas: CI/CD orchestration, GitOps and config-as-code, security scanning and supply chain, promotion and release governance, observability, identity and secrets, policy-as-code and compliance evidence. Produces evidence-based findings with remediation.
risk_tier: 1
---

# GitOps Capability Audit

Serious internal audit skill for platform engineering teams. Assesses GitOps and platform delivery capabilities across 7 major areas. Produces evidence-based findings, severity ratings, and remediation roadmaps.

**Aligned to:** [DoD Enterprise DevSecOps Fundamentals v2.5](https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Fundamentals%20v2.5.pdf) — software supply chain, cybersecurity testing at each phase, Zero Trust in DevSecOps, behavior monitoring, meaningful pipeline. **Central hub:** [cyber.mil/devsecops/](https://www.cyber.mil/devsecops/) for playbooks, reference designs, and guidance.

**Use when:** Conducting internal platform audits, pre-production readiness, capability gap analysis, or due diligence for platform engineering maturity.

---

## When to Use

- Internal platform engineering capability audit
- Pre-production or pre-migration readiness assessment
- Gap analysis for GitOps adoption
- Due diligence for platform team maturity
- Compliance evidence gathering for audit trails

---

## Seven Capability Areas

| # | Capability | What to Assess | DoD Playbook Play |
|---|------------|----------------|-------------------|
| 1 | **CI/CD orchestration** | Pipeline structure, stages, triggers, artifact handling, failure handling | Play 7 (Meaningful Pipeline), Play 6 (Software Factory) |
| 2 | **GitOps and configuration as code** | Declarative config, drift detection, Git as source of truth, reconciliation | Play 2 (IaC), Play 7 |
| 3 | **Security scanning and software supply chain** | SBOM, provenance, vulnerability scanning, pinned deps, signed artifacts | Play 7 |
| 4 | **Promotion and release governance** | Environment separation, manual approval, promotion path, no skip to prod | Play 6, Play 7 |
| 5 | **Observability and continuous monitoring** | Logs, metrics, traces, alerting, dashboards, runbooks | Play 9 (Cyber Resilience) |
| 6 | **Identity, secrets, and access control** | Workload identity, external secrets, least privilege, no long-lived keys | Play 9 |
| 7 | **Policy as code and compliance evidence** | OPA, Checkov, policy enforcement, audit trail, evidence retention | Play 2, Play 7 |

**Remediation:** When citing a finding, include the relevant Playbook play (e.g., "See Play 7 — Define a Meaningful DevSecOps Pipeline").

---

## Workflow

1. **Gather artifacts** — Pipelines, Argo CD/Flux manifests, IaC, observability configs, policy definitions.
2. **Evaluate each capability** — Use `capability-model.md` for good/weak/anti-patterns; use `checklist.md` for criteria.
3. **Document evidence** — What was observed; what was not found. Cite file paths and line numbers.
4. **Assess maturity** — Per capability (1–5 scale) and overall.
5. **Produce report** — Use `output-template.md`.

---

## Mandatory Rules

- **REQUIRED:** Every finding cites observable evidence or states "Evidence not found."
- **REQUIRED:** Use `capability-model.md` for what good/weak looks like and anti-patterns.
- **REQUIRED:** Include suggested remediation steps for each finding. Reference DoD Playbook play(s) where applicable (e.g., Play 7 for pipeline gaps).
- **FORBIDDEN:** Generic advice without repo-specific evidence.
- **REQUIRED:** Severity: Critical | High | Medium | Low.

---

## Output Format

See `output-template.md`. Required: executive summary, findings by capability, severity, evidence observed, missing evidence, remediation steps, capability score.

---

## Files in This Skill

| File | Purpose |
|------|---------|
| `SKILL.md` | This file — main skill instructions |
| `capability-model.md` | What good/weak looks like, anti-patterns, evidence, remediation per capability |
| `checklist.md` | Practical audit checklist per capability |
| `examples.md` | Sample findings and output patterns |
| `output-template.md` | Report structure and format |

---

## References

- [cyber.mil/devsecops/](https://www.cyber.mil/devsecops/) — DoD DevSecOps hub (playbooks, reference design)
- [Software DT&E in DevSecOps Guidebook (Jan 2025)](https://www.cto.mil/wp-content/uploads/2025/01/Software_DTE_DEVSECOPS_GB_Jan2025_Signed.pdf) — OUSD(R&E)/DTE&A; DT&E planning, pipeline test coverage, control gates
- `contexts/federal-compliance-criteria.md` — DoD DevSecOps Fundamentals, DoD Zero Trust Strategy
- `instructions/gitops-governance-rules.md` — Supply chain, security, promotion rules
- `instructions/security-review-required-for-build-changes.md` — Trigger conditions
