---
description: Full repository assessment — architecture, security, deployment readiness
agent: repo-auditor
---

# /repo-assess

## Intent

Comprehensive review of a software repository for architecture, maintainability, security, and deployment readiness. Produce evidence-based findings with severity and prioritized recommendations.

## When to Run

- Evaluating repos for onboarding, due diligence, pre-merge review, or production readiness
- Before platform-design or federal-checklist when baseline is unknown
- As part of orchestrated workflow (orchestrate → repo-assess → platform-design)

## Required Context

- Repository workspace (current directory or specified path)
- Read access to repo structure, configs, IaC, CI

## Questions to Ask

- Where is the entry point? How is the app built and run?
- What is the test coverage and structure? Are tests run in CI?
- How are secrets handled? Are dependencies pinned?
- Is there a README, runbook, or architecture doc? Does it match the code?
- What would block production deployment?

## Steps

1. Repo discovery — structure, entry points, tech stack
2. Architecture inference — components, dependencies, patterns
3. Security review — secrets, deps, supply chain, IAM
4. Observability review — logs, metrics, health checks
5. Scoring engine — 0–10 per category (Security, Reliability, Performance, Cost, Operations)
6. Final report — findings, evidence, top_priorities

## Routing

- **Agent:** repo-auditor
- **Skills:** well-architected-review, supply-chain-sbom, container-security, observability-review; terraform-iac (if Terraform)
- **Tools (future):** evidence-extractor, review-score

## Output Contract

- **Schema:** schemas/review-score.schema.json
- **Required:** review_target, summary (final_score, letter_grade, confidence, production_readiness), categories with score/rationale/evidence_found/missing_evidence/risks/recommended_actions, findings by severity, top_priorities

## Quality Bar

- Every finding cites evidence or states missing_evidence
- No generic advice; recommendations repo-specific
- Severity: Critical | High | Medium | Low

## Exit Criteria

- Report conforms to schema
- At least one finding per domain where applicable
- All findings have evidence or explicit missing_evidence
- Recommendations ordered by impact

## Blocking Conditions

None. Command always completes.
