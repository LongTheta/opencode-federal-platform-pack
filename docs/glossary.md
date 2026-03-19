# Glossary

Terms used in the OpenCode Federal Platform Pack and federal compliance context.

---

## Federal frameworks

| Term | Definition |
|------|------------|
| **FedRAMP** | Federal Risk and Authorization Management Program. Standardized approach for security assessment, authorization, and continuous monitoring of cloud services. |
| **FISMA** | Federal Information Security Management Act. Establishes a framework for securing federal information systems. |
| **NIST 800-53** | Security and Privacy Controls for Information Systems and Organizations. Catalog of controls used for FedRAMP and FISMA. |
| **NIST 800-37** | Risk Management Framework (RMF) for Information Systems and Organizations. Six-step process: Categorize, Select, Implement, Assess, Authorize, Monitor. |
| **NIST 800-207** | Zero Trust Architecture. DoD and federal agencies use this for Zero Trust design. |
| **DoD Zero Trust Strategy** | Department of Defense strategy for implementing Zero Trust across DoD systems. |
| **DoD Enterprise DevSecOps Fundamentals** | DoD guidance for DevSecOps practices in defense systems. |

---

## Control families (NIST 800-53)

| Family | Name |
|--------|------|
| **AC** | Access Control |
| **AU** | Audit and Accountability |
| **IA** | Identification and Authentication |
| **CM** | Configuration Management |
| **SA** | System and Services Acquisition |
| **SC** | System and Communications Protection |
| **SI** | System and Information Integrity |

---

## RMF steps (NIST 800-37)

| Step | Description |
|------|-------------|
| **Categorize** | Classify system per FIPS 199 / NIST 800-60 |
| **Select** | Choose controls from 800-53 based on baseline |
| **Implement** | Apply controls and document |
| **Assess** | Evaluate controls per 800-53A |
| **Authorize** | Authorizing official grants ATO |
| **Monitor** | Continuous monitoring (ConMon) |

---

## Pack-specific terms

| Term | Definition |
|------|-------------|
| **Evidence extractor** | Script that scans a repo for configs, manifests, CI/CD, and IaC to support compliance review. |
| **Federal control mapper** | Script that maps repo artifacts to NIST 800-53 control families and reports gaps. |
| **Review score** | Weighted architecture score (0–10) across security, reliability, performance, cost, and operational excellence. |
| **Compliance report** | Output schema for federal compliance review (FedRAMP, FISMA, control mapping, findings, remediation). |
| **Quality gate** | Schema for pass/fail criteria in CI/CD (e.g., minimum score, no critical findings). |
