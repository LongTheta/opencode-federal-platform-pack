# Azure Platform Review Checklist

Use for repo reviews and architecture discovery. Assess each domain and document evidence or gaps.

---

## 1. Identity and Access

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 1.1 | Managed identities (not service principals with secrets) | `azurerm_user_assigned_identity`, `identity { type = "SystemAssigned" }` |
| 1.2 | RBAC with least privilege | `azurerm_role_assignment`, custom role definitions |
| 1.3 | OIDC/federated credentials for CI/CD | GitHub OIDC, `azure.workload_identity` |
| 1.4 | No client secrets in code/config | No `client_secret` in variables |
| 1.5 | Entra ID conditional access (if applicable) | Docs; not always in app repo |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 2. Network Architecture

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 2.1 | VNet with subnet separation | `azurerm_virtual_network`, `azurerm_subnet` |
| 2.2 | NSGs restrict by need | `azurerm_network_security_group`, rules |
| 2.3 | Private endpoints for PaaS | `azurerm_private_endpoint` for Storage, Key Vault, etc. |
| 2.4 | No 0.0.0.0/0 in NSG rules (production) | `source_address_prefix`, `destination_address_prefix` |
| 2.5 | VNet integration for App Service/Functions | `azurerm_app_service_virtual_network_swift_connection` |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 3. Workload Isolation

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 3.1 | AKS: namespaces, network policies | `kubernetes_*`, NetworkPolicy |
| 3.2 | App Service: separate plans per env | `azurerm_app_service_plan` per environment |
| 3.3 | Availability zones or multi-region | `zones`, `availability_zones`, geo-redundancy |
| 3.4 | Environment separation (dev/stage/prod) | Separate resource groups, tags |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 4. Secrets and Key Management

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 4.1 | Key Vault for secrets | `azurerm_key_vault`, `azurerm_key_vault_secret` |
| 4.2 | Managed identity for Key Vault access | `azurerm_key_vault_access_policy` with `object_id` of MI |
| 4.3 | No plaintext secrets in code/config | Grep for connection strings, keys |
| 4.4 | Key Vault firewall (private endpoint) | `network_acls`, `azurerm_private_endpoint` |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 5. Logging and Monitoring

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 5.1 | Log Analytics workspace | `azurerm_log_analytics_workspace` |
| 5.2 | Diagnostic settings on resources | `azurerm_monitor_diagnostic_setting` |
| 5.3 | Application Insights | `azurerm_application_insights` |
| 5.4 | Alert rules | `azurerm_monitor_metric_alert`, `azurerm_monitor_activity_log_alert` |
| 5.5 | Retention configured | `retention_in_days` on workspace |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 6. Tagging and Metadata Governance

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 6.1 | Tags on all billable resources | `tags` block: Environment, Owner, CostCenter |
| 6.2 | Consistent tag keys | `variables.tf`, `terraform.tfvars` |
| 6.3 | Resource group naming convention | `azurerm_resource_group` name pattern |
| 6.4 | No untagged production resources | Audit of `azurerm_*` resources |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 7. Cost-Awareness

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 7.1 | Right-sized SKUs | App Service plan tier, VM size |
| 7.2 | Reservations (if applicable) | Billing docs; not always in IaC |
| 7.3 | Storage tiering (cool, archive) | `access_tier` on Storage Account |
| 7.4 | Budget alerts | `azurerm_consumption_budget` (if in repo) |
| 7.5 | Spot/low-priority for non-critical | AKS `priority = "Spot"` |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 8. Backup, Resilience, and DR

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 8.1 | Recovery Services vault | `azurerm_recovery_services_vault` |
| 8.2 | SQL Database geo-replication | `create_mode = "Replication"` or failover group |
| 8.3 | Storage Account geo-redundancy | `account_replication_type = "GRS"` |
| 8.4 | RTO/RPO documented | docs/, runbooks |
| 8.5 | Restore tested | Runbook, drill documentation |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 9. CI/CD and IaC Alignment

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 9.1 | Terraform/Bicep/ARM in repo | `*.tf`, `*.bicep`, `*.json` (ARM) |
| 9.2 | Terraform plan in CI | `.github/workflows/`, `plan` step |
| 9.3 | OIDC or federated creds for pipeline | `azure/login` with OIDC |
| 9.4 | Pinned image digests (no `:latest`) | ACR references, `image_digest` |
| 9.5 | Environment promotion controls | Manual approval for prod |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 10. Policy Guardrails

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 10.1 | Azure Policy definitions/assignments | `azurerm_policy_definition`, `azurerm_resource_policy_assignment` |
| 10.2 | Required tags policy | Policy with `tags` effect |
| 10.3 | OPA, Checkov, or Bicep lint in CI | Pipeline config |
| 10.4 | Allowed locations, SKUs | Policy constraints |

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

## Readiness Score (Per Domain)

| Domain | Score (1–5) | Notes |
|--------|-------------|-------|
| Identity and access | | |
| Network architecture | | |
| Workload isolation | | |
| Secrets and key management | | |
| Logging and monitoring | | |
| Tagging and metadata governance | | |
| Cost-awareness | | |
| Backup, resilience, DR | | |
| CI/CD and IaC alignment | | |
| Policy guardrails | | |
| Documentation maturity | | |
| **Overall** | | |
