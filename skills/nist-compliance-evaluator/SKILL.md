---
name: nist-compliance-evaluator
description: Analyzes infrastructure repos, application configs, IAM policies, Kubernetes manifests, and CI/CD pipelines for FedRAMP, FISMA, NIST 800 series, DoD Zero Trust Strategy (7 pillars including Automation and orchestration), and DoD Enterprise DevSecOps Fundamentals. Covers NIST SP 800-53, 800-53A, 800-37 (RMF), 800-207 (Zero Trust), 800-190 (Container Security), 800-171 (CUI), and CIS Benchmarks. Produces compliance scorecard, Zero Trust maturity (all 7 pillars), FedRAMP readiness estimate, FISMA/RMF alignment. Use when evaluating FedRAMP, FISMA, NIST, DoD, or federal security controls.
risk_tier: 1
---

# NIST Compliance Evaluator

Analyzes infrastructure repositories, application configs, IAM policies, Kubernetes manifests, and CI/CD pipelines to evaluate alignment with **FedRAMP**, **FISMA**, and **NIST 800** series standards.

## When to Use

- User asks to evaluate FedRAMP, FISMA, or NIST compliance
- User mentions NIST SP 800-53, 800-207, 800-190, 800-171, CIS Benchmarks
- User needs compliance assessment of IaC, IAM, K8s, or CI/CD
- User wants federal security control mapping or gap analysis

## Frameworks (Federally Focused)

| Framework | Scope |
|-----------|-------|
| **FedRAMP** | Low/Moderate/High baselines; cloud authorization (derived from 800-53) |
| **FISMA** | Agency implementation; NIST RMF (800-37), 800-53 controls |
| **NIST SP 800-53** | Security and privacy controls (AC, AU, IA, SC, SI, CM, CP, IR, SA families) |
| **NIST SP 800-53A** | Assessment procedures for 800-53 |
| **NIST SP 800-37** | Risk Management Framework (RMF) |
| **NIST SP 800-207** | Zero Trust Architecture principles |
| **NIST SP 800-190** | Container Security guidelines |
| **NIST SP 800-171** | Protecting CUI in nonfederal systems |
| **CIS Benchmarks** | AWS, Linux, Kubernetes hardening |

## Evaluation Domains

### 1. Identity & Access (NIST AC, IA)

- IAM roles and policies (least privilege, wildcard detection)
- Role trust relationships
- Human vs workload identity separation
- MFA enforcement (if detectable)
- Service account usage in Kubernetes

### 2. Network Security (NIST SC)

- Public vs private subnet exposure
- Security group and firewall rules
- Ingress/egress controls
- Zero Trust assumptions (deny by default)
- Private endpoints vs public services

### 3. Data Protection (NIST SC, IA)

- Encryption at rest (KMS usage)
- Encryption in transit (TLS assumptions)
- Secrets management (Secrets Manager, env vars, vaults)
- Hardcoded secrets detection

### 4. Logging & Monitoring (NIST AU, SI)

- Centralized logging presence
- Audit trail capability (CloudTrail, etc.)
- Alerting capability
- Log retention configuration

### 5. Container & Workload Security (NIST 800-190)

- Image scanning (Trivy, etc.)
- Root container usage
- Privileged containers
- Kubernetes RBAC
- Pod security standards

### 6. Configuration & Drift (NIST CM)

- Infrastructure as Code usage
- Drift detection (GitOps / Argo CD)
- Config validation tools (OPA, Checkov, tfsec)

### 7. Incident Response (NIST IR)

- Evidence of runbooks or automation
- Alert → response linkage
- Isolation capability (network/IAM)

### 8. Automation and Orchestration (DoD Zero Trust Pillar 7)

- Pipeline security gates and automation
- Policy-as-code (OPA, Checkov, Gatekeeper)
- Dynamic security responses; SOAR/IR automation
- CI/CD security scanning at each phase (per DoD DevSecOps Fundamentals)
- Runbooks; incident response coordination

### DoD Playbook Play Mapping (for remediation)

| Domain | DoD Playbook Play |
|--------|-------------------|
| Identity & Access | Play 9 (Cyber Resilience) |
| Network Security | Play 9 |
| Data Protection | Play 9 |
| Logging & Monitoring | Play 9 |
| Container & Workload | Play 3 (Containerized Microservices) |
| Configuration & Drift | Play 2 (IaC) |
| Incident Response | Play 9, Play 10 (OT&E) |
| Automation & Orchestration | Play 7 (Meaningful Pipeline), Play 9 |

**Remediation:** When citing a finding, include the relevant Playbook play (e.g., "See Play 7 — Define a Meaningful DevSecOps Pipeline").

