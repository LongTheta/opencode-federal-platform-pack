# AWS Platform Review Checklist

Use for repo reviews and architecture discovery. Assess each domain and document evidence or gaps.

---

## 1. Identity and Access

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 1.1 | IAM roles (not users) for workloads | `aws_iam_role`, `aws_iam_role_policy` |
| 1.2 | Least privilege (no `*` in policies) | Policy documents, condition keys |
| 1.3 | OIDC for CI/CD (GitHub, GitLab) | `oidc_provider`, `AssumeRoleWithWebIdentity` |
| 1.4 | No long-lived access keys in code | No `AWS_ACCESS_KEY_ID` in config |
| 1.5 | MFA for console access (if applicable) | IAM policy conditions |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 2. Network Architecture

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 2.1 | VPC with public/private subnet separation | `aws_vpc`, `aws_subnet`, `map_public_ip` |
| 2.2 | Security groups restrict by need | `aws_security_group`, ingress/egress rules |
| 2.3 | NACLs where defense-in-depth needed | `aws_network_acl` |
| 2.4 | VPC endpoints for AWS services (no internet) | `aws_vpc_endpoint` for S3, ECR, etc. |
| 2.5 | No 0.0.0.0/0 in production security groups | Ingress rules |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 3. Workload Isolation

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 3.1 | EKS: namespaces, network policies | `kubernetes_*`, NetworkPolicy |
| 3.2 | Lambda: VPC config for DB/private access | `vpc_config` in Lambda |
| 3.3 | Multi-AZ for RDS, EKS, ALB | `multi_az`, `subnet_ids` across AZs |
| 3.4 | Environment separation (dev/stage/prod) | Separate accounts or VPCs, tags |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 4. Secrets and Key Management

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 4.1 | Secrets Manager or Parameter Store (not env) | `aws_secretsmanager_secret`, `ssm_parameter` |
| 4.2 | KMS for encryption keys | `aws_kms_key`, `kms_key_id` on resources |
| 4.3 | No plaintext secrets in code/config | Grep for keys, passwords |
| 4.4 | IAM roles for secret access (no keys) | `secretsmanager:GetSecretValue` in role |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 5. Logging and Monitoring

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 5.1 | CloudWatch log groups | `aws_cloudwatch_log_group` |
| 5.2 | Log retention set | `retention_in_days` |
| 5.3 | CloudWatch alarms | `aws_cloudwatch_metric_alarm` |
| 5.4 | VPC Flow Logs | `aws_flow_log` |
| 5.5 | GuardDuty, Config (optional) | Config rules, detector |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 6. Tagging and Metadata Governance

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 6.1 | Tags on all billable resources | `tags` block: Environment, Owner, CostCenter |
| 6.2 | Consistent tag keys | `terraform.tfvars`, `variables.tf` |
| 6.3 | Cost allocation tags enabled | Billing config (if in repo) |
| 6.4 | No untagged production resources | Audit of `aws_*` resources |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 7. Cost-Awareness

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 7.1 | Right-sized instances | Instance types, no over-provisioning |
| 7.2 | Reserved capacity or Savings Plans (if applicable) | Billing docs, not always in IaC |
| 7.3 | S3 lifecycle, Glacier for cold data | `lifecycle_rule` |
| 7.4 | Cost alerts or budgets | `aws_budgets_budget` (if in repo) |
| 7.5 | Spot for non-critical workloads | `capacity_type = SPOT` for EKS |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 8. Backup, Resilience, and DR

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 8.1 | RDS automated backups | `backup_retention_period`, `backup_window` |
| 8.2 | S3 versioning for critical buckets | `versioning { enabled = true }` |
| 8.3 | Cross-region replication (if DR required) | `replication_configuration` |
| 8.4 | RTO/RPO documented | docs/, runbooks |
| 8.5 | Restore tested | Runbook, drill documentation |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 9. CI/CD and IaC Alignment

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 9.1 | Terraform/CloudFormation/CDK in repo | `*.tf`, `*.yaml`, `cdk.json` |
| 9.2 | Terraform plan in CI | `.github/workflows/`, `plan` step |
| 9.3 | OIDC for pipeline (no keys) | `oidc` in workflow |
| 9.4 | Pinned image digests (no `:latest`) | ECR references, `image_digest` |
| 9.5 | Environment promotion controls | Manual approval for prod |

**Evidence observed:** _________________  
**Missing evidence:** _________________

---

## 10. Policy Guardrails

| # | Criterion | Evidence to Look For |
|---|-----------|---------------------|
| 10.1 | AWS Config rules | `aws_config_config_rule` |
| 10.2 | SCPs or org policies (if applicable) | Org config, not always in app repo |
| 10.3 | OPA, Checkov, or tfsec in CI | Pipeline config |
| 10.4 | Required tags enforced | Config rule or policy |

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
