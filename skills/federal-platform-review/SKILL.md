---
name: federal-platform-review
description: Federal-grade platform and repository review checklist for modern cloud-native systems. Evaluates architecture, CI/CD, GitOps, IAM, observability, supply chain, and more. Use when assessing federal readiness without claiming formal compliance.
---

# Federal Platform Review Skill

Provides a federal-grade platform and repository review checklist for modern cloud-native systems. Evaluates readiness indicators, risks, and recommended evidence. Informed by NIST-style control thinking, FedRAMP/FISMA-style assurance expectations, and DoD-style platform discipline.

**Important:** This skill does not claim formal compliance or certification. Results are phrased as readiness indicators, risks, and recommended evidence.

## When to Use

- Assessing a platform or repository for federal or regulated environment readiness
- Pre-ATO or pre-assessment gap analysis
- Platform engineering maturity review with federal alignment
- Due diligence for cloud-native systems in regulated contexts

## Evaluation Domains

| Domain | What to Assess |
|--------|----------------|
| Architecture clarity | Structure, boundaries, scalability, technology choices |
| CI/CD maturity | Pipeline stages, security gates, artifact handling |
| GitOps readiness | Declarative config, drift, promotion, environment separation |
| IAM and secrets | Least privilege, workload identity, external secrets |
| Logging, monitoring, auditability | Metrics, logs, tracing, retention, audit trails |
| SBOM and supply chain | Dependencies pinned, SBOM, provenance, attestation |
| Environment separation | Dev/stage/prod boundaries, promotion controls |
| IaC quality and policy | Terraform/CloudFormation, drift, policy-as-code |
| Documentation and traceability | README, runbooks, ADRs, change documentation |
| Evidence quality | Observable artifacts, verifiable findings |

## Workflow

1. **Gather artifacts** — IaC, pipelines, manifests, configs, docs.
2. **Evaluate each domain** — Use `checklist.md` for criteria.
3. **Document evidence** — What was observed; what was not found.
4. **Assess readiness** — Per domain and overall.
5. **Produce report** — Use `output-template.md`.

## Output Format

See `output-template.md` for structure. Required sections:

- Executive summary
- Findings by domain (with severity, evidence observed, missing evidence)
- Recommended actions (prioritized)
- Readiness score (per domain and overall)

## NIST 800-53 Control Families (Reference)

| ID | Family |
|----|--------|
| AC | Access Control |
| AU | Audit and Accountability |
| IA | Identification and Authentication |
| SC | System and Communications Protection |
| SI | System and Information Integrity |
| CM | Configuration Management |
| CP | Contingency Planning |
| IR | Incident Response |
| SA | System and Services Acquisition |

## Principles

- **Evidence-first** — Every finding cites observable evidence or states "evidence not found."
- **No certification** — Use "readiness indicator," "risk," "recommended evidence" — never "compliant" or "certified."
- **Actionable** — Recommendations include concrete steps and verification methods.
- **Traceable** — Findings map to assurance themes (AC, AU, IA, SC, SI, CM, etc.) without claiming control satisfaction.

## References

- `checklist.md` — Evaluation criteria per domain
- `examples.md` — Sample findings and output
- `output-template.md` — Report structure
