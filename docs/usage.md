# Usage

## Installation

1. Clone or copy this repository.
2. **Option A — Project-local:** Copy `.opencode/` into your project root.
3. **Option B — Config dir:** Set `OPENCODE_CONFIG_DIR` to this pack's root.

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

Reference from commands or Cursor:

- `skills/well-architected-review/` — Universal platform review (Security, Reliability, Performance, Cost, Operations)
- `skills/federal-platform-review/` — Federal checklist
- `skills/gitops-capability-audit/` — GitOps audit (7 capability areas)
- `skills/aws-platform-review/`, `azure-platform-review/`, `gcp-platform-review/` — Cloud-specific

## Rules

Loaded via `opencode.json`. Enforce evidence-first, push verification, docs, security, tagging.

## Plugins

- **Pre-merge quality** — Warnings for README, .gitignore, lock files, CI config
- **Supply-chain guard** — Reminders when editing Dockerfile, package.json, pipelines
