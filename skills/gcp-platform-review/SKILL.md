---
name: gcp-platform-review
description: GCP platform and repository review for identity, network, workload isolation, secrets, observability, labeling, cost, resilience, CI/CD, policy, and documentation. Use for repo reviews and architecture discovery.
risk_tier: 0
---

# GCP Platform Review Skill

Assesses GCP-based platforms and repositories for production readiness and operational excellence. Aligned with Google Cloud Architecture Framework. Practical for repo reviews and solution architect discovery sessions.

## When to Use

- Reviewing repositories with GCP IaC (Terraform, Deployment Manager)
- Architecture discovery for GCP workloads
- Pre-production or pre-migration assessment
- Due diligence for GKE, Cloud Run, Cloud SQL, or other GCP services

## Evaluation Domains

| Domain | What to Assess |
|--------|----------------|
| Identity and access | IAM, service accounts, workload identity, least privilege |
| Network architecture | VPC, subnets, firewall rules, Private Google Access |
| Workload isolation | GKE namespaces, project/folder structure, multi-region |
| Secrets and key management | Secret Manager, no plaintext, workload identity |
| Logging and monitoring | Cloud Logging, Cloud Monitoring, Chronicle |
| Tagging and labeling | Labels on resources, cost allocation |
| Cost-awareness | Committed use, right-sizing, billing alerts |
| Backup, resilience, DR | Cloud SQL backups, GCS versioning, multi-region |
| CI/CD and IaC alignment | Cloud Build, Terraform, Workload Identity Federation |
| Policy guardrails | Organization Policy, Terraform Validator |
| Documentation maturity | README, runbooks, architecture docs |

## Workflow

1. **Gather artifacts** — Terraform, Deployment Manager, pipelines, configs.
2. **Evaluate each domain** — Use `checklist.md` for criteria.
3. **Document evidence** — What was observed; what was not found.
4. **Assess readiness** — Per domain and overall.
5. **Produce report** — Use `output-template.md`.

## Questions a Solution Architect Should Ask

**Resilience and blast radius**
- What is the blast radius of a single zone failure? Multi-zone or multi-region?
- Are GKE and Cloud SQL multi-zone? What happens if us-central1-a fails?
- What is the RTO/RPO? Has backup restore been tested?

**Identity and access**
- How are service accounts scoped? Any project-level broad roles (owner, editor)?
- Workload Identity for GKE? Workload Identity Federation for CI/CD?
- No JSON key files in code or config?

**Secrets and data**
- Where do secrets live? Secret Manager with workload identity?
- Where is the Cloud SQL password? Secret Manager or variable?

**Network**
- What is the network segmentation? Private Google Access? VPC Service Controls?
- Any 0.0.0.0/0 ingress in production? IAP for SSH?

**Cost and governance**
- How is cost allocated? Labels on all billable resources?
- Budget alerts? Right-sized machine types?

**CI/CD and drift**
- How does CI/CD authenticate? Workload Identity Federation? No keys?
- Terraform plan in CI? Organization Policy?
- Pinned image digests? No `:latest` in prod?

## Evidence to Request or Look For

**IaC and structure**
- Terraform in `terraform/`, `infra/` with `google` provider
- `*.tf` with `google_*` resources

**Identity**
- `google_service_account`, `google_project_iam_*`
- `workload_identity_config` on GKE node pool
- `google_iam_workload_identity_pool_provider` for CI/CD

**Network**
- `google_compute_network`, `google_compute_subnetwork`, `google_compute_firewall`
- `private_ip_google_access = true`
- `google_access_context_manager_*` (VPC-SC, if applicable)

**Workloads**
- GKE: `google_container_cluster`, `google_container_node_pool`
- Cloud Run: `google_cloud_run_service`
- Cloud SQL: `google_sql_database_instance`

**Secrets**
- `google_secret_manager_secret`, `google_secret_manager_secret_version`
- IAM binding to service account — no user keys
- No `*.json` key files in repo

**Observability**
- `google_logging_project_sink`, `google_logging_log_bucket`
- `google_monitoring_alert_policy`, `google_monitoring_uptime_check_config`
- `retention_in_days` on log bucket

**Governance**
- `labels` on `google_*` resources: environment, owner, cost-center
- `google_billing_budget` (if in repo)
- `google_org_policy_policy`, Terraform Validator

**CI/CD**
- `cloudbuild.yaml`, `.github/workflows/`
- `google-github-actions/auth` with Workload Identity Federation
- Artifact Registry references with digest, not `:latest`

**Documentation**
- `README.md`, `docs/`, `docs/runbooks/`, `docs/adr/`

## Output Format

See `output-template.md`. Required: executive summary, findings by domain, severity, evidence observed, missing evidence, recommended actions, readiness score.

## Principles

- **Evidence-first** — Cite specific files, resources, or configs.
- **GCP-native** — Use GCP terminology (VPC, IAM, Cloud Logging, etc.).
- **Actionable** — Recommendations include concrete steps.

## References

- `checklist.md` — Evaluation criteria per domain
- `examples.md` — Sample findings
- `output-template.md` — Report structure
