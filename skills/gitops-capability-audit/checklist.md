# GitOps Capability Audit Checklist

Use this checklist when conducting a GitOps capability audit. For each capability, verify criteria and document evidence or gaps. Reference `capability-model.md` for good/weak/anti-patterns.

---

## 1. CI/CD Orchestration

| # | Criterion | Evidence to Look For | Pass/Fail |
|---|-----------|---------------------|-----------|
| 1.1 | Distinct pipeline stages (build, test, scan, artifact, deploy) | Stage separation in workflow; no kitchen-sink job | |
| 1.2 | Explicit triggers (PR, tag, branch) | `on:`, `rules:`, `workflow_dispatch` documented | |
| 1.3 | Immutable artifacts (digest or version) | No `:latest`; digest or semantic version in refs | |
| 1.4 | Failures fail fast; no silent pass | No `continue-on-error: true` or `|| true` on critical steps | |
| 1.5 | Pipeline config in Git | Workflow files in repo; no pipeline-in-pipeline | |
| 1.6 | Failure notifications | Slack/Teams/PagerDuty on failure; status checks | |

**Evidence observed:** _________________  
**Missing evidence:** _________________  
**Anti-patterns found:** _________________

---

## 2. GitOps and Configuration as Code

| # | Criterion | Evidence to Look For | Pass/Fail |
|---|-----------|---------------------|-----------|
| 2.1 | Git as source of truth | Argo CD or Flux Application; source = Git repo | |
| 2.2 | Declarative manifests | Helm, Kustomize, raw YAML; no imperative kubectl in prod | |
| 2.3 | Drift detection | Argo CD sync status; Flux reconciliation; drift alerts | |
| 2.4 | Environment separation | Separate paths/overlays per env; no prod in dev path | |
| 2.5 | PR review for config changes | Branch protection; required reviewers for prod path | |
| 2.6 | No secrets in Git | No base64 or plaintext secrets in manifests | |

**Evidence observed:** _________________  
**Missing evidence:** _________________  
**Anti-patterns found:** _________________

---

## 3. Security Scanning and Software Supply Chain

| # | Criterion | Evidence to Look For | Pass/Fail |
|---|-----------|---------------------|-----------|
| 3.1 | SBOM produced | Syft, CycloneDX, SPDX in pipeline; artifact stored | |
| 3.2 | Vulnerability scanning in CI | Trivy, Snyk, Grype; fail on high/critical | |
| 3.3 | Dependencies pinned | Lock file present and committed | |
| 3.4 | No `:latest` in prod | Image refs with digest or version | |
| 3.5 | Provenance or attestation | sigstore, in-toto; verifiable build chain | |
| 3.6 | Dependency update automation | Dependabot, Renovate; review cadence | |

**Evidence observed:** _________________  
**Missing evidence:** _________________  
**Anti-patterns found:** _________________

---

## 4. Promotion and Release Governance

| # | Criterion | Evidence to Look For | Pass/Fail |
|---|-----------|---------------------|-----------|
| 4.1 | Promotion path (dev → staging → prod) | No skip; staging used | |
| 4.2 | Manual approval for production | `required_reviewers`, environment protection | |
| 4.3 | Environment separation | Separate namespaces/clusters/accounts | |
| 4.4 | No shared credentials | Per-env secrets; no cross-env reference | |
| 4.5 | Release traceability | Changelog, release notes, tag-based release | |
| 4.6 | Rollback documented and tested | Runbook; drill evidence | |

**Evidence observed:** _________________  
**Missing evidence:** _________________  
**Anti-patterns found:** _________________

---

## 5. Observability and Continuous Monitoring

| # | Criterion | Evidence to Look For | Pass/Fail |
|---|-----------|---------------------|-----------|
| 5.1 | Centralized logging | Loki, CloudWatch, Elastic; retention configured | |
| 5.2 | Metrics and dashboards | Prometheus, Grafana; key SLOs defined | |
| 5.3 | Distributed tracing | Jaeger, Tempo; trace IDs in logs | |
| 5.4 | Alerting with runbooks | Alerts linked to runbooks; tuned to reduce noise | |
| 5.5 | Pipeline observability | Build metrics; success rate; deploy events | |
| 5.6 | Deploy audit trail | Who deployed what, when; retained | |

**Evidence observed:** _________________  
**Missing evidence:** _________________  
**Anti-patterns found:** _________________

---

## 6. Identity, Secrets, and Access Control

| # | Criterion | Evidence to Look For | Pass/Fail |
|---|-----------|---------------------|-----------|
| 6.1 | Workload identity (no long-lived keys) | OIDC, workload identity federation in pipeline | |
| 6.2 | External secrets | Vault, ESO, Secrets Manager; no plaintext in config | |
| 6.3 | Least privilege | Scoped roles; no wildcard in IAM/RBAC | |
| 6.4 | Per-environment secrets | No shared prod credentials | |
| 6.5 | Secret rotation documented | Runbook; rotation tested | |
| 6.6 | RBAC for prod deploy | Only authorized identities can deploy to prod | |

**Evidence observed:** _________________  
**Missing evidence:** _________________  
**Anti-patterns found:** _________________

---

## 7. Policy as Code and Compliance Evidence

| # | Criterion | Evidence to Look For | Pass/Fail |
|---|-----------|---------------------|-----------|
| 7.1 | Policy enforced in CI | Checkov, tfsec, OPA; blocks on violation | |
| 7.2 | Policy definitions in Git | `policies/`, `opa/`, versioned | |
| 7.3 | Audit trail for policy decisions | Policy decision log; retention | |
| 7.4 | Required tags/labels enforced | Policy blocks untagged resources | |
| 7.5 | Compliance evidence exportable | Automated report; SBOM; control mapping | |
| 7.6 | Exceptions documented and time-bound | Ticket; expiry; owner | |

**Evidence observed:** _________________  
**Missing evidence:** _________________  
**Anti-patterns found:** _________________

---

## Capability Score Summary

| Capability | Score (1–5) | Blocking Findings |
|------------|-------------|------------------|
| 1. CI/CD orchestration | | |
| 2. GitOps and config as code | | |
| 3. Security scanning and supply chain | | |
| 4. Promotion and release governance | | |
| 5. Observability and monitoring | | |
| 6. Identity, secrets, access control | | |
| 7. Policy as code and compliance evidence | | |
| **Overall** | | |

**Score guide:** 1 = No evidence; critical gaps. 2 = Partial; significant gaps. 3 = Adequate; some gaps. 4 = Strong; minor gaps. 5 = Full evidence; good practices.
