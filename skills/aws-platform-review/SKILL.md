---
name: aws-platform-review
description: AWS platform and repository review for identity, network, workload isolation, secrets, observability, tagging, cost, resilience, CI/CD, policy, and documentation. Use for repo reviews and architecture discovery.
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

- What is the blast radius of a single AZ failure? Multi-AZ or multi-region?
- How are IAM roles scoped? Any `*` in policies?
- Where do secrets live? Secrets Manager, Parameter Store, or env vars?
- What is the network segmentation? Public vs. private subnets? VPC endpoints?
- How is cost allocated? Tags on all billable resources?
- What is the RTO/RPO? Backup and restore tested?
- How does CI/CD deploy? OIDC for GitHub Actions? No long-lived keys?
- Is there drift detection? Terraform plan in CI? Config rules?

## Evidence to Request or Look For

- Terraform/CloudFormation/CDK in `terraform/`, `cloudformation/`, `cdk/`
- IAM role definitions, policy documents
- VPC, subnet, security group configs
- EKS node groups, Lambda configs, RDS instances
- Secrets Manager or Parameter Store references (not values)
- CloudWatch log groups, metric filters, alarms
- Cost allocation tags in IaC
- Backup config (RDS automated backups, S3 versioning)
- `.github/workflows/` or equivalent for CI/CD
- AWS Config rules, SCPs, or OPA policies
- `docs/`, `README.md`, runbooks

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
