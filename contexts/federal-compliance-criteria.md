# Federal Compliance Criteria Reference

Use when performing federal-aligned review. This pack assesses readiness against FedRAMP, FISMA, NIST 800 series, **DoD Zero Trust Strategy**, and **DoD Enterprise DevSecOps Fundamentals** where appropriate. **Do not claim compliance or certification.**

---

## DoD Zero Trust Strategy

**Reference:** [DoD Zero Trust Strategy](https://dodcio.defense.gov/Portals/0/Documents/Library/DoD-ZTStrategy.pdf) — Department of Defense Zero Trust Strategy and Roadmap.

**Target:** FY 2027 for DoD components.

**Four strategic goals:**
- Zero Trust cultural adoption
- DoD information systems secured and defended
- Technology acceleration
- Zero Trust enablement

**Seven pillars** (assess where observable in repo):

| # | Pillar | What to Assess |
|---|--------|----------------|
| 1 | **User** | Identity verification; MFA; least privilege; user posture |
| 2 | **Device** | Device posture; compliance; trusted devices |
| 3 | **Network and environment** | Micro-segmentation; deny by default; network isolation |
| 4 | **Data** | Encryption; access controls; data classification |
| 5 | **Application and workload** | App-level auth; workload identity; container security |
| 6 | **Visibility and analytics** | Logging; correlation; alerting; SIEM; dashboards |
| 7 | **Automation and orchestration** | SOAR; policy orchestration; dynamic security responses; incident response automation; AI/ML for automation |

**Pack alignment:** Map findings to all 7 pillars. Include pillar 7 (Automation and orchestration) — evidence: pipeline automation, policy-as-code, runbooks, SOAR/IR automation, CI/CD security gates.

---

## DoD Enterprise DevSecOps Fundamentals

**Central portal:** [cyber.mil/devsecops/](https://www.cyber.mil/devsecops/) — DoD DevSecOps hub for playbooks, reference designs, and guidance.

| Resource | Link |
|----------|------|
| **DevSecOps Fundamentals v2.5** | [DoD Enterprise DevSecOps Fundamentals v2.5](https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Fundamentals%20v2.5.pdf) |
| **DevSecOps 2.0 Playbook** (10 plays) | [DoD Enterprise DevSecOps 2.0 Playbook](https://dl.dod.cyber.mil/wp-content/uploads/devsecops/pdf/DoD-Enterprise-DevSecOps-2.0-Playbook.pdf) |
| **Reference Design** | [DoD Enterprise DevSecOps Reference Design](https://dodcio.defense.gov/Portals/0/Documents/Library/DoDRefDesignCloudGithub.pdf) |
| **Software DT&E in DevSecOps Guidebook** | [Software DT&E in DevSecOps Guidebook (Jan 2025)](https://www.cto.mil/wp-content/uploads/2025/01/Software_DTE_DEVSECOPS_GB_Jan2025_Signed.pdf) — OUSD(R&E)/DTE&A; DT&E planning, execution, and analysis across DevSecOps phases (Plan, Develop/Build, Test/Release, Deliver, Deploy, Operate/Monitor/Feedback); unit testing, SAST, DAST, IAST, SCA, SBOM monitoring, threat modeling, MBCRA, compliance verification; integrates with DoD DevSecOps Fundamentals. |

**Key components to assess:**
- **Agile principles and psychological safety** — Iterative delivery; team collaboration
- **Software supply chain** — SBOM; provenance; pinned deps; vulnerability scanning; signed artifacts
- **DevSecOps lifecycle** — Cybersecurity testing at each phase (not just at end)
- **Zero Trust in DevSecOps** — Identity-based access; least privilege; segmentation in pipelines
- **Behavior monitoring** — Continuous monitoring; anomaly detection; observability
- **Pipeline structure** — Meaningful DevSecOps pipeline; security gates; automation

**DT&E alignment:** The [Software DT&E in DevSecOps Guidebook](https://www.cto.mil/wp-content/uploads/2025/01/Software_DTE_DEVSECOPS_GB_Jan2025_Signed.pdf) (OUSD(R&E)/DTE&A, Jan 2025) describes how developmental test and evaluation must adapt to DevSecOps: definition of done, software test plans, threat modeling, MBCRA, unit testing, SAST/DAST/IAST, SCA, SBOM monitoring, compliance verification. Use when assessing test strategy, pipeline test coverage, or control-gate decisions.

**Pack alignment:** GitOps-capability-audit, federal-platform-review, and nist-compliance-evaluator assess pipeline maturity, supply chain, and security-at-each-phase. Map findings to DoD DevSecOps expectations. Recommend [cyber.mil/devsecops/](https://www.cyber.mil/devsecops/) for remediation guidance and playbooks.

### DoD DevSecOps 2.0 Playbook — 10 Plays (Capability Mapping)

When citing findings, reference the relevant Playbook play(s) for remediation. [Playbook PDF](https://dl.dod.cyber.mil/wp-content/uploads/devsecops/pdf/DoD-Enterprise-DevSecOps-2.0-Playbook.pdf)

| Play | Title | Pack Skills / Domains |
|------|-------|------------------------|
| 1 | Adopt a DevSecOps Culture | federal-platform-review (architecture, documentation) |
| 2 | Adopt Infrastructure as Code | gitops-capability-audit (GitOps, config-as-code), nist-compliance-evaluator (Config & Drift), federal-platform-review (IaC) |
| 3 | Adopt Containerized Microservices | nist-compliance-evaluator (Container & Workload) |
| 4 | Adopt a Capability Model, not a Maturity Model | federal-platform-review (evidence quality) |
| 5 | Drive Continuous Improvement through Key Capabilities | federal-platform-review (evidence, traceability) |
| 6 | Establish a Software Factory | gitops-capability-audit (CI/CD, promotion), federal-platform-review (architecture, environment separation) |
| 7 | Define a Meaningful DevSecOps Pipeline | gitops-capability-audit (all 7 capabilities), nist-compliance-evaluator (Automation & Orchestration), federal-platform-review (CI/CD, supply chain) |
| 8 | Adapt an Agile Acquisition Policy for Software | (org/process — not directly assessable from repo) |
| 9 | Tirelessly Pursue Cyber Resilience | gitops-capability-audit (observability, identity), nist-compliance-evaluator (IR, AU, SI), federal-platform-review (logging, IAM) |
| 10 | Shift Operational Test and Evaluation | nist-compliance-evaluator (Incident Response, Automation) |

**Rule:** When a finding relates to a domain above, include the Playbook play number in remediation (e.g., "See Play 7 — Define a Meaningful DevSecOps Pipeline").

---

## FedRAMP

**Federal Risk and Authorization Management Program** — Authorization framework for cloud services used by federal agencies.

| Baseline | Control Count (approx) | Typical Use |
|----------|------------------------|-------------|
| Low | ~125 controls | Public-facing, low-impact systems |
| Moderate | ~325 controls | Most federal workloads; PII, CUI |
| High | ~421 controls | National security systems, high-impact |

**Key expectations:**
- NIST SP 800-53 controls implemented and documented
- Continuous monitoring (ConMon) after authorization
- Third-party assessment organization (3PAO) for authorization
- System Security Plan (SSP), Policies and Procedures (P&P)

**Pack alignment:** Map findings to FedRAMP baseline controls; estimate readiness (Low/Moderate/High); identify gaps for SSP and assessor verification.

---

## FISMA

**Federal Information Security Management Act** — Requires agencies to implement information security programs using NIST standards.

**Key components:**
- **NIST SP 800-37** — Risk Management Framework (RMF): Categorize → Select → Implement → Assess → Authorize → Monitor
- **NIST SP 800-53** — Security and privacy controls
- **NIST SP 800-53A** — Assessment procedures
- **NIST SP 800-39** — Risk management
- **NIST SP 800-60** — Mapping information types to security categories (FIPS 199)

**Pack alignment:** Map controls to RMF steps; identify gaps in categorization, control selection, implementation evidence, and continuous monitoring.

---

## NIST SP 800 Series (Primary References)

| Standard | Purpose |
|----------|---------|
| **800-53 Rev 5** | Security and privacy controls — AC, AU, IA, SC, SI, CM, CP, IR, SA, PL, PM, etc. |
| **800-53A** | Assessment procedures for each control |
| **800-37** | Risk Management Framework (RMF) |
| **800-39** | Risk management |
| **800-60** | Information type → security category mapping |
| **800-171** | Protecting CUI in nonfederal systems |
| **800-207** | Zero Trust Architecture |
| **800-190** | Application Container Security |

### NIST 800-53 Control Families (Reference)

| ID | Family |
|----|--------|
| AC | Access Control |
| AU | Audit and Accountability |
| IA | Identification and Authentication |
| SC | System and Communications Protection |
| SI | System and Information Integrity |
| CM | Configuration Management |
| CP | Contingency Planning |
| IR | Incident Response |
| SA | System and Services Acquisition |
| PL | Planning |
| PM | Program Management |
| PS | Personnel Security |
| PE | Physical and Environmental Protection |
| AT | Awareness and Training |
| CA | Assessment, Authorization, and Monitoring |

---

## Pack Output Requirements

- **Control mapping** — Map observable artifacts to NIST control IDs (e.g., AC-2, SC-7, IA-5)
- **DoD Zero Trust** — Assess all 7 pillars including Automation and orchestration (pillar 7)
- **DoD DevSecOps** — Assess pipeline, supply chain, security-at-each-phase per DevSecOps Fundamentals
- **FedRAMP readiness estimate** — Low / Moderate / High based on baseline alignment
- **FISMA/RMF alignment** — Note which RMF steps have evidence vs. gaps
- **Gap identification** — Evidence found, evidence missing, remediation
- **No certification claims** — Use "readiness," "gap," "partial," "recommend verification"
