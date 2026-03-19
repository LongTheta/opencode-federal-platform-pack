# OpenCode Catalog

Control plane for the federal platform pack. Defines agents, commands, instructions, and plugins.

---

## Contents

| Path | Purpose |
|------|---------|
| `opencode.json` | Commands (10), agents (7), instructions |
| `commands/` | repo-assess, solution-discovery, platform-design, federal-checklist, gitops-audit, quality-gate, doc-sync, verify, checkpoint, orchestrate |
| `instructions/` | aws-derived-principles, core-engineering, repo/arch/federal standards, docs, cloud, GitOps rules |
| `prompts/agents/` | solution-architect, product-manager-discovery, repo-auditor, federal-security-reviewer, gitops-reviewer, cloud-platform-reviewer, documentation-writer |
| `plugins/` | federal-platform-enforcement.js, pre-merge-quality.js, governance-plugin/ |
| `tools/` | Native tool specs (review-score, quality-gate-check, evidence-extractor, federal-control-mapper, target-architecture-synthesizer) |

---

## Command → Agent → Skill

See `docs/command-to-skill-mapping.md` and `docs/routing-matrix.md`.

---

## Plugins

- **federal-platform-enforcement.js** — Blocks .env read, dangerous bash; warns on push, secrets; logs supply-chain
- **pre-merge-quality.js** — Session idle: warnings for README, .gitignore, lock files, CI
- **governance-plugin/** — Event model, rules-map, plugin spec

---

## Instructions Load Order

1. aws-derived-principles
2. core-engineering
3. repo-review-standards, architecture-review-standards, federal-review-standards
4. documentation-rules, cloud-governance-rules, gitops-governance-rules
5. ../rules/*.md
