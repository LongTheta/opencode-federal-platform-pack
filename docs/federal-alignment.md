# Federal Alignment

This pack produces outputs aligned to federal compliance frameworks: NIST, FedRAMP, FISMA, and DoD-style controls.

## Frameworks

### NIST 800-53

Security and privacy controls for federal systems. Key control families:

| Family | Description |
|--------|-------------|
| AC | Access Control |
| AU | Audit and Accountability |
| IA | Identification and Authentication |
| SC | System and Communications Protection |
| SI | System and Information Integrity |
| CM | Configuration Management |
| CP | Contingency Planning |
| IR | Incident Response |
| RA | Risk Assessment |
| SA | System and Services Acquisition |

### FedRAMP

Federal Risk and Authorization Management Program. Baseline controls derived from NIST 800-53 with FedRAMP-specific enhancements. Used for cloud service provider authorization.

### FISMA

Federal Information Security Management Act. Emphasizes continuous monitoring, risk management, and security program management.

### DoD

Department of Defense controls (e.g., SRG, STIG). Stricter requirements for defense systems. Often includes additional hardening and audit requirements.

## Output Alignment

The `compliance-reviewer` agent produces reports that:

1. **Map findings to control IDs** — e.g., AC-2, SC-7, SI-3.
2. **Cite evidence** — Specific configs, IaC, or deployment manifests.
3. **Identify gaps** — Missing or weak controls with remediation steps.
4. **Prioritize** — By risk and ATO impact.

## Artifact Coverage

| Artifact | Relevant Controls |
|----------|-------------------|
| IAM/RBAC configs | AC-2, AC-3, IA-2 |
| Audit logging | AU-2, AU-3, AU-6 |
| Encryption (TLS, at-rest) | SC-8, SC-13, SC-28 |
| Network segmentation | SC-7 |
| Secrets management | IA-5, SC-28 |
| SBOM / supply chain | SA-12, SI-7 |
| Configuration management | CM-2, CM-3 |
| Incident response | IR-4, IR-6 |

## Limitations

- This pack **identifies gaps and recommends remediation**; it does not certify compliance.
- ATO and formal assessment require human review and authorized assessor validation.
- Control applicability depends on system boundary and authorization scope.
