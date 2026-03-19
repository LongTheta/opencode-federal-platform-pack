# opencode-federal-platform-pack

**OpenCode pack for platform engineering and federal-aligned assessment.** Evidence-based reviews, GitOps audits, FedRAMP/FISMA/NIST readiness checks, and pre-push quality enforcement.

---

## At a Glance

| What | Count |
|------|-------|
| **Commands** | 27 |
| **Agents** | 19 |
| **Skills** | 10 |
| **Schemas** | review-score, quality-gate, compliance-report |

**Focus:** Platform engineering, DevSecOps, federal compliance (FedRAMP, FISMA, NIST 800, DoD Zero Trust, DoD DevSecOps). Not a generic AI pack—evidence required, no certification claims.

---

## Quick Start

```bash
git clone https://github.com/LongTheta/opencode-federal-platform-pack.git
cd opencode-federal-platform-pack
npm install
npm run verify
```

**Use it:**
- **Plugin only** — Copy `federal-platform-enforcement.js` for governance (blocks secrets, warns on push).
- **Full pack** — Run OpenCode from this repo or copy `.opencode/` into your project.

See [INSTALL.md](INSTALL.md) for options.

---

## What This Pack Does

| Capability | How |
|------------|-----|
| **Repo assessment** | `/repo-assess` — Architecture, security, deployment readiness; structured scorecard |
| **Federal compliance** | `/federal-checklist` — NIST 800-53, FedRAMP, FISMA, DoD ZT, DoD DevSecOps mapping |
| **GitOps audit** | `/gitops-audit` — CI/CD, IaC, supply chain, observability maturity |
| **Quality gate** | `/quality-gate` — Pre-push check; blocks on secrets, :latest, missing review |
| **Discovery & design** | `/solution-discovery`, `/platform-design` — Requirements, constraints, architecture options |
| **Development workflow** | `/plan`, `/tdd`, `/code-review`, `/security`, `/build-fix`, `/e2e`, etc. |

**Outputs:** Structured JSON (review-score, quality-gate, compliance-report). No free-form reports.

---

## Strengths

- **Federal alignment** — FedRAMP, FISMA, NIST 800-53, DoD ZT, DoD DevSecOps, DT&E Guidebook
- **Evidence-based** — File/config citations; flags missing evidence; no certification claims
- **Structured output** — review-score, quality-gate, compliance-report schemas; schema-valid samples
- **Enforcement** — Plugin blocks secrets; quality-gate blocks push on critical issues
- **Documentation** — Architecture, usage, troubleshooting, glossary, command matrix
- **CI/CD** — Lint, npm audit, verify, tests, schema validation in GitLab CI

---

## Federal Frameworks

Assessments align to these frameworks. Outputs use **readiness**, **gap**, **partial** — never "compliant" or "certified."

| Framework | Scope |
|-----------|-------|
| **FedRAMP** | Low/Moderate/High baselines; cloud authorization |
| **FISMA** | NIST RMF (800-37), security controls |
| **NIST SP 800-53** | Security and privacy controls (AC, AU, IA, SC, SI, CM, CP, IR, SA) |
| **NIST SP 800-53A** | Assessment procedures |
| **NIST SP 800-207** | Zero Trust Architecture |
| **DoD Zero Trust Strategy** | 7 pillars (incl. Automation and orchestration) |
| **DoD Enterprise DevSecOps Fundamentals v2.5** | Supply chain, security-at-each-phase, pipeline |
| **Software DT&E in DevSecOps Guidebook** (Jan 2025) | DT&E planning, SAST/DAST/IAST, SCA, SBOM |
| **NIST SP 800-190** | Container Security |
| **NIST SP 800-171** | CUI protection |

---

## Commands

### Platform & Federal

| Command | Purpose |
|---------|---------|
| `/repo-assess` | Full repository assessment |
| `/solution-discovery` | Discovery: requirements, constraints |
| `/platform-design` | Architecture with tradeoffs |
| `/federal-checklist` | FedRAMP, FISMA, NIST mapping; DoD ZT & DevSecOps |
| `/gitops-audit` | GitOps, CI/CD, IaC maturity |
| `/quality-gate` | Pre-push gate (pass / pass_with_warnings / fail) |
| `/doc-sync` | Documentation drift detection |
| `/verify` | Quick verification |
| `/checkpoint` | Session handoff |
| `/orchestrate` | Multi-step workflow plan |

### Development Workflow

