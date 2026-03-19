---
description: Federal compliance checklist (NIST, FedRAMP, FISMA, DoD)
agent: federal-security-reviewer
---

# Federal Checklist

**Purpose:** Produce a federal-grade compliance checklist. Map observable artifacts to NIST 800-53 control families. Identify gaps with evidence. Prioritize remediation. Think like a federal compliance specialist. Federal-grade review depth.

**When to use:** Preparing for ATO, FedRAMP assessment, FISMA alignment, or DoD-style review; federal/regulated repository assessment.

**Required inputs:** Repository context (current workspace or specified path).

**Optional inputs:** Target baseline (FedRAMP Moderate/High, DoD IL); known control mappings; cloud provider (AWS, Azure, GCP).

**Workflow:**
1. Gather observable artifacts (IaC, Terraform, configs, pipelines, deployment manifests).
2. Map artifacts to NIST 800-53 control families (AC, AU, IA, SC, SI, CM, CP, IR, etc.).
3. Evaluate Security, Reliability, Observability, Deployment safety, Cost, Operations.
4. Identify gaps: missing or weak controls with evidence.
5. Prioritize findings by risk and ATO impact.
6. Produce control mapping table, findings, and remediation roadmap.

**Expected output format:** Use schemas/compliance-report.json and schemas/well-architected-score.json.
- Executive summary (compliance posture, critical gaps)
- Architecture Score (0–10 per category)
- Control mapping table: Control ID | Status (Met/Partial/Gap) | Evidence | Gap description
- Findings: ID | Severity | Control | Evidence | Remediation
- Key Risks, Evidence Found, Missing Evidence
- Remediation roadmap: phased actions with dependencies

**Guardrails:**
- Every finding cites specific files, configs, or patterns.
- Reference control IDs (e.g., AC-2, SC-7) when applicable.
- Do not claim compliance; identify gaps and recommend verification.
- Remediation steps must be concrete and implementable.

**Definition of done:** Control mapping table complete; all findings have evidence and remediation; roadmap is prioritized and actionable.
