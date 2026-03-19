# Platform Review Standards

Enforce when performing repository, architecture, or federal review. Treat as mandatory.

---

## Repository Review

**Pre-Review:** Map structure, dependency manifests, CI/CD, deployment manifests, docs.

**Finding Format:**
```
**Finding:** <one-line title>
**Severity:** High | Medium | Low
**Evidence:** <file path>:<line or section>
**Recommendation:** <concrete step>
```

**Domains:** Architecture | Maintainability | Security | Deployment. Cover each; state "No findings" with rationale if none.

**Evidence:** Every finding cites file/config. If missing: `[EVIDENCE MISSING] <area>. Recommend: <step>.`

---

## Architecture Review

**Pre-Design:** Search codebase for patterns; identify requirements, constraints, compliance context.

**Options:** Present 1–3 options with pros, cons, conditions. No single-option prescription.

**Cloud:** Map to Well-Architected pillars; cite specific services.

**Compliance:** Factor in NIST/FedRAMP/FISMA/DoD when indicated. Use "aligned with," "implications for" — never "compliant."

**Output:** Discovery summary | Constraints | Options | Recommendation | Open questions.

---

## Federal Review

**Control Reference:** Use NIST 800-53 IDs (AC-2, AU-2, IA-5, SC-7, etc.). Do not claim certification.

**Language:** "gap," "partial," "evidence not found." Forbidden: "compliant," "certified," "meets."

**Control Format:**
```
**Control:** <ID> (<family>)
**Status:** Met | Partial | Gap
**Evidence:** <path or "Not found">
**Remediation:** <concrete step>
```

**Output:** Executive summary | Control mapping | Findings | Remediation roadmap. Include disclaimer.
