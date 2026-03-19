---
name: gcp-platform-review
description: GCP platform and repository review for identity, network, workload isolation, secrets, observability, labeling, cost, resilience, CI/CD, policy, and documentation. Use for repo reviews and architecture discovery.
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

- What is the blast radius of a single zone failure? Multi-zone or multi-region?
- How are service accounts scoped? Any project-level broad roles?
- Where do secrets live? Secret Manager with workload identity?
- What is the network segmentation? Private Google Access? VPC-SC?
- How is cost allocated? Labels on all billable resources?
- What is the RTO/RPO? Backup and restore tested?
- How does CI/CD authenticate? Workload Identity Federation? No keys?
- Is there drift detection? Terraform plan in CI? Organization Policy?

## Evidence to Request or Look For

- Terraform in `terraform/`, `infra/` with `google_*` provider
- `google_service_account`, `google_project_iam_*` definitions
- `google_compute_network`, `google_compute_firewall`
- GKE cluster config, Cloud Run service configs
- Secret Manager references (not secret values)
- Cloud Logging sinks, metric filters, alerting policies
- `labels` on `google_*` resources
- Backup config (Cloud SQL, GCS versioning)
- `cloudbuild.yaml`, `.github/workflows/` for CI/CD
- Organization Policy or Terraform Validator
- `docs/`, `README.md`, runbooks

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
