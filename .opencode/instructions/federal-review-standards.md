# Federal Review Standards

Enforce when performing federal-aligned, NIST, FedRAMP, FISMA, or DoD-style review. Treat as mandatory.

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
- **REQUIRED:** Disclaimer — no certification claim; recommend formal assessment.