| Command | Purpose |
|---------|---------|
| `/plan` | Implementation plan with risk assessment |
| `/tdd` | TDD workflow (80%+ coverage) |
| `/code-review` | Code quality, security, maintainability |
| `/security` | Comprehensive security review |
| `/build-fix` | Fix build/TypeScript errors |
| `/e2e` | E2E tests with Playwright |
| `/refactor-clean` | Dead code removal |
| `/update-docs`, `/update-codemaps` | Documentation updates |
| `/test-coverage` | Coverage analysis |
| `/go-review`, `/go-test`, `/go-build` | Go-specific workflows |
| `/setup-pm`, `/learn`, `/skill-create`, `/eval` | Setup and utilities |

---

## Agents & Skills

**Agents:** repo-auditor, federal-security-reviewer, gitops-reviewer, solution-architect, planner, architect, code-reviewer, security-reviewer, tdd-guide, build-error-resolver, e2e-runner, doc-updater, refactor-cleaner, go-reviewer, go-build-resolver, database-reviewer, cloud-platform-reviewer, documentation-writer, product-manager-discovery

**Skills:** well-architected-review, federal-platform-review, nist-compliance-evaluator, gitops-capability-audit, aws-federal-grade-checklist, aws/azure/gcp-platform-review, tdd-workflow, security-review

---

## Enforcement & Guardrails

| Plugin | Behavior |
|--------|----------|
| **Block** | `.env` read; dangerous bash; `git push` when `FEDERAL_PLATFORM_BLOCK_PUSH=1` |
| **Warn** | `git push`; secrets in edits |
| **Log** | Supply-chain reminder (Dockerfile, package.json, go.mod) |

**Quality-gate:** Fails on secrets, `:latest` in prod, missing security review for changes, missing docs for meaningful changes.

---

## Scoring

- **Categories:** Security 25%, Reliability 20%, Performance 15%, Cost 10%, Operational Excellence 30%
- **Grades:** A (9.0–10), B (8.0–8.9), C (7.0–7.9), D (5.5–6.9), F (<5.5)
- **Readiness:** ready | conditionally_ready | not_ready

---

## Repo Structure

```
.opencode/          Commands, agents, plugins, instructions
skills/              well-architected-review, federal-platform-review, gitops-capability-audit, etc.
schemas/             review-score, quality-gate, compliance-report
contexts/            solution-discovery question bank, federal-compliance-criteria
docs/                Architecture, usage, scoring, enforcement
.cursor/rules/       Cursor IDE rules
```

---

## Verification

```bash
npm run lint      # ESLint on scripts, tests, plugins
npm run verify    # Structure, schemas, scripts, tests
npm test          # Unit tests + schema validation
```

CI (`.gitlab-ci.yml`): lint, npm audit, verify, tests, schema validation. Kaniko build on tags/branches.

---

## Documentation

| Doc | Purpose |
|-----|---------|
| [INSTALL](INSTALL.md) | Plugin vs full catalog; skills independently |
| [Architecture](docs/architecture.md) | Component map, design principles |
| [Usage](docs/usage.md) | Installation, commands, examples |
| [Command Matrix](docs/command-matrix.md) | "I want to…" → command |
| [Command Routing](docs/command-routing.md) | Command → agent → skill |
| [Quality Gate](docs/quality-gate-workflow.md) | Block/warn/info rules |
| [Enforcement Model](docs/enforcement-model.md) | Plugin vs command vs rules |
| [Troubleshooting](docs/troubleshooting.md) | Common issues and fixes |
| [Glossary](docs/glossary.md) | Federal frameworks, RMF, control families |
| [Before/After](examples/before-after-comparison.md) | Remediation impact example |
| [Sample Outputs](examples/) | sample-federal-checklist-output.json, sample-gitops-audit-output.json (schema-valid) |

---

## How This Differs from Generic Packs

| Aspect | Generic | This pack |
|--------|---------|-----------|
| Evidence | Often generic | File/config citations; flags missing evidence |
| Discovery | Jumps to implementation | Asks questions first; documents assumptions |
| Security | Optional | Plugin blocks; quality-gate blocks push |
| Output | Free-form | Structured schemas |
| Compliance | Vague | FedRAMP, FISMA, NIST, DoD; no certification claims |

---

## Guardrails

- **Evidence required** — Recommendations cite files/configs; missing evidence flagged.
- **No certification claims** — Use "readiness," "gap," "partial."
- **Security blocks push** — Secrets, `:latest`, missing review block push.
- **Docs required** — Meaningful changes require documentation updates.
- **Tagging** — Cloud resources need environment, owner, cost center tags.
