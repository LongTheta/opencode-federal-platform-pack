# GitOps Capability Audit — Examples

Sample findings for each capability area. Use as reference; cite actual evidence in audit reports.

---

## 1. CI/CD Orchestration

**Finding:** Single monolithic job; no stage separation.  
**Severity:** High  
**Capability:** CI/CD orchestration  
**Evidence observed:** `.github/workflows/deploy.yml` has one job with 12 steps: checkout, build, test, docker build, push, kubectl apply. No gates between test and deploy.  
**Anti-pattern:** Kitchen sink job  
**Missing evidence:** Stage separation; failure gate before deploy.  
**Remediation:** Split into jobs: `build`, `test`, `scan`, `deploy`. Add `needs: [build, test, scan]` for deploy. Add `continue-on-error: false` for test step.

---

**Finding:** Pipeline uses `:latest` for production image.  
**Severity:** High  
**Capability:** CI/CD orchestration  
**Evidence observed:** `deploy.yml` line 28: `image: acr.io/app:latest`.  
**Anti-pattern:** Floating refs  
**Missing evidence:** Digest or semantic version.  
**Remediation:** Use `image: acr.io/app@sha256:...` or `acr.io/app:v1.2.3`. Build step should output digest; deploy step consumes it.

---

## 2. GitOps and Configuration as Code

**Finding:** No Argo CD or Flux; manual kubectl apply in pipeline.  
**Severity:** Critical  
**Capability:** GitOps and config as code  
**Evidence observed:** `.github/workflows/deploy.yml` runs `kubectl apply -f manifests/`; no Argo CD Application or Flux Kustomization in repo.  
**Anti-pattern:** Git as backup; cluster is source of truth  
**Missing evidence:** Declarative GitOps tool; drift detection.  
**Remediation:** Install Argo CD or Flux. Create Application/Kustomization pointing to this repo. Remove kubectl apply from pipeline; let GitOps reconcile.

---

**Finding:** Secrets in Git (base64).  
**Severity:** Critical  
**Capability:** GitOps and config as code  
**Evidence observed:** `manifests/prod/secret.yaml` contains `data: db-password: <base64>`.  
**Anti-pattern:** Secret in Git  
**Missing evidence:** External Secrets Operator or sealed-secrets.  
**Remediation:** Remove secret from Git. Implement ESO; create ExternalSecret referencing Vault or Secrets Manager. Rotate exposed secret.

---

## 3. Security Scanning and Software Supply Chain

**Finding:** Trivy runs but does not block on high vulnerabilities.  
**Severity:** High  
**Capability:** Security scanning and supply chain  
**Evidence observed:** `.github/workflows/build.yml` line 45: `trivy image ... || true`.  
**Anti-pattern:** Scan and ignore  
**Missing evidence:** Failure on high/critical; remediation or documented exception.  
**Remediation:** Remove `|| true`. Add `--exit-code 1` for high/critical. Fix vulns or document exception with ticket and expiry.

---

**Finding:** No SBOM produced in pipeline.  
**Severity:** Medium  
**Capability:** Security scanning and supply chain  
**Evidence observed:** Pipeline has `docker build`, `trivy`; no Syft, CycloneDX, or SPDX step.  
**Missing evidence:** SBOM artifact; supply chain visibility.  
**Remediation:** Add Syft step: `syft packages $IMAGE -o cyclonedx-json=sbom.json`. Upload sbom.json as artifact. Consider storing in registry.

---

## 4. Promotion and Release Governance

**Finding:** No manual approval for production deploy.  
**Severity:** High  
**Capability:** Promotion and release governance  
**Evidence observed:** `.github/workflows/deploy.yml` deploys to prod on merge to `main`; no `environment: production` with `required_reviewers`.  
**Anti-pattern:** Auto-merge prod  
**Missing evidence:** Manual approval gate; environment protection.  
**Remediation:** Add `environment: production` to prod deploy job. Configure required reviewers in repo settings. Consider separate prod workflow with `workflow_dispatch`.

---

