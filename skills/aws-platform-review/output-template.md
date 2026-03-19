# AWS Platform Review Report

**Repository/System:** [name or path]  
**Review Date:** [date]  
**Cloud:** AWS

---

## Executive Summary

[2–4 sentences: overall AWS readiness, critical risks, key gaps, bottom-line assessment.]

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

### 6. Tagging and Metadata Governance

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
- What is the blast radius of a single AZ failure?
- How are IAM roles scoped? Any `*` in policies?
- Where do secrets live? Secrets Manager or Parameter Store?
- VPC endpoints for S3, ECR? Any 0.0.0.0/0 in production?
- What is RTO/RPO? Has restore been tested?
- Terraform plan in CI? Drift detection?

---

## Evidence to Request or Look For

[Document evidence not found and where to obtain it. Use checklist.md "Evidence to Request or Look For" as reference. Examples:]
- Terraform/CloudFormation in `terraform/`, `cloudformation/`
- IAM role definitions, VPC/security group configs
- Secrets Manager or Parameter Store references
- CloudWatch log groups, retention, alarms
- Tags on `aws_*` resources
- `.github/workflows/` with `terraform plan`, OIDC

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
| Tagging and metadata governance | | |
| Cost-awareness | | |
| Backup, resilience, DR | | |
| CI/CD and IaC alignment | | |
| Policy guardrails | | |
| Documentation maturity | | |
| **Overall** | | |
