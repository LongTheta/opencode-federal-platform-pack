# Federal Platform Review Checklist

Use this checklist when performing a federal-platform-review. For each domain, assess criteria and document evidence or gaps. **Do not claim formal compliance.** Phrase as readiness indicators, risks, and recommended evidence.

---

## 1. Architecture Clarity

| # | Criterion | Evidence to Look For | Assurance Theme |
|---|-----------|---------------------|-----------------|
| 1.1 | Clear system boundary | Architecture docs, network diagrams, VPC/VNet config | SC-7 |
| 1.2 | Scalability and resilience | Multi-AZ, auto-scaling, failover config | CP, SC |
| 1.3 | Technology choices documented | ADRs, README, architecture docs | SA |
| 1.4 | Data flow and trust boundaries | Data flow docs, encryption boundaries | SC, SI |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 2. CI/CD Maturity

| # | Criterion | Evidence to Look For | Assurance Theme |
|---|-----------|---------------------|-----------------|
| 2.1 | Pipeline stages (build, test, scan, deploy) | .github, .gitlab, Jenkinsfile | CM-3, SA-11 |
| 2.2 | Security gates (scan, lint, test) | Pipeline config, failure on vuln | SI-3, SA-11 |
| 2.3 | Artifact handling (pinned, signed) | Lock files, digests, attestation | SA-12, SI-7 |
| 2.4 | Promotion controls | Manual approval, environment gates | AC-2, CM-3 |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 3. GitOps Readiness

| # | Criterion | Evidence to Look For | Assurance Theme |
|---|-----------|---------------------|-----------------|
| 3.1 | Declarative config (Git as source of truth) | Argo CD, Flux, Helm, Kustomize | CM-2, CM-3 |
| 3.2 | Drift detection and reconciliation | Argo CD sync, Terraform plan in CI | CM-3 |
| 3.3 | Promotion between environments | Separate apps, sync waves | AC-2 |
| 3.4 | Audit trail for changes | Git history, PR reviews | AU-2, AU-3 |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 4. IAM and Secrets Patterns

| # | Criterion | Evidence to Look For | Assurance Theme |
|---|-----------|---------------------|-----------------|
| 4.1 | Least privilege | IAM roles, RBAC, scoped permissions | AC-2, AC-3 |
| 4.2 | Workload identity (OIDC, SA) | No long-lived keys in pipelines | IA-5 |
| 4.3 | External secrets (Vault, ESO) | No plaintext in code/config | IA-5, SC-28 |
| 4.4 | No shared credentials | Per-environment, per-workload | AC-2 |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 5. Logging, Monitoring, and Auditability

| # | Criterion | Evidence to Look For | Assurance Theme |
|---|-----------|---------------------|-----------------|
| 5.1 | Centralized logging | CloudWatch, Stackdriver, Loki, etc. | AU-2, AU-3 |
| 5.2 | Metrics and alerting | Prometheus, Grafana, CloudWatch | AU-6, SI-4 |
| 5.3 | Audit events defined | Login, config change, deploy | AU-2 |
| 5.4 | Retention and tamper resistance | Log retention config | AU-9, AU-11 |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 6. SBOM and Software Supply Chain

| # | Criterion | Evidence to Look For | Assurance Theme |
|---|-----------|---------------------|-----------------|
| 6.1 | Dependencies pinned | Lock files, digest-based images | SA-12, SI-7 |
| 6.2 | SBOM produced | Syft, CycloneDX, SPDX in pipeline | SA-12 |
| 6.3 | Vulnerability scanning | npm audit, Trivy, Snyk in CI | SI-3 |
| 6.4 | Provenance or attestation | Build attestation, sigstore | SA-12, SI-7 |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 7. Environment Separation and Promotion Controls

| # | Criterion | Evidence to Look For | Assurance Theme |
|---|-----------|---------------------|-----------------|
| 7.1 | Dev/stage/prod separation | Namespaces, accounts, subscriptions | AC-4, SC-7 |
| 7.2 | Manual approval for production | Pipeline gates, PR approval | AC-2, CM-3 |
| 7.3 | No direct prod from dev | Promotion path, no skip | CM-3 |
| 7.4 | Environment-specific config | No prod secrets in dev | IA-5, SC-28 |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 8. IaC Quality and Policy Enforcement

| # | Criterion | Evidence to Look For | Assurance Theme |
|---|-----------|---------------------|-----------------|
| 8.1 | IaC for all provisioned resources | Terraform, CloudFormation, Pulumi | CM-2 |
| 8.2 | Tagging (environment, owner, cost) | Tags in IaC | PM, SA |
| 8.3 | Policy-as-code (OPA, Checkov) | Policy checks in CI | CM-3, AC |
| 8.4 | Drift detection | Terraform plan, config drift | CM-3 |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 9. Documentation and Traceability

| # | Criterion | Evidence to Look For | Assurance Theme |
|---|-----------|---------------------|-----------------|
| 9.1 | README with setup and run | README.md | SA-5 |
| 9.2 | Runbooks for operations | docs/, runbooks/ | CP, IR |
| 9.3 | Architecture decisions (ADRs) | docs/adr/, architecture.md | PL, SA |
| 9.4 | Change documentation | Changelog, release notes | CM-3 |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 10. Evidence Quality

| # | Criterion | Evidence to Look For | Assurance Theme |
|---|-----------|---------------------|-----------------|
| 10.1 | Findings cite specific files/configs | Path, line, section | — |
| 10.2 | Missing evidence called out | "Evidence not found" with verification step | — |
| 10.3 | No unverified claims | No "likely," "may" without evidence | — |
| 10.4 | Reproducible verification | Reviewer can inspect cited location | — |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## Readiness Score (Per Domain)

| Domain | Score (1–5) | Notes |
|--------|-------------|-------|
| Architecture clarity | | |
| CI/CD maturity | | |
| GitOps readiness | | |
| IAM and secrets | | |
| Logging, monitoring, auditability | | |
| SBOM and supply chain | | |
| Environment separation | | |
| IaC quality and policy | | |
| Documentation and traceability | | |
| Evidence quality | | |
| **Overall** | | |

**Score guide:** 1 = No evidence; 2 = Partial, significant gaps; 3 = Adequate, some gaps; 4 = Strong, minor gaps; 5 = Full evidence, ready for assessment.
