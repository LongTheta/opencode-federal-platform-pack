# opencode-federal-platform-pack

Executable OpenCode platform pack for repository architecture reviews, solution architect discovery, platform design, GitOps/DevSecOps audits, federal-grade evidence-based reviews, and pre-push quality enforcement.

---

## Overview

This pack is an **OpenCode operating system** for platform engineering. It provides commands, agents, skills, plugins, and schemas that work together—not a prompt collection. Commands route to agents; agents invoke skills; plugins enforce at tool execution; outputs conform to schemas.

**What it is:** An executable, installable pack that produces evidence-based reviews, discovery summaries, architecture options, federal checklists, GitOps audits, and quality-gate verdicts. Plugin blocks unsafe actions; quality-gate blocks push when verdict is fail.

**What it is not:** A generic AI agent collection. It does not optimize for breadth. It focuses on platform engineering, DevSecOps, and federal-aligned assessment.

---

## How This Differs from Generic AI Packs

| Aspect | Generic packs | This pack |
|--------|---------------|-----------|
| **Evidence** | Often generic advice | Requires file/config citations; flags missing evidence |
| **Discovery** | Jumps to implementation | Asks questions first; documents assumptions |
| **Security** | Optional or advisory | Plugin blocks .env read, dangerous bash; quality-gate blocks push for secrets, :latest |
| **Output** | Free-form | Structured schemas (review-score, quality-gate, compliance-report) |
| **Enforcement** | Documentation only | Plugin hooks + quality-gate command |
| **Scoring** | Ad hoc | Weighted categories, letter grades, production readiness |

---

## Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `/repo-assess` | Full repository assessment | review-score.schema.json |
| `/solution-discovery` | Discovery: requirements, constraints | Discovery summary |
| `/platform-design` | Architecture with tradeoffs | Architecture options |
| `/federal-checklist` | NIST 800-53 mapping; no certification | review-score + compliance-report |
| `/gitops-audit` | GitOps, CI/CD, IaC maturity | review-score.schema.json |
| `/quality-gate` | Pre-push gate | pass / pass_with_warnings / fail |
| `/doc-sync` | Documentation drift; propose updates | Drift report |
| `/verify` | Quick verification | quality-gate verdict |
| `/checkpoint` | Session handoff | Checkpoint markdown |
| `/orchestrate` | Multi-step workflow plan | Workflow plan |

---

## Agents

| Agent | Commands |
|-------|----------|
| **repo-auditor** | repo-assess, quality-gate, verify |
| **solution-architect** | solution-discovery, platform-design, checkpoint, orchestrate |
| **federal-security-reviewer** | federal-checklist |
| **gitops-reviewer** | gitops-audit |
| **documentation-writer** | doc-sync |
| **product-manager-discovery** | (scoping) |
| **cloud-platform-reviewer** | (cloud-specific review) |

---

## Skills

| Skill | Used By |
|-------|---------|
| **well-architected-review** | repo-assess, federal-checklist, gitops-audit |
| **federal-platform-review** | federal-checklist |
| **nist-compliance-evaluator** | federal-checklist |
| **gitops-capability-audit** | gitops-audit |
| **aws-federal-grade-checklist** | federal-checklist (AWS) |
| **aws/azure/gcp-platform-review** | Cloud-specific review |

---

## Plugins and Enforcement

**federal-platform-enforcement.js** — Runs during tool execution:
- **Block:** Read .env; dangerous bash (rm -rf /, etc.); git push when `FEDERAL_PLATFORM_BLOCK_PUSH=1`
- **Warn:** git push (default); secrets in write/edit
- **Log:** Supply-chain reminder when editing Dockerfile, package.json, go.mod

**Quality-gate command** — Produces verdict. Verdict fail blocks push readiness. See `.opencode/plugins/governance-plugin/rules-map.md` for block/warn/info matrix.

---

## Scoring Engine

All assessment commands use the same model:
- **Categories:** Security 25%, Reliability 20%, Performance 15%, Cost Awareness 10%, Operational Excellence 30%
- **Scale:** 0–10 per category. Letter grades: A (9.0–10), B (8.0–8.9), C (7.0–7.9), D (5.5–6.9), F (<5.5)
- **Production readiness:** ready | conditionally_ready | not_ready
- **Schema:** `schemas/review-score.schema.json`

---

## Repo Structure

```
.opencode/
  opencode.json       Control plane: commands, agents, instructions
  commands/          10 commands with lifecycle design
  prompts/agents/    7 agent prompts
  plugins/
    federal-platform-enforcement.js
    pre-merge-quality.js
    governance-plugin/    Event model, rules-map, plugin spec
  tools/             Native tool specs (review-score, quality-gate-check, etc.)
  instructions/      Core engineering, standards, rules
skills/              well-architected-review, federal-platform-review, gitops-capability-audit, etc.
schemas/             review-score, quality-gate, compliance-report, command-routing
rules/               evidence, push verification, docs, security, tagging
contexts/            solution-discovery question bank, repo review context
docs/                Architecture, usage, scoring, enforcement, routing, packaging
examples/            Sample reports, end-to-end run
```

---

## Quick Start

1. Clone this repository.
2. **Plugin only:** Copy `.opencode/plugins/federal-platform-enforcement.js` into your project's `.opencode/plugins/`.
3. **Full catalog:** Copy `.opencode/` and supporting dirs, or set `OPENCODE_CONFIG_DIR` to this pack's root.
4. Run `/repo-assess`, `/orchestrate`, `/quality-gate`.

See [INSTALL.md](INSTALL.md) for plugin vs full catalog, skills independently, future npm install.

---

## Documentation

| Doc | Purpose |
|-----|---------|
| [INSTALL](INSTALL.md) | Plugin vs full catalog; skills independently; future install |
| [Architecture](docs/architecture.md) | Component map, design principles |
| [Usage](docs/usage.md) | Installation, commands, examples |
| [Command Routing](docs/command-routing.md) | Command → agent → skill |
| [Command-to-Skill Mapping](docs/command-to-skill-mapping.md) | Full mapping table |
| [Routing Matrix](docs/routing-matrix.md) | Quick reference |
| [Enforcement Model](docs/enforcement-model.md) | Plugin vs command vs rules |
| [Plugin and Hook Model](docs/plugin-and-hook-model.md) | Event model, hooks |
| [Scoring Model](docs/scoring-model.md) | Categories, weights, grades |
| [Quality Gate](docs/quality-gate-workflow.md) | Block/warn/info |
| [Packaging Strategy](docs/packaging-strategy.md) | Distribution modes |
| [Example End-to-End](docs/example-end-to-end-review.md) | Full workflow |

---

## Verification

```bash
npm install
npm run verify          # Smoke test: structure, schemas, scripts, tests
npm test                # Unit tests + schema validation
```

CI runs quality-gate on every PR (`.github/workflows/quality-gate.yml`): verify, tests, schema validation.

---

## Guardrails

- **Evidence required** — Recommendations cite files/configs; missing evidence flagged.
- **No certification claims** — Federal outputs use "readiness," "gap," "partial" — never "compliant" or "certified."
- **Security blocks push** — Plaintext secrets, :latest in prod, missing security review block push.
- **Docs required** — Meaningful changes require documentation updates.
- **Tagging for cloud** — Cloud resources need environment, owner, cost center tags.
