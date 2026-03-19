---
name: aws-platform-review
description: AWS platform and repository review for identity, network, workload isolation, secrets, observability, tagging, cost, resilience, CI/CD, policy, and documentation. Use for repo reviews and architecture discovery.
risk_tier: 0
---

# AWS Platform Review Skill

Assesses AWS-based platforms and repositories for production readiness and operational excellence. Aligned with AWS Well-Architected Framework pillars. Practical for repo reviews and solution architect discovery sessions.

## When to Use

- Reviewing repositories with AWS IaC (Terraform, CloudFormation, CDK)
- Architecture discovery for AWS workloads
- Pre-production or pre-migration assessment
- Due diligence for EKS, Lambda, RDS, or other AWS services

## Evaluation Domains

| Domain | What to Assess |
|--------|----------------|
| Identity and access | IAM roles, policies, OIDC, least privilege |
| Network architecture | VPC, subnets, security groups, NACLs, endpoints |
| Workload isolation | EKS namespaces, Lambda VPC, multi-AZ |
| Secrets and key management | Secrets Manager, KMS, Parameter Store, no plaintext |
| Logging and monitoring | CloudWatch, X-Ray, GuardDuty, Config |
| Tagging and metadata governance | Resource tags, cost allocation, compliance tags |
| Cost-awareness | Reserved capacity, right-sizing, Cost Explorer usage |
| Backup, resilience, DR | RDS backups, S3 versioning, cross-region, RTO/RPO |
| CI/CD and IaC alignment | CodePipeline, CodeBuild, Terraform, drift |
| Policy guardrails | AWS Config, OPA, Service Control Policies |
| Documentation maturity | README, runbooks, architecture docs |

## Workflow

1. **Gather artifacts** — Terraform, CloudFormation, CDK, pipelines, configs.
2. **Evaluate each domain** — Use `checklist.md` for criteria.
3. **Document evidence** — What was observed; what was not found.
4. **Assess readiness** — Per domain and overall.
5. **Produce report** — Use `output-template.md`.

## Questions a Solution Architect Should Ask

**Resilience and blast radius**
- What is the blast radius of a single AZ failure? Multi-AZ or multi-region?
- Are RDS, EKS, and ALB multi-AZ? What happens if us-east-1a fails?
- What is the RTO/RPO? Has backup restore been tested?

**Identity and access**
- How are IAM roles scoped? Any `*` in policies?
- Who can assume the deploy role? Is it scoped to the repo?
- OIDC for GitHub Actions/GitLab? No long-lived access keys?

**Secrets and data**
- Where do secrets live? Secrets Manager, Parameter Store, or env vars?
- Where is the RDS master password? KMS keys for encryption?

**Network**
- What is the network segmentation? Public vs. private subnets?
- VPC endpoints for S3, ECR, SSM? Any 0.0.0.0/0 in production?
- Do we have VPC Flow Logs? Where do they go?

**Cost and governance**
- How is cost allocated? Tags on all billable resources?
- Cost alerts or budgets? Right-sizing signals?

**CI/CD and drift**
- How does CI/CD deploy? Terraform plan in CI?
- Is there drift detection? AWS Config rules?
- Pinned image digests? No `:latest` in prod?

## Evidence to Request or Look For

**IaC and structure**
- Terraform/CloudFormation/CDK in `terraform/`, `cloudformation/`, `cdk/`
- `*.tf`, `*.yaml`, `cdk.json`

**Identity**
- `aws_iam_role`, `aws_iam_role_policy`, `aws_iam_policy`
- `oidc_provider`, `AssumeRoleWithWebIdentity` in trust policy

**Network**
- `aws_vpc`, `aws_subnet`, `aws_security_group`, `aws_network_acl`
- `aws_vpc_endpoint` for S3, ECR, SSM, etc.
- `aws_flow_log`

**Workloads**
- EKS: `aws_eks_cluster`, `aws_eks_node_group`, `kubernetes_*`
- Lambda: `aws_lambda_function`, `vpc_config`
- RDS: `aws_db_instance`, `multi_az`, `backup_retention_period`

**Secrets**
- `aws_secretsmanager_secret`, `aws_ssm_parameter`
- `aws_kms_key`, `kms_key_id` on resources
- No `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` in config

**Observability**
- `aws_cloudwatch_log_group`, `retention_in_days`
- `aws_cloudwatch_metric_alarm`
- GuardDuty, Config (if present)

**Governance**
- `tags` block on `aws_*` resources: Environment, Owner, CostCenter
- `aws_budgets_budget` (if in repo)
- `aws_config_config_rule`, OPA/Checkov in pipeline

**CI/CD**
- `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`
- `terraform plan` step, OIDC auth
- ECR references with digest, not `:latest`

**Documentation**
- `README.md`, `docs/`, `docs/runbooks/`, `docs/adr/`

## Output Format

See `output-template.md`. Required: executive summary, findings by domain, severity, evidence observed, missing evidence, recommended actions, readiness score.

## Principles

- **Evidence-first** — Cite specific files, resources, or configs.
- **AWS-native** — Use AWS terminology (VPC, IAM, CloudWatch, etc.).
- **Actionable** — Recommendations include concrete steps.

## References

- `checklist.md` — Evaluation criteria per domain
- `examples.md` — Sample findings
- `output-template.md` — Report structure
