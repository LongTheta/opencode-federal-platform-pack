# Azure Platform Review — Examples

Sample findings for repo reviews and architecture discovery.

---

## Identity and Access

**Finding:** App Service uses system-assigned managed identity for Key Vault.  
**Severity:** Low (positive)  
**Evidence observed:** `terraform/app_service.tf` line 28: `identity { type = "SystemAssigned" }`; Key Vault access policy references identity.  
**Missing evidence:** None.  
**Recommended action:** Document identity lifecycle for audit.

---

**Finding:** Service principal with client secret used in pipeline.  
**Severity:** High  
**Evidence observed:** `azure-pipelines.yml` uses `AzureCLI@2` with `$env:ARM_CLIENT_SECRET`.  
**Missing evidence:** OIDC or federated credentials.  
**Recommended action:** Migrate to OIDC with `azure/login` action; remove client secret.

---

## Network Architecture

**Finding:** Storage Account has public network access enabled.  
**Severity:** Medium  
**Evidence observed:** `terraform/storage.tf` line 12: `network_rules { default_action = "Allow" }`.  
**Missing evidence:** Private endpoint or restricted network.  
**Recommended action:** Add `azurerm_private_endpoint`; set `default_action = "Deny"` with allowed subnet.

---

**Finding:** NSG allows 0.0.0.0/0 on port 3389.  
**Severity:** High  
**Evidence observed:** `terraform/nsg.tf` line 8: `source_address_prefix = "*"` for RDP.  
**Missing evidence:** Restriction to bastion or VPN.  
**Recommended action:** Restrict to bastion subnet; prefer Azure Bastion over direct RDP.

---

## Secrets and Key Management

**Finding:** Connection string in App Service app settings.  
**Severity:** High  
**Evidence observed:** `terraform/app_service.tf` line 45: `app_settings = { CONNECTION_STRING = var.db_connection_string }`.  
**Missing evidence:** Key Vault reference (`@Microsoft.KeyVault(...)`).  
**Recommended action:** Store in Key Vault; use `@Microsoft.KeyVault(VaultName=...;SecretName=...)` in app settings.

---

## Tagging

**Finding:** Resource group has tags; child resources inherit inconsistently.  
**Severity:** Low  
**Evidence observed:** `azurerm_resource_group` has tags; some `azurerm_*` resources lack explicit tags.  
**Missing evidence:** Tag inheritance or explicit tags on all resources.  
**Recommended action:** Add `tags = var.tags` to all resources or use provider default tags.

---

## Backup and Resilience

**Finding:** SQL Database has no geo-replication.  
**Severity:** Medium  
**Evidence observed:** `terraform/sql.tf` defines single database; no failover group.  
**Missing evidence:** RPO requirements; secondary region.  
**Recommended action:** Document RPO; if required, add failover group or active geo-replication.

---

## CI/CD and IaC

**Finding:** Bicep deployed via Azure DevOps; no Terraform.  
**Severity:** Low  
**Evidence observed:** `bicep/` directory; `azure-pipelines.yml` runs `az deployment group create`.  
**Missing evidence:** Drift detection; plan/preview in PR.  
**Recommended action:** Add `what-if` to pipeline; consider Terraform for multi-cloud or state management.

---

## Questions a Solution Architect Should Ask (Sample)

- "What happens if East US fails? Do we have a secondary region?"
- "How does the pipeline authenticate to Azure? OIDC or client secret?"
- "Where is the SQL connection string? Key Vault or app settings?"
- "Do we have private endpoints for Storage and Key Vault?"
- "What is our backup retention? Has restore been tested?"

---

## Evidence to Request or Look For (Sample)

- `terraform/` or `bicep/` with `.tf` or `.bicep` files
- `azurerm_user_assigned_identity`, `identity` blocks
- `azurerm_virtual_network`, `azurerm_subnet`, `azurerm_network_security_group`
- `azurerm_key_vault`, `azurerm_key_vault_access_policy`
- `azurerm_log_analytics_workspace`, `azurerm_monitor_diagnostic_setting`
- `tags` block on `azurerm_*` resources
- `.github/workflows/` or `azure-pipelines.yml` with `azure/login` or `AzureCLI`
