# Sample Federal Compliance Report

## Executive Summary

The system has partial alignment with NIST 800-53. Key gaps: audit logging retention, secrets management, and supply-chain attestation. **Critical gaps** must be addressed before ATO submission.

## Control Mapping

| Control ID | Status | Evidence | Gap |
|------------|--------|----------|-----|
| AC-2 | Partial | IAM roles in Terraform | No automated account review process |
| AU-2 | Gap | No centralized audit config | Audit events not defined or retained |
| IA-2 | Partial | OIDC in EKS | MFA not enforced for all access paths |
| SC-7 | Partial | VPC in Terraform | No explicit boundary documentation |
| SI-3 | Gap | No malware protection config | No EDR or equivalent |
| CM-3 | Partial | GitOps with Argo CD | Change control exists; approval workflow unclear |

## Findings

| ID | Severity | Control | Evidence | Remediation |
|----|----------|---------|----------|-------------|
| F-1 | High | AU-2 | No audit config in `terraform/` or `k8s/` | Define auditable events; configure retention |
| F-2 | High | IA-5 | Secrets in env vars (`config/settings.py`) | Implement Vault or External Secrets Operator |
| F-3 | Medium | SA-12 | No SBOM in pipeline | Add Syft or equivalent; publish SBOM |
| F-4 | Medium | SC-28 | No at-rest encryption config | Enable encryption for RDS, S3 |

## Remediation Roadmap

1. **Phase 1 (Pre-ATO)** — F-1, F-2
2. **Phase 2 (ATO support)** — F-3, F-4
3. **Phase 3 (Continuous monitoring)** — Automated control verification
