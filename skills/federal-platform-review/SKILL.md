---
name: federal-platform-review
description: Federal-grade platform and repository review checklist for modern cloud-native systems. Evaluates architecture, CI/CD, GitOps, IAM, observability, supply chain, environment separation, IaC quality, documentation, and evidence quality. Use when assessing federal readiness without claiming formal compliance.
risk_tier: 1
---

# Federal Platform Review

Provides a federal-grade platform and repository review checklist for modern cloud-native systems. Phrase results as **readiness indicators**, **risks**, and **recommended evidence** — never as formal compliance or certification.

**Federally focused:** Aligns to **FedRAMP**, **FISMA**, **NIST 800**, **DoD Zero Trust Strategy** (7 pillars), and **DoD Enterprise DevSecOps Fundamentals v2.5**:

- **NIST SP 800-53** — Security and privacy controls
- **NIST SP 800-37** — Risk Management Framework
- **NIST SP 800-207** — Zero Trust Architecture
- **DoD Zero Trust Strategy** — 7 pillars including Automation and orchestration
- **DoD Enterprise DevSecOps Fundamentals** — Supply chain, security-at-each-phase, pipeline
- **NIST SP 800-190** — Container Security
- **NIST SP 800-171** — CUI protection (when applicable)

---

## When to Use

- Assessing a platform or repository for federal or regulated environment readiness
- Pre-ATO or pre-assessment gap analysis
- Platform engineering maturity review with federal alignment
- Due diligence for cloud-native systems in regulated contexts

---

## Evaluation Domains

| Domain | What to Assess | DoD Playbook Play |
|--------|----------------|-------------------|
| **Architecture clarity** | Structure, boundaries, scalability, technology choices | Play 1 (Culture), Play 6 (Software Factory) |
| **CI/CD maturity** | Pipeline stages, security gates, artifact handling | Play 7 (Meaningful Pipeline) |
| **GitOps readiness** | Declarative config, drift, promotion, environment separation | Play 2 (IaC), Play 7 |
| **IAM and secrets patterns** | Least privilege, workload identity, external secrets | Play 9 (Cyber Resilience) |
| **Logging, monitoring, auditability** | Metrics, logs, tracing, retention, audit trails | Play 9 |
| **SBOM and software supply chain** | Dependencies pinned, SBOM, provenance, attestation | Play 7 |
| **Environment separation and promotion controls** | Dev/stage/prod boundaries, manual approval, no skip | Play 6, Play 7 |
| **IaC quality and policy enforcement** | Terraform/CloudFormation, drift, policy-as-code | Play 2 |
| **Documentation and traceability** | README, runbooks, ADRs, change documentation | Play 1 |
| **Evidence quality** | Observable artifacts, verifiable findings, no unverified claims | Play 4 (Capability Model), Play 5 (Continuous Improvement) |

**Remediation:** When citing a finding, include the relevant Playbook play (e.g., "See Play 7 — Define a Meaningful DevSecOps Pipeline").

---

## Workflow

1. **Gather artifacts** — IaC, pipelines, manifests, configs, docs.
2. **Evaluate each domain** — Use `checklist.md` for criteria.
3. **Document evidence** — What was observed; what was not found.
4. **Assess readiness** — Per domain and overall (1–5 scale).
5. **Produce report** — Use `output-template.md`.

---

## Output Format (REQUIRED)

- **Executive summary** — Overall readiness posture, critical risks, bottom-line indicator.
- **Findings by domain** — Each with severity, evidence observed, missing evidence, recommended action.
- **Severity** — Critical | High | Medium | Low.
- **Evidence observed** — File path, line, config, or manifest.
- **Missing evidence** — What could not be verified; recommend validation.
- **Recommended actions** — Prioritized; concrete; effort and impact.
- **Readiness score** — Per domain (1–5) and overall.

See `output-template.md` for structure.

---

## Mandatory Rules

- **REQUIRED:** Every finding cites observable evidence or states "Evidence not found."
- **REQUIRED:** Use readiness language: "readiness indicator," "risk," "recommended evidence," "gap," "partial."
- **FORBIDDEN:** Claim compliance, certification, "meets," "fully implemented," or "compliant."
- **REQUIRED:** Include disclaimer: report does not constitute formal compliance certification.
- **REQUIRED:** Map findings to assurance themes (AC, AU, IA, SC, SI, CM, etc.) without claiming control satisfaction.

---

## Evidence Labels

| Label | Meaning |
|-------|---------|
| **Observed** | Direct evidence in repo |
| **Inferred** | Derived from patterns or partial evidence |
| **Missing Evidence** | No evidence; cannot assume; recommend verification |
| **Contradictory** | Conflicting signals; flag for review |

---

## Severity

| Severity | When |
|----------|------|
| **Critical** | Must fix before production — secrets in code, no access control, public exposure |
| **High** | Significant gap; prioritize — no external secrets, no SBOM, no audit trail |
| **Medium** | Important improvement — partial observability, missing tags, runbook gaps |
| **Low** | Nice to have — hygiene, minor optimizations |

---

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

---

## Files in This Skill

| File | Purpose |
|------|---------|
| `SKILL.md` | This file — main skill instructions |
| `checklist.md` | Evaluation criteria per domain |
| `examples.md` | Sample findings and output patterns |
| `output-template.md` | Report structure and format |

---

**Remember:** Federal rules apply. Map to FedRAMP, FISMA, and NIST 800-53. Use readiness language; never claim certification. Evidence required for every finding.

---

## References

- [Software DT&E in DevSecOps Guidebook (Jan 2025)](https://www.cto.mil/wp-content/uploads/2025/01/Software_DTE_DEVSECOPS_GB_Jan2025_Signed.pdf) — OUSD(R&E)/DTE&A; DT&E planning, pipeline test coverage
- `instructions/federal-review-standards.md` — Federal review language and control format
- `instructions/evidence-before-claims.md` — Evidence requirements
- `instructions/aws-derived-principles.md` — Universal platform principles
