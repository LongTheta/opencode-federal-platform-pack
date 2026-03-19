# Terraform IaC Checklist

Use when assessing Terraform for AWS/EKS. Align to DoD Play 2, NIST CM.

---

## 1. State Backend

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 1.1 | Remote backend | backend "s3" or "remote"; not local |
| 1.2 | State encryption | S3 bucket encryption; dynamodb_table for lock |
| 1.3 | Access control | Backend bucket policy; IAM for state access |
| 1.4 | No state in repo | .terraform.tfstate not committed; in .gitignore |

---

## 2. Provider and Module Pinning

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 2.1 | Provider version constraints | required_providers; version = "~> X.Y" |
| 2.2 | .terraform.lock.hcl | Lock file present and committed |
| 2.3 | Module source pinned | ref = "v1.0.0" or tag; no default branch |
| 2.4 | No floating versions | No version = ">= 1.0" without upper bound |

---

## 3. Policy-as-Code

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 3.1 | tfsec or Checkov in pipeline | Pipeline step; fail on critical |
| 3.2 | Config present | .tfsec.yml, .checkov.yml, or equivalent |
| 3.3 | Findings addressed | Critical/high remediated or documented |

---

## 4. Drift and CI/CD

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 4.1 | terraform plan in CI | Plan before apply; plan output reviewed |
| 4.2 | No direct apply | Apply only via pipeline or controlled process |
| 4.3 | Drift detection | Periodic plan; alert on drift |

---

## 5. Secrets and Sensitive Data

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 5.1 | No secrets in .tf | No plaintext passwords, keys |
| 5.2 | No secrets in .tfvars | .tfvars in .gitignore if sensitive |
| 5.3 | Sensitive outputs | output "x" { sensitive = true } |
| 5.4 | External secrets | data "aws_ssm_parameter", aws_secretsmanager |

---

## 6. EKS-Specific

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 6.1 | Private or restricted endpoint | endpoint_public_access = false or restricted_cidrs |
| 6.2 | Node group multi-AZ | subnet_ids across AZs |
| 6.3 | Add-ons versioned | addon version pinned |
| 6.4 | IRSA/OIDC | aws_iam_openid_connect_provider for pod identity |
| 6.5 | Node IAM least privilege | Scoped node role |
| 6.6 | Encryption config | encryption_config for etcd |

---

## 7. Tagging and Governance

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 7.1 | Default tags | default_tags with Environment, Owner, CostCenter |
| 7.2 | Tags on resources | tags block on aws_* resources |
| 7.3 | Cost allocation | Tags suitable for cost allocation |
