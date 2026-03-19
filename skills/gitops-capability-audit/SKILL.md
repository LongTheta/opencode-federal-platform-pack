---
name: gitops-capability-audit
description: Internal audit skill for platform engineering teams. Assesses 7 GitOps capability areas: CI/CD orchestration, GitOps and config-as-code, security scanning and supply chain, promotion and release governance, observability, identity and secrets, policy-as-code and compliance evidence. Produces evidence-based findings with remediation.
risk_tier: 1
---

# GitOps Capability Audit

Serious internal audit skill for platform engineering teams. Assesses GitOps and platform delivery capabilities across 7 major areas. Produces evidence-based findings, severity ratings, and remediation roadmaps.

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

| # | Capability | What to Assess |
|---|------------|----------------|
| 1 | **CI/CD orchestration** | Pipeline structure, stages, triggers, artifact handling, failure handling |
| 2 | **GitOps and configuration as code** | Declarative config, drift detection, Git as source of truth, reconciliation |
| 3 | **Security scanning and software supply chain** | SBOM, provenance, vulnerability scanning, pinned deps, signed artifacts |
| 4 | **Promotion and release governance** | Environment separation, manual approval, promotion path, no skip to prod |
| 5 | **Observability and continuous monitoring** | Logs, metrics, traces, alerting, dashboards, runbooks |
| 6 | **Identity, secrets, and access control** | Workload identity, external secrets, least privilege, no long-lived keys |
| 7 | **Policy as code and compliance evidence** | OPA, Checkov, policy enforcement, audit trail, evidence retention |

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
- **REQUIRED:** Include suggested remediation steps for each finding.
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

- `instructions/gitops-governance-rules.md` — Supply chain, security, promotion rules
- `instructions/security-review-required-for-build-changes.md` — Trigger conditions
