# GCP Platform Review — Examples

Sample findings for repo reviews and architecture discovery.

---

## Identity and Access

**Finding:** GKE uses Workload Identity for pod-to-GCP auth.  
**Severity:** Low (positive)  
**Evidence observed:** `terraform/gke.tf` line 45: `workload_identity_config { workload_pool = "${project_id}.svc.id.goog" }`.  
**Missing evidence:** None.  
**Recommended action:** Document which SA maps to which K8s SA for audit.

---

**Finding:** Service account has `roles/editor` at project level.  
**Severity:** High  
**Evidence observed:** `terraform/iam.tf` line 12: `google_project_iam_member` with `roles/editor` for app SA.  
**Missing evidence:** Scoped, custom role.  
**Recommended action:** Create custom role with minimal permissions; remove editor.

---

## Network Architecture

**Finding:** Firewall allows 0.0.0.0/0 on port 22.  
**Severity:** High  
**Evidence observed:** `terraform/firewall.tf` line 8: `source_ranges = ["0.0.0.0/0"]` for SSH.  
**Missing evidence:** Restriction to IAP or bastion.  
**Recommended action:** Use IAP for SSH tunneling; restrict to `35.235.240.0/20` for IAP.

---

**Finding:** Private Google Access enabled on subnet.  
**Severity:** Low (positive)  
**Evidence observed:** `terraform/subnet.tf` line 15: `private_ip_google_access = true`.  
**Missing evidence:** None.  
**Recommended action:** Document for compliance; ensures VM-only access to GCP APIs.

---

## Secrets and Key Management

**Finding:** Database password in Terraform variable.  
**Severity:** High  
**Evidence observed:** `terraform/cloud_sql.tf` line 22: `password = var.db_password`.  
**Missing evidence:** Secret Manager reference.  
**Recommended action:** Store in Secret Manager; use `google_secret_manager_secret_version` data source.

---

## Tagging and Labeling

**Finding:** GCP uses labels instead of tags; GKE node pool unlabeled.  
**Severity:** Medium  
**Evidence observed:** `terraform/gke.tf` node pool has no `labels`; other resources have `environment`, `owner`.  
**Missing evidence:** Cost allocation for GKE nodes.  
**Recommended action:** Add `labels` to node pool: `environment`, `owner`, `cost-center`.

---

## Backup and Resilience

**Finding:** Cloud SQL has 7-day backup retention.  
**Severity:** Low (positive)  
**Evidence observed:** `terraform/cloud_sql.tf` line 35: `backup_configuration { retention = 7 }`.  
**Missing evidence:** Cross-region copy; point-in-time recovery.  
**Recommended action:** Document RPO; consider cross-region for DR.

---

## CI/CD and IaC

**Finding:** Cloud Build uses Workload Identity Federation.  
**Severity:** Low (positive)  
**Evidence observed:** `cloudbuild.yaml` uses `identity: 'projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/...'`.  
**Missing evidence:** None.  
**Recommended action:** Document pool and provider config for audit.

---

## Questions a Solution Architect Should Ask (Sample)

- "What happens if us-central1-a fails? Are GKE and Cloud SQL multi-zone?"
- "How does the pipeline authenticate to GCP? Workload Identity Federation or keys?"
- "Where is the Cloud SQL password? Secret Manager or variable?"
- "Do we have VPC Service Controls? What's the perimeter?"
- "What is our backup retention? Has restore been tested?"

---

## Evidence to Request or Look For (Sample)

- `terraform/` with `google_*` resources
- `google_service_account`, `google_project_iam_*`
- `google_compute_network`, `google_compute_firewall`
- `google_secret_manager_secret`
- `google_logging_project_sink`, `google_monitoring_alert_policy`
- `labels` on `google_*` resources
- `cloudbuild.yaml`, `.github/workflows/` with `google-github-actions/auth`
