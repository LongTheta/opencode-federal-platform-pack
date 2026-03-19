---
name: repo-review
description: Reviews repositories for architecture, maintainability, security, and deployment readiness. Use when assessing a codebase for production readiness, onboarding, or technical due diligence.
---

# Repository Review Skill

Reviews repositories for architecture, maintainability, security, and deployment readiness. Produces evidence-based findings with severity levels.

## When to Use

- Assess a codebase for production readiness
- Technical due diligence or onboarding
- Pre-merge or pre-release review
- Architecture and maintainability assessment

## Workflow

1. **Gather context** — Clone or navigate to the repository; identify tech stack and structure.
2. **Architecture** — Evaluate structure, patterns, coupling, scalability.
3. **Maintainability** — Code quality, documentation, tests, dependencies.
4. **Security** — Secrets, dependencies, config, access control, supply chain.
5. **Deployment readiness** — Build, deploy, observability, runbooks.
6. **Produce report** — Executive summary, findings with evidence, prioritized recommendations.

## Output Format

- Executive summary
- Per-domain findings (Architecture, Maintainability, Security, Deployment)
- Severity: High / Medium / Low
- Evidence: file:line or config path
- Prioritized recommendations

## Principles

- Evidence-first; no speculation
- Cite specific files and configs
- Actionable recommendations only