## Review Modules (Run in Order)

1. **Repo Discovery** — Inventory IaC, K8s manifests, CI/CD, IAM configs
2. **Identity & Access Review** — IAM, RBAC, trust, MFA signals
3. **Network Security Review** — Subnets, SGs, NACLs, endpoints
4. **Data Protection Review** — Encryption, secrets, hardcoded values
5. **Logging & Monitoring Review** — Logs, audit, alerts, retention
6. **Container Security Review** — Images, root/privileged, RBAC, PSS
7. **Configuration & Drift Review** — IaC, GitOps, validation tools
8. **Incident Response Review** — Runbooks, alert linkage, isolation
9. **Automation & Orchestration Review** — Pipeline gates, policy-as-code, SOAR (DoD ZT pillar 7)
10. **Scoring & Reporting** — Map to NIST controls, Zero Trust maturity (all 7 pillars), FedRAMP estimate

## Scoring Model

- **Per-domain score**: 0–10
- **NIST control mapping**: AC, IA, SC, AU, SI, CM, IR families
- **Severity**: Critical / High / Medium / Low
- **Confidence**: Confirmed / Inferred / Missing Evidence

## Mandatory Rules

- **Never assume compliance without evidence** — If not found, state "Missing Evidence" or "Non-compliant"
- **Reference DoD Playbook plays in remediation** — When a finding maps to a play (see mapping above), include it (e.g., "See Play 7")
- **Clearly distinguish** — Missing (no evidence) vs Non-compliant (evidence of violation)
- **Prioritize** — Identity, network isolation, and logging above other domains

## Output Format

Produce the report in this order. See [sample-output-report.md](sample-output-report.md) for a full example.

```markdown
# NIST Compliance Evaluation — [Repo Name]

## 1. Executive Compliance Summary
[Overall posture, FedRAMP readiness estimate, top gaps, key recommendations]

## 2. NIST Control Coverage Map
| Control Family | Domain | Score (0–10) | Status |
|----------------|--------|--------------|--------|
| AC, IA | Identity & Access | | |
| SC | Network Security | | |
| SC, IA | Data Protection | | |
| AU, SI | Logging & Monitoring | | |
| 800-190 | Container & Workload | | |
| CM | Configuration & Drift | | |
| IR | Incident Response | | |
| DoD ZT-7 | Automation & Orchestration | | |

## 3. Top Compliance Gaps
[Ranked by severity; each with NIST control, evidence, confidence]

## 4. Zero Trust Maturity Assessment
[Per DoD Zero Trust Strategy 7 pillars: User, Device, Network, Data, Application/Workload, Visibility & Analytics, **Automation and orchestration** (SOAR, policy orchestration, pipeline security gates)]

## 5. Detailed Findings with File-Level Evidence
[Per domain; file paths, line refs, evidence tag]

## 6. Remediation Plan Mapped to NIST Controls
| Gap | NIST Control | Remediation | Priority |
|-----|--------------|-------------|----------|
| ... | ... | ... | ... |

## 7. FedRAMP Readiness Estimate
**Baseline in scope:** Low / Moderate / High
**Estimate**: Low / Moderate / High
[Rationale based on control coverage and gaps]

## 8. FISMA / RMF Alignment (NIST 800-37)
| RMF Step | Evidence | Gap |
|----------|----------|-----|
| Categorize (FIPS 199, 800-60) | | |
| Select (800-53 controls) | | |
| Implement | | |
| Assess (800-53A) | | |
| Authorize | | |
| Monitor (ConMon) | | |
```

**Remember:** Federal compliance criteria apply. FedRAMP, FISMA, NIST 800 series. Evidence required; no certification claims. Map findings to control IDs.

---

## Evidence Labels

| Label | Meaning |
|-------|---------|
| **Confirmed** | Direct evidence in repo |
| **Inferred** | Derived from patterns or partial evidence |
| **Missing Evidence** | No evidence; cannot assume compliance |

## Additional Resources

- [reference.md](reference.md) — Domain specs, control mappings, evidence sources
- [scoring-rubric.md](scoring-rubric.md) — Per-domain scoring criteria
- [prompt-template.md](prompt-template.md) — Invocation template
- [sample-output-report.md](sample-output-report.md) — Full report example
- [Software DT&E in DevSecOps Guidebook (Jan 2025)](https://www.cto.mil/wp-content/uploads/2025/01/Software_DTE_DEVSECOPS_GB_Jan2025_Signed.pdf) — OUSD(R&E)/DTE&A; DT&E planning, execution, and analysis across DevSecOps phases; SAST, DAST, IAST, SCA, SBOM, threat modeling, compliance verification
