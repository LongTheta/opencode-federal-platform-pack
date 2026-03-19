# AWS Platform Review — Examples

Sample findings for repo reviews and architecture discovery.

---

## Identity and Access

**Finding:** IAM policy uses `"Resource": "*"` for S3.  
**Severity:** Medium  
**Evidence observed:** `terraform/iam.tf` line 23: `resource "aws_iam_role_policy"` with `s3:*` on `*`.  
**Missing evidence:** Scoped bucket ARN.  
**Recommended action:** Restrict to specific bucket(s): `arn:aws:s3:::my-bucket/*`.

---

**Finding:** GitHub Actions uses OIDC for AWS auth.  
**Severity:** Low (positive)  
**Evidence observed:** `.github/workflows/deploy.yml` uses `id-token: write` and `aws-actions/configure-aws-credentials@v2` with `role-to-assume`.  
**Missing evidence:** None.  
**Recommended action:** Document role trust policy for audit.

---

## Network Architecture

**Finding:** Security group allows 0.0.0.0/0 on port 22.  
**Severity:** High  
**Evidence observed:** `terraform/security_groups.tf` line 15: `cidr_blocks = ["0.0.0.0/0"]` for SSH.  
**Missing evidence:** Restriction to bastion or VPN CIDR.  
**Recommended action:** Restrict to bastion IP or use SSM Session Manager.

---

**Finding:** VPC endpoints for S3 and ECR reduce internet egress.  
**Severity:** Low (positive)  
**Evidence observed:** `terraform/vpc.tf` defines `aws_vpc_endpoint` for `s3` and `ecr.api`.  
**Missing evidence:** None.  
**Recommended action:** Consider ECR DKR endpoint if pulling images from private subnet.

---

## Secrets and Key Management

**Finding:** Database URL in Lambda environment variables.  
**Severity:** High  
**Evidence observed:** `terraform/lambda.tf` line 42: `environment { variables = { DATABASE_URL = var.db_url } }`.  
**Missing evidence:** Secrets Manager or Parameter Store reference.  
**Recommended action:** Store in Secrets Manager; reference via `aws_secretsmanager_secret_version`.

---

## Tagging

**Finding:** EC2 instances lack CostCenter tag.  
**Severity:** Medium  
**Evidence observed:** `terraform/ec2.tf` tags block has `Environment`, `Owner`; no `CostCenter`.  
**Missing evidence:** Cost allocation capability.  
**Recommended action:** Add `CostCenter` tag per org standard.

---

## Backup and Resilience

**Finding:** RDS backup retention is 1 day.  
**Severity:** Medium  
**Evidence observed:** `terraform/rds.tf` line 18: `backup_retention_period = 1`.  
**Missing evidence:** RPO requirements; cross-region copy.  
**Recommended action:** Increase to 7+ days; document RPO. Consider RDS snapshot copy to secondary region.

---

## CI/CD and IaC

**Finding:** Terraform plan runs but does not block merge on drift.  
**Severity:** Low  
**Evidence observed:** `.github/workflows/terraform.yml` runs `plan`; no `apply` or drift gate.  
**Missing evidence:** Drift detection in CI; automated remediation.  
**Recommended action:** Add plan output to PR; consider Atlantis or Terraform Cloud for apply workflow.

---

## Questions a Solution Architect Should Ask (Sample)

- "What happens if us-east-1a fails? Are RDS and EKS multi-AZ?"
- "Who can assume the deploy role? Is it scoped to the repo?"
- "Where is the RDS master password? Secrets Manager or Parameter Store?"
- "Do we have VPC Flow Logs? Where do they go?"
- "What is our RTO? Has restore been tested?"

---

## Evidence to Request or Look For (Sample)

- `terraform/` or `infra/` with `.tf` files
- `aws_iam_role`, `aws_iam_role_policy` definitions
- `aws_vpc`, `aws_subnet`, `aws_security_group`
- `aws_secretsmanager_secret` or `aws_ssm_parameter`
- `aws_cloudwatch_log_group`, `retention_in_days`
- `tags` block on `aws_*` resources
- `.github/workflows/` with `terraform plan` or `aws-actions`
