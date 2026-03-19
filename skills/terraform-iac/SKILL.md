---
name: terraform-iac
description: Terraform IaC assessment for AWS and EKS. Evaluates state backend security, provider/module pinning, policy-as-code (tfsec, Checkov), drift detection, EKS-specific patterns, and no secrets in code. Aligned to DoD Play 2 (IaC), NIST CM. Use for repo-assess, federal-checklist, gitops-audit when Terraform is present.
risk_tier: 1
---

# Terraform IaC Skill

Assesses Terraform-based infrastructure for AWS and EKS. Focus on state security, pinning, policy enforcement, drift detection, and EKS-specific patterns. **Aligned to:** DoD Enterprise DevSecOps Play 2 (Adopt Infrastructure as Code), NIST 800-53 CM (Configuration Management), federal IaC quality expectations.

---

## When to Use

- Repos with Terraform for AWS or EKS
- Repo assessment (IaC security and quality)
- Federal checklist (IaC domain)
- GitOps audit (config-as-code capability)

---

## Evaluation Domains

| Domain | What to Assess | Evidence |
|--------|----------------|----------|
| **State backend** | Remote backend; encryption; access control; no local state in prod | backend "s3" or "remote"; dynamodb_table; encryption |
| **Provider pinning** | Required version constraints; no unconstrained providers | required_providers; version = "~> X.Y" |
| **Module pinning** | Module source with version or ref; no floating refs | source = "..." ref = "v1.0.0" or tag |
| **Policy-as-code** | tfsec, Checkov, or conftest in pipeline; fail on critical | Pipeline config; .tfsec.yml, .checkov.yml |
| **Drift detection** | terraform plan in CI; no apply without plan | Pipeline: plan before apply |
| **Secrets** | No secrets in .tf, .tfvars, or outputs; use SSM/Secrets Manager | No sensitive = false on secrets; no plaintext |
| **EKS-specific** | Node group config; add-ons; security groups; private endpoint | aws_eks_cluster, aws_eks_node_group; endpoint_public_access |
| **Tagging** | Environment, Owner, CostCenter on billable resources | tags block; default_tags |

---

## Workflow

1. **Gather artifacts** — `*.tf`, `*.tfvars`, `backend` config, pipeline, `.terraform.lock.hcl`.
2. **Evaluate each domain** — Use `checklist.md` for criteria.
3. **Document evidence** — What was observed; what was not found.
4. **Assess readiness** — Per domain; severity for gaps.
5. **Produce findings** — Include in repo-assess, federal-checklist, or gitops-audit output.

---

## EKS-Specific Checklist

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| E1 | Cluster endpoint | endpoint_public_access = false for private; or restricted CIDR |
| E2 | Node group scaling | desired_size, min_size, max_size; multi-AZ |
| E3 | Add-ons | vpc-cni, coredns, kube-proxy; version pinned |
| E4 | OIDC for IRSA | aws_iam_openid_connect_provider; cluster OIDC |
| E5 | Node IAM | Least privilege; no broad node role |
| E6 | Security groups | Restrictive; no 0.0.0.0/0 on node SG |
| E7 | Encryption | encryption_config for etcd |

---

## Mandatory Rules

- **REQUIRED:** Every finding cites observable evidence or states "Evidence not found."
- **REQUIRED:** Map to NIST CM, DoD Play 2 where applicable.
- **REQUIRED:** Reference aws-platform-review for broader AWS/EKS assessment.
- **FORBIDDEN:** Claim compliance; use "readiness," "gap," "partial."

---

## References

- [DoD Enterprise DevSecOps 2.0 Playbook](https://dl.dod.cyber.mil/wp-content/uploads/devsecops/pdf/DoD-Enterprise-DevSecOps-2.0-Playbook.pdf) — Play 2 (IaC)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Terraform EKS Module](https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest)
- `skills/aws-platform-review/` — AWS and EKS platform review
- `contexts/federal-compliance-criteria.md` — DoD Play 2 mapping
