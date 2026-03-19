# GCP Platform Review Report

**Repository/System:** [name or path]  
**Review Date:** [date]  
**Cloud:** GCP

---

## Executive Summary

[2–4 sentences: overall GCP readiness, critical risks, key gaps, bottom-line assessment.]

---

## Findings by Domain

### 1. Identity and Access

| Finding | Severity | Evidence Observed | Missing Evidence | Recommended Action |
|---------|----------|-------------------|------------------|-------------------|
| | High / Medium / Low | | | |

**Readiness score:** [1–5]

---

### 2. Network Architecture

| Finding | Severity | Evidence Observed | Missing Evidence | Recommended Action |
|---------|----------|-------------------|------------------|-------------------|
| | High / Medium / Low | | | |

**Readiness score:** [1–5]

---

### 3. Workload Isolation

| Finding | Severity | Evidence Observed | Missing Evidence | Recommended Action |
|---------|----------|-------------------|------------------|-------------------|
| | High / Medium / Low | | | |

**Readiness score:** [1–5]

---

### 4. Secrets and Key Management

| Finding | Severity | Evidence Observed | Missing Evidence | Recommended Action |
|---------|----------|-------------------|------------------|-------------------|
| | High / Medium / Low | | | |

**Readiness score:** [1–5]

---

### 5. Logging and Monitoring

| Finding | Severity | Evidence Observed | Missing Evidence | Recommended Action |
|---------|----------|-------------------|------------------|-------------------|
| | High / Medium / Low | | | |

**Readiness score:** [1–5]

---

### 6. Tagging and Labeling (Metadata Governance)

| Finding | Severity | Evidence Observed | Missing Evidence | Recommended Action |
|---------|----------|-------------------|------------------|-------------------|
| | High / Medium / Low | | | |

**Readiness score:** [1–5]

---

### 7. Cost-Awareness

| Finding | Severity | Evidence Observed | Missing Evidence | Recommended Action |
|---------|----------|-------------------|------------------|-------------------|
| | High / Medium / Low | | | |

**Readiness score:** [1–5]

---

### 8. Backup, Resilience, and DR

| Finding | Severity | Evidence Observed | Missing Evidence | Recommended Action |
|---------|----------|-------------------|------------------|-------------------|
| | High / Medium / Low | | | |

**Readiness score:** [1–5]

---

### 9. CI/CD and IaC Alignment

| Finding | Severity | Evidence Observed | Missing Evidence | Recommended Action |
|---------|----------|-------------------|------------------|-------------------|
| | High / Medium / Low | | | |

**Readiness score:** [1–5]

---

### 10. Policy Guardrails

| Finding | Severity | Evidence Observed | Missing Evidence | Recommended Action |
|---------|----------|-------------------|------------------|-------------------|
| | High / Medium / Low | | | |

**Readiness score:** [1–5]

---

### 11. Documentation Maturity

| Finding | Severity | Evidence Observed | Missing Evidence | Recommended Action |
|---------|----------|-------------------|------------------|-------------------|
| | High / Medium / Low | | | |

**Readiness score:** [1–5]

---

## Questions a Solution Architect Should Ask

[Document open questions from discovery session. Use checklist.md "Questions a Solution Architect Should Ask" as prompts. Examples:]
- What is the blast radius of a single zone failure?
- How are service accounts scoped? Workload Identity for GKE?
- Where do secrets live? Secret Manager with workload identity?
- Private Google Access? VPC Service Controls?
- What is RTO/RPO? Has restore been tested?
- Terraform plan in CI? Workload Identity Federation for pipeline?

---

## Evidence to Request or Look For

[Document evidence not found and where to obtain it. Use checklist.md "Evidence to Request or Look For" as reference. Examples:]
- Terraform in `terraform/` with `google` provider
- `google_service_account`, `google_project_iam_*` definitions
- `google_compute_network`, `google_compute_firewall`
- Secret Manager references (not secret values)
- Cloud Logging sinks, alerting policies
- Labels on `google_*` resources
- `cloudbuild.yaml`, `.github/workflows/` with Workload Identity Federation

---

## Recommended Actions (Prioritized)

| Priority | Action | Domain | Effort |
|----------|--------|--------|--------|
| 1 | | | S / M / L |
| 2 | | | |
| 3 | | | |

---

## Readiness Score Summary

| Domain | Score | Status |
|--------|-------|--------|
| Identity and access | | |
| Network architecture | | |
| Workload isolation | | |
| Secrets and key management | | |
| Logging and monitoring | | |
| Tagging and labeling | | |
| Cost-awareness | | |
| Backup, resilience, DR | | |
| CI/CD and IaC alignment | | |
| Policy guardrails | | |
| Documentation maturity | | |
| **Overall** | | |
