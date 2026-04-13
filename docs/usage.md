# Usage

## Installation

See [INSTALL.md](../INSTALL.md) for the full guide. Summary:

1. **Plugin only** — Copy `federal-platform-enforcement.js` into `.opencode/plugins/` for enforcement without commands.
2. **Full catalog** — Copy `.opencode/` and supporting dirs, or set `OPENCODE_CONFIG_DIR` to this pack's root.

## Config

- **opencode.json** — Defines agents, commands, and instruction load order. Instructions load: aws-derived-principles, core-engineering, repo/arch/federal standards, documentation-rules, cloud-governance-rules, gitops-governance-rules, then `rules/*.md`.

## Commands

| Command | Purpose |
|---------|---------|
| `/repo-assess` | Full repository assessment: architecture, security, deployment readiness |
| `/solution-discovery` | Ask project questions; produce discovery summary |
| `/platform-design` | Design platform architecture with tradeoffs |
| `/federal-checklist` | Federal compliance checklist (NIST, FedRAMP, FISMA, DoD) |
| `/gitops-audit` | GitOps, CI/CD, observability maturity |
| `/quality-gate` | Pre-push gate: evidence, security, docs, supply chain |
| `/doc-sync` | Identify documentation drift; propose doc updates |
| `/verify` | Quick verification: quality-gate checks and status |
| `/checkpoint` | Capture session state and next steps for handoff |
| `/orchestrate` | Plan multi-step workflow (review → design → federal check) |

## Examples

```
/repo-assess
/solution-discovery Migrating legacy app to cloud for federal customer
/platform-design Event-driven API with 10k req/sec target
/federal-checklist
/gitops-audit
/quality-gate
```

## Agents

Invoke with `@`:

- `@solution-architect` — Discovery and design
- `@product-manager-discovery` — Scoping
- `@repo-auditor` — Repository review
- `@federal-security-reviewer` — Federal compliance
- `@gitops-reviewer` — GitOps maturity
- `@cloud-platform-reviewer` — AWS/Azure/GCP review

## Skills

Reference from commands or your editor:

- `skills/well-architected-review/` — Universal platform review (Security, Reliability, Performance, Cost, Operations)
- `skills/federal-platform-review/` — Federal checklist
- `skills/gitops-capability-audit/` — GitOps audit (7 capability areas)
- `skills/aws-platform-review/`, `azure-platform-review/`, `gcp-platform-review/` — Cloud-specific

## Rules

Loaded via `opencode.json`. Enforce evidence-first, push verification, docs, security, tagging.

## Plugins

- **Federal platform enforcement** — Blocks .env reads, dangerous bash; warns on secrets in edits, git push; supply-chain reminders
- **Pre-merge quality** — Warnings for README, .gitignore, lock files, CI config
- **Supply-chain guard** — Reminders when editing Dockerfile, package.json, pipelines
