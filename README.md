# opencode-federal-platform-pack

OpenCode-first AI engineering pack for platform review and solution architect discovery.

## Mission

1. **Review repositories** — Recommend the most effective platform, architecture, DevSecOps, and operational model.
2. **Act like solution architect + product manager** — Ask the right questions about needs, users, budget, constraints, compliance, integrations, scale, and delivery expectations.

## Secondary

- AWS, Azure, GCP review
- GitOps and observability design review
- Federal-grade checklists and evidence-based assessments
- Pre-push quality gate for AI IDE workflows

## Commands

| Command | Purpose |
|---------|---------|
| `/repo-assess` | Full repository assessment: architecture, security, deployment readiness |
| `/solution-discovery` | Ask project questions; produce discovery summary |
| `/platform-design` | Design platform architecture with tradeoffs |
| `/federal-checklist` | Federal compliance checklist (NIST, FedRAMP, FISMA, DoD) |
| `/gitops-audit` | GitOps, CI/CD, observability maturity |
| `/quality-gate` | Pre-push gate: evidence, security, docs, supply chain |

## Quick Start

1. Copy `.opencode/` into your project root, or set `OPENCODE_CONFIG_DIR` to this pack.
2. Run `/repo-assess` for review, `/solution-discovery` for discovery, `/quality-gate` before push.

## Structure

```
.opencode/     Config, commands, agents, instructions, plugins
skills/         repo-review, federal-platform-review, gitops-maturity, aws/azure/gcp-platform-review
rules/          evidence, push verification, docs, security, tagging
contexts/       repo-review-context, solution-discovery-question-bank
docs/           architecture, usage, federal-alignment, quality-gate, discovery-framework
schemas/        review-report, compliance-report, quality-gate
```

## Principles

- Evidence-first — Cite files and configs
- Security before convenience
- Docs with meaningful changes
- Tagging and supply-chain review for cloud and build changes

## Docs

- [Architecture](docs/architecture.md)
- [Usage](docs/usage.md)
- [Federal Alignment](docs/federal-alignment.md)
- [Quality Gate](docs/quality-gate-workflow.md)
- [Discovery Framework](docs/solution-architect-discovery-framework.md)
