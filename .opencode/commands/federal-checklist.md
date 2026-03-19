---
description: Federal compliance checklist (NIST, FedRAMP, FISMA, DoD)
agent: federal-security-reviewer
---

# Federal Checklist

**Purpose:** Produce a federal-grade compliance checklist. Map observable artifacts to NIST 800-53 control families. Identify gaps with evidence. Prioritize remediation. Think like a federal compliance specialist.

**When to use:** Preparing for ATO, FedRAMP assessment, FISMA alignment, or DoD-style review; federal/regulated repository assessment.

**Required inputs:** Repository context (current workspace or specified path).

**Optional inputs:** Target baseline (FedRAMP Moderate/High, DoD IL), known control mappings.

**Workflow:**
1. Gather observable artifacts (IaC, configs, pipelines, deployment manifests).
2. Map artifacts to NIST 800-53 control families (AC, AU, IA, SC, SI, CM, CP, IR, etc.).
3. Identify gaps: missing or weak controls with evidence.
4. Prioritize findings by risk and ATO impact.
5. Produce control mapping table, findings, and remediation roadmap.

**Expected output format:**
- Executive summary (compliance posture, critical gaps)
- Control mapping table: Control ID | Status (Met/Partial/Gap) | Evidence | Gap description
- Findings: ID | Severity | Control | Evidence | Remediation
- Remediation roadmap: phased actions with dependencies

**Guardrails:**
- Every finding cites specific files, configs, or patterns.
- Reference control IDs (e.g., AC-2, SC-7) when applicable.
- Do not claim compliance; identify gaps and recommend verification.
- Remediation steps must be concrete and implementable.

**Definition of done:** Control mapping table complete; all findings have evidence and remediation; roadmap is prioritized and actionable.
