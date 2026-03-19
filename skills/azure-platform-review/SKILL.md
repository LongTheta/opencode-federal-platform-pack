---
name: azure-platform-review
description: Azure platform and repository review for identity, network, workload isolation, secrets, observability, tagging, cost, resilience, CI/CD, policy, and documentation. Use for repo reviews and architecture discovery.
---

# Azure Platform Review Skill

Assesses Azure-based platforms and repositories for production readiness and operational excellence. Aligned with Azure Well-Architected Framework. Practical for repo reviews and solution architect discovery sessions.

## When to Use

- Reviewing repositories with Azure IaC (Terraform, Bicep, ARM)
- Architecture discovery for Azure workloads
- Pre-production or pre-migration assessment
- Due diligence for AKS, Functions, SQL Database, or other Azure services

## Evaluation Domains

| Domain | What to Assess |
|--------|----------------|
| Identity and access | Entra ID, managed identities, RBAC, least privilege |
| Network architecture | VNet, subnets, NSGs, private endpoints |
| Workload isolation | AKS namespaces, App Service plans, multi-region |
| Secrets and key management | Key Vault, managed identity, no plaintext |
| Logging and monitoring | Log Analytics, Application Insights, Monitor |
| Tagging and metadata governance | Resource tags, cost allocation, compliance tags |
| Cost-awareness | Reservations, right-sizing, Cost Management |
| Backup, resilience, DR | Azure Backup, geo-redundancy, RTO/RPO |
| CI/CD and IaC alignment | GitHub Actions, Azure DevOps, Terraform, drift |
| Policy guardrails | Azure Policy, OPA, Bicep lint |
| Documentation maturity | README, runbooks, architecture docs |

## Workflow

1. **Gather artifacts** — Terraform, Bicep, ARM, pipelines, configs.
2. **Evaluate each domain** — Use `checklist.md` for criteria.
3. **Document evidence** — What was observed; what was not found.
4. **Assess readiness** — Per domain and overall.
5. **Produce report** — Use `output-template.md`.

## Questions a Solution Architect Should Ask

- What is the blast radius of a single region failure? Geo-redundancy?
- How are managed identities used? Any service principals with long-lived secrets?
- Where do secrets live? Key Vault with managed identity access?
- What is the network segmentation? Private endpoints vs. public endpoints?
- How is cost allocated? Tags on all billable resources?
- What is the RTO/RPO? Backup and restore tested?
- How does CI/CD authenticate? OIDC or federated credentials?
- Is there drift detection? Terraform plan in CI? Azure Policy?

## Evidence to Request or Look For

- Terraform/Bicep/ARM in `terraform/`, `bicep/`, `arm/`
- `azurerm_*` or `azuread_*` resource definitions
- VNet, subnet, NSG configs
- AKS node pools, App Service, Function App configs
- Key Vault references (not secrets)
- Log Analytics workspace, diagnostic settings
- `tags` block on `azurerm_*` resources
- Backup config (Recovery Services, SQL geo-replication)
- `.github/workflows/` or `azure-pipelines.yml` for CI/CD
- Azure Policy definitions or assignments
- `docs/`, `README.md`, runbooks

## Output Format

See `output-template.md`. Required: executive summary, findings by domain, severity, evidence observed, missing evidence, recommended actions, readiness score.

## Principles

- **Evidence-first** — Cite specific files, resources, or configs.
- **Azure-native** — Use Azure terminology (VNet, Key Vault, Entra ID, etc.).
- **Actionable** — Recommendations include concrete steps.

## References

- `checklist.md` — Evaluation criteria per domain
- `examples.md` — Sample findings
- `output-template.md` — Report structure
