---
name: azure-platform-review
description: Azure platform and repository review for identity, network, workload isolation, secrets, observability, tagging, cost, resilience, CI/CD, policy, and documentation. Use for repo reviews and architecture discovery.
risk_tier: 0
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

**Resilience and blast radius**
- What is the blast radius of a single region failure? Geo-redundancy?
- Are SQL Database and Storage geo-replicated? What happens if East US fails?
- What is the RTO/RPO? Has backup restore been tested?

**Identity and access**
- How are managed identities used? Any service principals with long-lived secrets?
- OIDC or federated credentials for CI/CD? No client secrets in pipelines?
- Entra ID conditional access for console? (if applicable)

**Secrets and data**
- Where do secrets live? Key Vault with managed identity access?
- Where is the SQL connection string? Key Vault reference or app settings?

**Network**
- What is the network segmentation? Private endpoints vs. public endpoints?
- Private endpoints for Storage, Key Vault, SQL? Any 0.0.0.0/0 in NSGs?
- VNet integration for App Service/Functions?

**Cost and governance**
- How is cost allocated? Tags on all billable resources?
- Budget alerts? Right-sized SKUs?

**CI/CD and drift**
- How does CI/CD authenticate? OIDC or federated credentials?
- Terraform plan or Bicep what-if in CI?
- Is there drift detection? Azure Policy?
- Pinned image digests? No `:latest` in prod?

## Evidence to Request or Look For

**IaC and structure**
- Terraform/Bicep/ARM in `terraform/`, `bicep/`, `arm/`
- `*.tf`, `*.bicep`, `*.json` (ARM)

**Identity**
- `azurerm_user_assigned_identity`, `identity { type = "SystemAssigned" }`
- `azurerm_role_assignment`, custom role definitions
- OIDC in workflow: `azure/login` with `id-token: write`

**Network**
- `azurerm_virtual_network`, `azurerm_subnet`, `azurerm_network_security_group`
- `azurerm_private_endpoint` for Storage, Key Vault, SQL
- `azurerm_app_service_virtual_network_swift_connection`

**Workloads**
- AKS: `azurerm_kubernetes_cluster`, node pools, `kubernetes_*`
- App Service: `azurerm_app_service`, `azurerm_app_service_plan`
- Function App: `azurerm_function_app`

**Secrets**
- `azurerm_key_vault`, `azurerm_key_vault_access_policy`
- `@Microsoft.KeyVault(...)` in app settings — no plaintext
- Key Vault firewall, private endpoint

**Observability**
- `azurerm_log_analytics_workspace`, `azurerm_application_insights`
- `azurerm_monitor_diagnostic_setting`, `azurerm_monitor_metric_alert`
- `retention_in_days` on workspace

**Governance**
- `tags` block on `azurerm_*` resources: Environment, Owner, CostCenter
- `azurerm_consumption_budget` (if in repo)
- `azurerm_policy_definition`, `azurerm_resource_policy_assignment`

**CI/CD**
- `.github/workflows/`, `azure-pipelines.yml`
- `azure/login` with OIDC, `az deployment group create` (Bicep)
- ACR references with digest, not `:latest`

**Documentation**
- `README.md`, `docs/`, `docs/runbooks/`, `docs/adr/`

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