**Finding:** Dev and prod share same pipeline; env selected by branch only.  
**Severity:** Medium  
**Capability:** Promotion and release governance  
**Evidence observed:** Single `deploy.yml`; `if: github.ref == 'refs/heads/main'` selects prod; no staging promotion.  
**Missing evidence:** Explicit promotion path; staging validation.  
**Remediation:** Add staging branch; require merge to staging before main. Or use Argo CD Applications per env with sync waves.

---

## 5. Observability and Continuous Monitoring

**Finding:** No centralized logging; logs to stdout only.  
**Severity:** Medium  
**Capability:** Observability and monitoring  
**Evidence observed:** `manifests/deployment.yaml` has no log sidecar or Fluent Bit; no Loki/CloudWatch config.  
**Missing evidence:** Log aggregation; retention.  
**Remediation:** Add Fluent Bit or log shipper; configure Loki or CloudWatch. Set retention. Ensure pipeline logs included.

---

**Finding:** No deploy audit trail.  
**Severity:** Medium  
**Capability:** Observability and monitoring  
**Evidence observed:** Git history shows merges; no evidence of who triggered deploy, when, or what artifact.  
**Missing evidence:** Deploy event log; audit retention.  
**Remediation:** Enable Argo CD audit log or pipeline deploy events. Export to SIEM or audit store. Document retention policy.

---

## 6. Identity, Secrets, and Access Control

**Finding:** Pipeline uses long-lived Azure client secret.  
**Severity:** Critical  
**Capability:** Identity, secrets, access control  
**Evidence observed:** `azure-pipelines.yml` uses `ARM_CLIENT_SECRET` from variable group; no OIDC.  
**Anti-pattern:** Secret in env; long-lived key  
**Missing evidence:** OIDC or federated credentials.  
**Remediation:** Migrate to OIDC with `azure/login` action. Remove client secret from variable group. Rotate and revoke exposed secret.

---

**Finding:** IAM role has wildcard for S3.  
**Severity:** High  
**Capability:** Identity, secrets, access control  
**Evidence observed:** `terraform/iam.tf` line 34: `"Resource": "*"` for `s3:*`.  
**Anti-pattern:** Wildcard IAM  
**Missing evidence:** Scoped resource ARN.  
**Remediation:** Restrict to specific bucket(s): `arn:aws:s3:::my-bucket/*`. Use condition keys if needed.

---

## 7. Policy as Code and Compliance Evidence

**Finding:** Checkov present but does not block pipeline.  
**Severity:** Medium  
**Capability:** Policy as code and compliance evidence  
**Evidence observed:** `checkov -d .` runs in pipeline; `continue-on-error: true`.  
**Anti-pattern:** Policy optional  
**Missing evidence:** Failure on violation; remediation.  
**Remediation:** Remove `continue-on-error`. Add `--fail-on FAIL` for critical. Fix findings or document exception with ticket.

---

**Finding:** No policy definitions in Git.  
**Severity:** Low  
**Capability:** Policy as code and compliance evidence  
**Evidence observed:** Azure Policy or AWS Config referenced in docs; no `policies/` or `opa/` in repo.  
**Missing evidence:** Versioned policy; review process.  
**Remediation:** Create `policies/` directory. Add OPA/Checkov rules. Version in Git. Require PR review for policy changes.

---

## Example Capability Score Summary

| Capability | Score | Blocking Findings |
|------------|-------|-------------------|
| 1. CI/CD orchestration | 2 | Kitchen sink job; :latest in prod |
| 2. GitOps and config as code | 1 | No GitOps; secrets in Git |
| 3. Security scanning and supply chain | 2 | Scan ignored; no SBOM |
| 4. Promotion and release governance | 2 | No manual approval; no staging |
| 5. Observability and monitoring | 3 | No centralized logs; no deploy audit |
| 6. Identity, secrets, access control | 1 | Long-lived secret; wildcard IAM |
| 7. Policy as code and compliance evidence | 2 | Policy optional; no policy repo |
| **Overall** | 2.1 | Critical: secrets in Git, long-lived keys; High: no GitOps, no approval |
