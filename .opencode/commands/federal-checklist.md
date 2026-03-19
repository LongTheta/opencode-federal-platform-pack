---
description: Federal compliance checklist — NIST, FedRAMP, FISMA, DoD
agent: federal-security-reviewer
---

# /federal-checklist

## Intent

Produce federal compliance checklist. **Federally focused** on FedRAMP, FISMA, NIST 800, **DoD Zero Trust Strategy** (7 pillars including Automation and orchestration), and **DoD Enterprise DevSecOps Fundamentals v2.5**. Map repo artifacts to NIST 800-53 control families; estimate FedRAMP readiness; assess FISMA/RMF alignment; assess DoD ZT 7 pillars and DoD DevSecOps. Identify gaps with evidence. No certification claims. See `contexts/federal-compliance-criteria.md`.

## When to Run

- Preparing for federal customer deployment
- FedRAMP, FISMA, or DoD alignment needed
- After repo-assess when baseline is known

## Required Context

- Repository workspace
- Prior repo-assess output (optional but helpful)

## Questions to Ask

- Which control families are in scope?
- AWS, Azure, or GCP? (affects aws-federal-grade-checklist)
- What evidence exists for identity, encryption, audit?

## Steps

1. Evidence extraction — repo artifacts
2. Control-family mapping — NIST 800-53
3. Readiness report — gaps, evidence, remediation
4. Produce review-score + compliance extension

## Routing

- **Agent:** federal-security-reviewer
- **Skills:** federal-platform-review, nist-compliance-evaluator, well-architected-review, supply-chain-sbom, container-security, dod-zero-trust; terraform-iac (if Terraform); aws-federal-grade-checklist (if AWS)
- **Tools (future):** evidence-extractor, federal-control-mapper, review-score

## Output Contract

- **Primary schema:** schemas/review-score.schema.json
- **Extension:** schemas/compliance-report.json (control mapping, FedRAMP readiness, FISMA/RMF alignment)
- **Required:** review_target, summary, categories, findings, top_priorities; control mapping; gaps; remediation roadmap; FedRAMP readiness estimate; FISMA/RMF alignment (when applicable)

## Quality Bar

- No "compliant" or "certified" claims
- Use "readiness," "gap," "partial," "evidence not found"
- All gaps have evidence or missing_evidence

## Exit Criteria

- Control mapping complete
- Gaps with evidence
- Remediation roadmap

## Blocking Conditions

None.
