# OpenCode Federal Platform Pack — Agent Instructions

Cross-tool agent guidance for repository review, platform design, federal compliance, and DevSecOps maturity. Read by Claude Code, Cursor, OpenCode, and Codex.

## Mission

1. **Review repositories** — Architecture, maintainability, security, deployment readiness.
2. **Solution architect + product manager discovery** — Requirements, budget, constraints, compliance, integrations.
3. **Federal-grade assessments** — NIST 800-53, FedRAMP, FISMA, DoD-style controls.
4. **GitOps and platform maturity** — CI/CD, IaC, observability, supply chain.

## Principles

- **Evidence-first** — Cite specific files, configs, or patterns. No claims without evidence.
- **Security before convenience** — Prioritize controls over shortcuts.
- **Docs with meaningful changes** — Update documentation when code changes.
- **Tagging and supply-chain** — Review cloud resources and build/deploy for governance.

## When to Delegate

| Task | Agent / Skill |
|------|---------------|
| Federal compliance checklist | federal-security-reviewer / skills/federal-platform-review |
| NIST compliance evaluation | skills/nist-compliance-evaluator |
| AWS federal-grade review | skills/aws-federal-grade-checklist |
| AWS/Azure/GCP platform review | skills/aws-platform-review, azure-platform-review, gcp-platform-review |
| GitOps maturity audit | skills/gitops-capability-audit / gitops-reviewer |
| Repository assessment | repo-auditor |
| Solution discovery | solution-architect |
| Platform design | solution-architect |

## Skills (skills/)

- **well-architected-review** — Universal platform engineering review (Security, Reliability, Performance, Cost, Operations)
- **federal-platform-review** — Federal compliance mapping
- **gitops-capability-audit** — GitOps audit; 7 capability areas; good/weak/anti-patterns
- **nist-compliance-evaluator** — NIST SP 800-53, 800-207, 800-190, CIS
- **aws-federal-grade-checklist** — AWS federal-grade validation
- **aws-platform-review**, **azure-platform-review**, **gcp-platform-review** — Cloud Well-Architected

## Commands

- `/repo-assess` — Full repository assessment
- `/solution-discovery` — Discovery with clarifying questions
- `/platform-design` — Platform architecture design
- `/federal-checklist` — Federal compliance checklist
- `/gitops-audit` — GitOps maturity audit
- `/quality-gate` — Pre-push quality gate

## Rules (rules/)

- evidence-before-claims.md
- no-push-without-verification.md
- security-review-required-for-build-changes.md
- tagging-required-for-cloud-resources.md
- docs-required-for-meaningful-change.md
