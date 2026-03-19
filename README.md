# opencode-federal-platform-pack

Curated platform engineering workflow pack for OpenCode and AI IDEs. Supports repository assessment, solution architecture, GitOps audit, cloud review, and federal-aligned engineering discipline.

---

## Overview

This pack provides structured workflows, agents, and skills for platform engineering teams working in regulated or enterprise environments. It is designed for OpenCode, Cursor, and similar AI-assisted development tools.

**What it is:** A configuration pack that instructs AI assistants to follow evidence-based review practices, ask discovery questions before design, enforce quality gates before push, and produce outputs aligned with NIST, FedRAMP, FISMA, and DoD-style controls.

**What it is not:** A generic coding assistant. It does not optimize for breadth of languages or frameworks. It focuses on platform engineering, DevSecOps, and federal-aligned assessment.

---

## Why It Exists

General-purpose AI coding assistants lack domain context for platform engineering and regulated environments. They tend to:

- Recommend without citing evidence
- Skip discovery before design
- Ignore supply-chain and compliance implications
- Produce generic advice instead of repo-specific findings

This pack encodes platform engineering discipline so that AI-assisted workflows produce actionable, evidence-based outputs suitable for enterprise and federal use.

---

## Who It Is For

- **Platform engineers** — Repo assessment, GitOps maturity, cloud review
- **Solution architects** — Discovery, requirements, architecture design with tradeoffs
- **DevSecOps teams** — Security review, supply-chain checks, quality gates
- **Federal and regulated teams** — NIST-aligned checklists, compliance evidence, readiness indicators
- **Engineering leads** — Pre-push quality gates, documentation expectations, governance rules

---

## How It Differs from General-Purpose AI Packs

| Aspect | General-purpose packs | This pack |
|--------|----------------------|-----------|
| **Evidence** | Often generic advice | Requires file/config citations; flags missing evidence |
| **Discovery** | Jumps to implementation | Asks questions first; documents assumptions and constraints |
| **Security** | Optional or advisory | Blocks push for secrets, `:latest`, missing review on CI/IaC changes |
| **Documentation** | Often omitted | Requires doc updates for meaningful changes |
| **Compliance** | Rarely addressed | NIST control mapping; federal readiness indicators; no certification claims |
| **Output format** | Free-form | Structured schemas (review report, compliance report, quality gate) |

---

## How It Supports OpenCode and AI IDE Workflows

- **Commands** — `/repo-assess`, `/solution-discovery`, `/platform-design`, `/federal-checklist`, `/gitops-audit`, `/quality-gate`
- **Agents** — Specialized subagents (solution-architect, repo-auditor, federal-security-reviewer, etc.) with constrained prompts
- **Instructions** — Loaded by OpenCode; enforce evidence-first, security, docs, tagging, GitOps rules
- **Rules** — Evidence-before-claims, no-push-without-verification, docs-required, security-review, tagging-required
- **Plugins** — Governance hooks, pre-merge quality checks, supply-chain guard
- **Schemas** — JSON schemas for review reports, compliance reports, quality gate output

---

## Core Concepts

### Evidence-First

Every recommendation, finding, or claim must cite observable evidence (file path, line, config). Missing evidence must be called out explicitly. No generic advice without repo-specific proof.

### Discovery Before Design

Solution architect workflows ask clarifying questions about users, scale, compliance, budget, and constraints before proposing architecture. Answers are summarized as assumptions and design constraints.

### Quality Gate Before Push

Pre-push checks enforce: tests where appropriate, documentation for meaningful changes, security review for dependency/CI/container/IaC changes, architecture notes for infrastructure changes, changelog for behavior changes, tagging for cloud resources, evidence strength for recommendations.

### Federal Alignment Without Certification

Federal reviews reference NIST 800-53 control families and assurance themes. Outputs use "gap," "partial," "evidence not found" — never "compliant" or "certified." Formal assessment requires an authorized assessor.

---

## Commands

| Command | Purpose |
|---------|---------|
| `/repo-assess` | Full repository assessment: architecture, security, deployment readiness |
| `/solution-discovery` | Ask project questions; produce discovery summary with assumptions and constraints |
| `/platform-design` | Design platform architecture with tradeoffs and cloud alignment |
| `/federal-checklist` | Federal compliance checklist (NIST, FedRAMP, FISMA, DoD) |
| `/gitops-audit` | GitOps, CI/CD, observability maturity audit |
| `/quality-gate` | Pre-push gate: evidence, security, docs, supply chain |

---

## Agents

| Agent | Role |
|-------|------|
| **solution-architect** | Discovery, requirements, constraints, high-level design; asks clarifying questions |
| **product-manager-discovery** | Scopes vague ideas into deliverables with acceptance criteria |
| **repo-auditor** | Reviews repos for architecture, maintainability, security, deployment readiness |
| **federal-security-reviewer** | Federal-grade review: NIST 800-53, FedRAMP, FISMA, DoD-style controls |
| **gitops-reviewer** | Evaluates GitOps, CI/CD, IaC, observability maturity |
| **cloud-platform-reviewer** | Evaluates AWS, Azure, GCP Well-Architected alignment |

