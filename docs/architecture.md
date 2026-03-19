# Architecture

## Mission

1. **Review repositories** — Recommend platform, architecture, DevSecOps, operational model.
2. **Solution architect + product manager** — Ask right questions about needs, users, budget, constraints, compliance, integrations, scale, delivery.

## Design Principles

- **OpenCode-first** — Config under `.opencode/`
- **Evidence-first** — Cite files and configs
- **Depth over breadth** — Opinionated, practical
- **Internal OS** — Platform review and governance, not generic toy collection

## Component Map

| Component | Location | Purpose |
|-----------|----------|---------|
| Config | `.opencode/opencode.json` | Agents, commands, instructions |
| Commands | `.opencode/commands/` | 6 commands: repo-assess, solution-discovery, platform-design, federal-checklist, gitops-audit, quality-gate |
| Instructions | `.opencode/instructions/` | core-engineering, repo/arch/federal standards, documentation-rules, cloud-governance-rules, gitops-governance-rules |
| Agent prompts | `.opencode/prompts/agents/` | 6 agents |
| Plugins | `.opencode/plugins/` | Pre-merge quality, supply-chain guard, governance-hooks |
| Skills | `skills/` | well-architected-review, federal-platform-review, gitops-capability-audit, nist-compliance-evaluator, aws-federal-grade-checklist, aws/azure/gcp-platform-review |
| Rules | `rules/` | 5 rules: evidence, push verification, docs, security, tagging |
| Contexts | `contexts/` | repo-review-context, solution-discovery-question-bank |
| Schemas | `schemas/` | review-report, compliance-report, quality-gate, well-architected-score |

## Command → Agent Mapping

| Command | Agent |
|---------|-------|
| repo-assess | repo-auditor |
| solution-discovery | solution-architect |
| platform-design | solution-architect |
| federal-checklist | federal-security-reviewer |
| gitops-audit | gitops-reviewer |
| quality-gate | repo-auditor |

## Cloud Review

Use `@cloud-platform-reviewer` or reference `skills/aws-platform-review/`, `azure-platform-review/`, `gcp-platform-review/` for provider-specific review.
