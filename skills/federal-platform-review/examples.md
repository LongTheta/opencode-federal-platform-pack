# Federal Platform Review — Examples

Sample findings and output patterns. Use as reference; do not copy verbatim.

---

## Example: Architecture Clarity

**Finding:** System boundary not documented.  
**Severity:** Medium  
**Evidence observed:** `terraform/main.tf` defines VPC and subnets; no architecture doc describes trust boundaries.  
**Missing evidence:** Architecture diagram or doc describing data flows and boundaries.  
**Recommended action:** Create `docs/architecture.md` with system boundary, data flows, and trust zones. Reference NIST SC-7 (boundary protection) for assessor alignment.

---

## Example: IAM and Secrets

**Finding:** API keys loaded from environment variables.  
**Severity:** High  
**Evidence observed:** `config/settings.py` lines 12–15 load `API_KEY` from `os.environ`.  
**Missing evidence:** External secrets config (Vault, ESO, Secrets Manager).  
**Recommended action:** Implement External Secrets Operator or Vault integration. Remove plaintext from config. Document secret rotation procedure. Aligns with IA-5, SC-28 assurance themes.

---

## Example: SBOM and Supply Chain

**Finding:** No SBOM produced in pipeline.  
**Severity:** Medium  
**Evidence observed:** `.github/workflows/build.yml` runs `npm ci` and `docker build`; no Syft, CycloneDX, or equivalent.  
**Missing evidence:** SBOM artifact in pipeline; vulnerability scan results.  
**Recommended action:** Add Syft or Trivy to pipeline; publish SBOM artifact. Add `npm audit` or Snyk to CI. Aligns with SA-12, SI-7 assurance themes.

---

## Example: Environment Separation

**Finding:** Production deploy has manual approval; dev and stage share pipeline.  
**Severity:** Low  
**Evidence observed:** `.github/workflows/deploy.yml` has `environment: production` with required reviewers; dev and stage use same workflow with different env vars.  
**Missing evidence:** Explicit promotion gates between stage and prod; separate approval workflows.  
**Recommended action:** Document promotion path; consider separate sync apps per environment in Argo CD. Aligns with AC-2, CM-3.

---

## Example: Missing Evidence

**Finding:** Audit logging retention not verifiable from repository.  
**Severity:** Medium  
**Evidence observed:** CloudWatch log group in `terraform/logging.tf`; retention not set in IaC.  
**Missing evidence:** Log retention policy; audit event definition; tamper resistance.  
**Recommended action:** Add `retention_in_days` to Terraform; document auditable events in runbook. Recommend runtime verification for assessor. Aligns with AU-2, AU-9.

---

## Example: Readiness Score

| Domain | Score | Notes |
|--------|-------|-------|
| Architecture clarity | 3 | Structure present; boundary docs missing |
| CI/CD maturity | 4 | Pipeline has stages; SBOM missing |
| GitOps readiness | 4 | Argo CD; drift detection present |
| IAM and secrets | 2 | Secrets in env vars; no external secrets |
| Logging, monitoring, auditability | 3 | CloudWatch present; retention unclear |
| SBOM and supply chain | 2 | No SBOM; deps pinned |
| Environment separation | 4 | Manual prod approval; env separation |
| IaC quality and policy | 4 | Terraform; tagging present; no OPA |
| Documentation and traceability | 3 | README good; runbooks partial |
| Evidence quality | 5 | All findings cited |
| **Overall** | 3.4 | Adequate; address IAM and SBOM before assessment |

---

## Example: Executive Summary

The platform shows adequate readiness for federal assessment with notable gaps. **Critical risks:** Secrets in environment variables (IA-5); no SBOM in pipeline (SA-12). **Strengths:** GitOps with Argo CD, manual prod approval, Terraform with tagging. **Recommended before formal assessment:** Implement external secrets, add SBOM to pipeline, document audit events and retention. Overall readiness: 3.4/5 — address IAM and supply chain to reach assessment-ready state.

---

## Example: Recommended Actions Table

| Priority | Action | Domain | Effort |
|----------|--------|--------|--------|
| 1 | Implement Vault or ESO; remove secrets from config | IAM and secrets | M |
| 2 | Add Syft/Trivy to pipeline; publish SBOM | SBOM and supply chain | S |
| 3 | Document audit events and retention in runbook | Logging, monitoring | S |
| 4 | Add architecture doc with boundaries | Architecture clarity | S |
| 5 | Add OPA or Checkov for policy checks | IaC quality | M |