---

## Skills

Reusable evaluation patterns invoked by commands or agents.

| Skill | Purpose |
|-------|---------|
| **well-architected-review** | Universal platform review (Security, Reliability, Performance, Cost, Operations) |
| **federal-platform-review** | Federal readiness checklist; 10 domains; no certification claims |
| **gitops-capability-audit** | GitOps audit; 7 capability areas; good/weak/anti-patterns |
| **nist-compliance-evaluator** | NIST 800-53, 800-207, 800-190, CIS alignment |
| **aws-federal-grade-checklist** | AWS federal-grade validation |
| **aws-platform-review** | AWS identity, network, workload, secrets, tagging, cost, resilience |
| **azure-platform-review** | Azure identity, network, workload, secrets, tagging, cost, resilience |
| **gcp-platform-review** | GCP identity, network, workload, secrets, labeling, cost, resilience |

---

## Example Workflows

### Repo Assessment Before Adoption

```
/repo-assess
```

Produces: Executive summary, architecture score per category, key risks, evidence found, missing evidence, recommended actions.

### Discovery Before Platform Design

```
/solution-discovery Migrating legacy app to cloud for federal customer
```

Asks: users, scale, compliance, budget, integrations. Produces: discovery summary, assumptions, constraints, open questions.

### Architecture Design with Tradeoffs

```
/platform-design Event-driven API with 10k req/sec target
```

Produces: 1–3 options with pros/cons, architecture score, key risks, evidence/missing evidence.

### Federal Readiness Check

```
/federal-checklist
```

Produces: readiness indicators, control mapping (NIST 800-53), gaps, evidence found, missing evidence, remediation roadmap. Does not claim certification.

### GitOps Maturity Audit

```
/gitops-audit
```

Produces: CI/CD, GitOps, IaC, observability maturity; findings with severity; improvement roadmap.

### Pre-Push Quality Gate

```
/quality-gate
```

Produces: pass / pass with warnings / fail; blockers, warnings, informational; required actions.

---

## Repo Structure

```
.opencode/           OpenCode config
  instructions/     Core engineering, repo/arch/federal standards, docs, cloud, GitOps rules
  commands/         Command definitions (repo-assess, solution-discovery, platform-design, etc.)
  prompts/agents/   Agent prompts
  plugins/          Governance hooks, pre-merge quality, supply-chain guard
skills/             Reusable evaluation skills (well-architected, federal, GitOps, cloud)
rules/              Evidence, push verification, docs, security, tagging
contexts/           Solution discovery question bank, repo review context
docs/               Architecture, usage, federal alignment, quality gate, discovery framework
schemas/            review-report, compliance-report, quality-gate, well-architected-score
examples/           Sample outputs (repo review, federal report)
AGENTS.md           Cross-tool agent instructions
```

---

## How to Extend

1. **Add a skill** — Create `skills/<name>/SKILL.md` with workflow, checklist, output format. Reference from commands.
2. **Add a command** — Add to `.opencode/commands/` and `opencode.json`; map to agent.
3. **Add an agent** — Add prompt to `.opencode/prompts/agents/`; register in `opencode.json`.
4. **Add a rule** — Create `rules/<name>.md`; ensure `../rules/*.md` is in instructions.
5. **Add an instruction** — Create in `.opencode/instructions/`; add to `opencode.json` instructions array.

---

## Guardrails

- **Evidence required** — Recommendations must cite files/configs; missing evidence is flagged.
- **No certification claims** — Federal outputs use "readiness," "gap," "partial" — never "compliant" or "certified."
- **Security blocks push** — Plaintext secrets, `:latest` in prod, missing security review for CI/IaC changes block push readiness.
- **Docs required** — Meaningful code/config/deploy changes require documentation updates.
- **Tagging for cloud** — Cloud resources must have environment, owner, cost center tags.

---

## Roadmap

- **Stable:** Repo assessment, solution discovery, platform design, federal checklist, GitOps audit, quality gate
- **Planned:** Integration with CI/CD for automated gates

---

## Documentation

| Doc | Purpose |
|-----|---------|
| [Architecture](docs/architecture.md) | Component map, design principles |
| [Usage](docs/usage.md) | Installation, commands, examples |
| [Federal Alignment](docs/federal-alignment.md) | NIST, FedRAMP, FISMA, DoD alignment |
| [Quality Gate](docs/quality-gate-workflow.md) | Pre-push checks, block/warn/info |
| [Discovery Framework](docs/solution-architect-discovery-framework.md) | Discovery workflow, assumptions, constraints |

---

## Quick Start

1. Clone or copy this repository.
2. **Option A:** Copy `.opencode/` into your project root.
3. **Option B:** Set `OPENCODE_CONFIG_DIR` to this pack's root.
4. Run `/repo-assess` for review, `/solution-discovery` for discovery, `/quality-gate` before push.
