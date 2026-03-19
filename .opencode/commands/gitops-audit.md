---
description: GitOps, CI/CD, and platform engineering maturity audit
agent: gitops-reviewer
---

# /gitops-audit

## Intent

Audit GitOps, CI/CD, IaC, observability, and platform engineering maturity. Evaluate 7 capability areas. Produce findings with severity and remediation roadmap.

## When to Run

- Assessing GitOps/DevSecOps maturity
- Before platform redesign
- As part of orchestrate → gitops-audit → repo-assess

## Required Context

- Repository with CI/CD, IaC, or GitOps configs
- skills/gitops-capability-audit/capability-model.md

## Questions to Ask

- What CI/CD system (GitHub Actions, GitLab, Jenkins)?
- GitOps (ArgoCD, Flux)?
- Security scanning in pipeline?
- Promotion and release governance?

## Steps

1. Map 7 capability areas from capability-model
2. Evaluate each: good / weak / anti-pattern
3. Map to Well-Architected categories
4. Produce findings with evidence
5. Remediation roadmap

## Routing

- **Agent:** gitops-reviewer
- **Skills:** gitops-capability-audit, well-architected-review
- **Tools (future):** evidence-extractor, review-score

## Output Contract

- **Schema:** schemas/review-score.schema.json
- **Required:** review_target, summary, categories (map GitOps to Well-Architected), findings by severity, top_priorities, remediation roadmap

## Quality Bar

- Findings per capability area
- Evidence for each finding
- Good/weak/anti-pattern from capability-model

## Exit Criteria

- All 7 capabilities evaluated
- Findings with evidence
- Remediation roadmap

## Blocking Conditions

None.
