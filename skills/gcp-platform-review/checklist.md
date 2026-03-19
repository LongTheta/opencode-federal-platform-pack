# GCP Platform Review Checklist

Use for repo reviews and architecture discovery. Assess each domain and document evidence or gaps.

---

## 1. Identity and Access

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 1.1 | Service accounts (not user keys) for workloads | `google_service_account`, `google_service_account_key` (avoid) |
| 1.2 | Least privilege (no broad roles) | `google_project_iam_*`, avoid `roles/owner`, `roles/editor` |
| 1.3 | Workload Identity for GKE | `workload_identity_config` on node pool |
| 1.4 | Workload Identity Federation for CI/CD | `google_iam_workload_identity_pool` |
| 1.5 | No JSON key files in code/config | Grep for `*.json` keys |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 2. Network Architecture

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 2.1 | VPC with subnet separation | `google_compute_network`, `google_compute_subnetwork` |
| 2.2 | Firewall rules restrict by need | `google_compute_firewall`, `source_ranges`, `target_tags` |
| 2.3 | Private Google Access for GCP APIs | `private_ip_google_access = true` |
| 2.4 | VPC Service Controls (if applicable) | `google_access_context_manager_*` |
| 2.5 | No 0.0.0.0/0 ingress in production | `source_ranges` in firewall |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 3. Workload Isolation

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 3.1 | GKE: namespaces, network policies | `kubernetes_*`, NetworkPolicy |
| 3.2 | Project or folder separation per env | `google_project`, folder structure |
| 3.3 | Multi-zone for GKE, Cloud SQL | `locations` across zones |
| 3.4 | Environment separation (dev/stage/prod) | Separate projects, labels |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 4. Secrets and Key Management

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 4.1 | Secret Manager for secrets | `google_secret_manager_secret` |
| 4.2 | Workload identity for secret access | IAM binding to SA, not user |
| 4.3 | No plaintext secrets in code/config | Grep for keys, passwords |
| 4.4 | KMS for encryption keys (if applicable) | `google_kms_crypto_key` |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 5. Logging and Monitoring

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 5.1 | Log sinks to Cloud Logging | `google_logging_project_sink` |
| 5.2 | Log retention set | `retention_in_days` on log bucket |
| 5.3 | Alerting policies | `google_monitoring_alert_policy` |
| 5.4 | Uptime checks | `google_monitoring_uptime_check_config` |
| 5.5 | Audit logs enabled | Audit config on project |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 6. Tagging and Labeling (Metadata Governance)

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 6.1 | Labels on all billable resources | `labels` block: environment, owner, cost center |
| 6.2 | Consistent label keys | `variables.tf`, `terraform.tfvars` |
| 6.3 | Billing export (if in repo) | `google_billing_account` config |
| 6.4 | No unlabeled production resources | Audit of `google_*` resources |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 7. Cost-Awareness

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 7.1 | Right-sized machine types | `machine_type` on GKE, Compute |
| 7.2 | Committed use discounts (if applicable) | Billing docs; not always in IaC |
| 7.3 | GCS lifecycle for cold data | `lifecycle_rule` on bucket |
| 7.4 | Budget alerts | `google_billing_budget` (if in repo) |
| 7.5 | Spot/preemptible for non-critical | `spot = true` on GKE node pool |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 8. Backup, Resilience, and DR

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 8.1 | Cloud SQL automated backups | `backup_configuration` |
| 8.2 | GCS versioning for critical buckets | `versioning { enabled = true }` |
| 8.3 | Multi-region for critical data | `location` = "US" or "EU" |
| 8.4 | RTO/RPO documented | docs/, runbooks |
| 8.5 | Restore tested | Runbook, drill documentation |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 9. CI/CD and IaC Alignment

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 9.1 | Terraform in repo | `*.tf` with `google` provider |
| 9.2 | Terraform plan in CI | `cloudbuild.yaml`, `.github/workflows/` |
| 9.3 | Workload Identity Federation for pipeline | `google_iam_workload_identity_pool_provider` |
| 9.4 | Pinned image digests (no `:latest`) | Artifact Registry, `image_digest` |
| 9.5 | Environment promotion controls | Manual approval for prod |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 10. Policy Guardrails

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 10.1 | Organization Policy | `google_org_policy_policy` |
| 10.2 | Terraform Validator | Policy library in CI |
| 10.3 | Required labels enforced | Policy constraint |
| 10.4 | Allowed regions, restricted APIs | Org policy constraints |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 11. Documentation Maturity

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 11.1 | README with setup and run | `README.md` |
| 11.2 | Architecture diagram or doc | `docs/`, `architecture.md` |
| 11.3 | Runbooks for operations | `docs/runbooks/` |
| 11.4 | ADRs for key decisions | `docs/adr/` |
| 11.5 | Environment and variable docs | `.env.example`, README |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## Questions a Solution Architect Should Ask

| Domain | Sample Questions |
|--------|------------------|
| **Resilience** | What is the blast radius of a single zone failure? Multi-zone for GKE, Cloud SQL? What is RTO/RPO? Has restore been tested? |
| **Identity** | How are service accounts scoped? Any project-level owner/editor? Workload Identity for GKE? Workload Identity Federation for CI/CD? |
| **Secrets** | Where do secrets live? Secret Manager with workload identity? Where is the Cloud SQL password? |
| **Network** | Private Google Access? VPC Service Controls? Any 0.0.0.0/0 ingress? IAP for SSH? |
| **Cost** | Labels on all billable resources? Budget alerts? |
| **CI/CD** | Terraform plan in CI? Workload Identity Federation? Drift detection? Pinned image digests? |

---

## Evidence to Request or Look For

| Category | Artifacts |
|----------|-----------|
| **IaC** | `terraform/`, `infra/` — `*.tf` with `google` provider |
| **Identity** | `google_service_account`, `google_project_iam_*`, `workload_identity_config` |
| **Network** | `google_compute_network`, `google_compute_firewall`, `private_ip_google_access` |
| **Workloads** | GKE cluster/node pool, Cloud Run, Cloud SQL configs |
| **Secrets** | `google_secret_manager_secret` — no JSON keys in repo |
| **Observability** | `google_logging_project_sink`, `google_monitoring_alert_policy`, `retention_in_days` |
| **Governance** | `labels` block (environment, owner, cost-center), `google_billing_budget`, Org Policy |
| **CI/CD** | `cloudbuild.yaml`, `.github/workflows/` with Workload Identity Federation |
| **Docs** | `README.md`, `docs/`, `docs/runbooks/`, `docs/adr/` |

---

## Readiness Score (Per Domain)

| Domain | Score (1–5) | Notes |
|--------|-------------|-------|
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
