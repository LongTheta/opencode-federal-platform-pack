# Federal Review Standards

Enforce when performing federal-aligned review. This pack is **federally focused** on **FedRAMP**, **FISMA**, and **NIST 800** criteria. Treat as mandatory.

---

## Frameworks in Scope (REQUIRED)

- **FedRAMP** — Low/Moderate/High baselines; cloud service authorization
- **FISMA** — Agency implementation of NIST RMF (800-37) and security controls
- **NIST SP 800-53** — Security and privacy controls (AC, AU, IA, SC, SI, CM, CP, IR, SA, etc.)
- **NIST SP 800-53A** — Assessment procedures
- **NIST SP 800-37** — Risk Management Framework
- **NIST SP 800-207** — Zero Trust Architecture
- **DoD Zero Trust Strategy** — 7 pillars (User, Device, Network, Data, Application/Workload, Visibility & Analytics, **Automation and orchestration**)
- **DoD Enterprise DevSecOps Fundamentals v2.5** — Supply chain, security-at-each-phase, pipeline
- **Software DT&E in DevSecOps Guidebook** (Jan 2025) — OUSD(R&E)/DTE&A; DT&E planning, pipeline test coverage, SAST/DAST/IAST, SCA, SBOM
- **NIST SP 800-190** — Container Security
- **NIST SP 800-171** — CUI protection (when applicable)

Reference: `contexts/federal-compliance-criteria.md`

---

## Control Reference (REQUIRED)

- **REQUIRED:** Use NIST 800-53 control IDs (AC-2, AU-2, IA-5, SC-7, SI-3, etc.) or equivalent assurance themes.
- **REQUIRED:** Reference control families (AC, AU, IA, SC, SI, etc.) where relevant.
- **FORBIDDEN:** Claiming compliance, certification, or "meets" for any control.

---

## Language (REQUIRED)

- **REQUIRED:** Use: "gap," "partial," "evidence not found," "recommend verification."
- **FORBIDDEN:** Use: "compliant," "certified," "meets," "fully implemented."

---

## Control Format (REQUIRED)

Every control assessment MUST use:

```
**Control:** <ID> (<family>)
**Status:** Met | Partial | Gap
**Evidence:** <path or "Not found">
**Remediation:** <concrete step>
```

- **REQUIRED:** Every control mapping cites evidence or states "Evidence not found."
- **REQUIRED:** If evidence is missing, output: `[EVIDENCE MISSING] <control>. Recommend: <verification step>.`

---

## Output Structure (REQUIRED)

- **REQUIRED:** Executive summary — overall posture, top risks.
- **REQUIRED:** Architecture Score (0–10 per category).
- **REQUIRED:** Control mapping — per control or family.
- **REQUIRED:** Evidence Found — what was observed.
- **REQUIRED:** Missing Evidence — what could not be verified.
- **REQUIRED:** Remediation roadmap — prioritized actions.
- **REQUIRED:** When DoD context applies, reference DoD DevSecOps Playbook play(s) in remediation (e.g., "See Play 7 — Define a Meaningful DevSecOps Pipeline"). See `contexts/federal-compliance-criteria.md` for capability-to-play mapping.
- **REQUIRED:** Disclaimer — no certification claim; recommend formal assessment.
