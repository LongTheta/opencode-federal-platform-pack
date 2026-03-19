# Governance Hooks Specification

Pre-push quality gate hooks for the federal platform pack. Defines what to check, when, and how to classify results. The system acts as if it runs before a developer should push major changes.

---

## Overview

Governance hooks evaluate staged or recent changes against quality criteria and produce a verdict: **pass**, **pass with warnings**, or **fail**.

**Integration:** Invoked via `/quality-gate` command or when user asks "ready to push?" See `docs/quality-gate-workflow.md` for workflow. Output format: `schemas/quality-gate.schema.json`.

---

## Trigger File Patterns

Use these patterns to determine which checks apply. Inspect `git diff --staged` or `git diff` for changed paths.

| Check Category | Trigger Paths / Patterns |
|----------------|--------------------------|
| **Tests** | `*.py`, `*.js`, `*.ts`, `*.tsx`, `*.go`, `*.java`, `*.rs`, `*.rb`, `*.php`, `*.cs` (exclude `*_test.*`, `*.test.*`, `*.spec.*`) |
| **Documentation** | API code, `config/*`, `*.yaml`, `*.yml`, build scripts, deploy manifests, `Dockerfile`, `docker-compose*` |
| **Security** | `package.json`, `go.mod`, `requirements.txt`, `Cargo.toml`, `Pipfile`, `.github/`, `.gitlab-ci.yml`, `Jenkinsfile`, `Dockerfile`, `docker-compose*`, `*.tf`, `*.bicep`, `cloudformation/`, `cdk/` |
| **Architecture** | `*.tf`, `*.bicep`, `cloudformation/`, `cdk/`, `helm/`, `kustomize/`, `manifests/`, `deployments/`, `argocd/`, `flux/` |
| **Changelog** | API changes, config schema changes, breaking changes, `package.json` version, release tags |
| **Ownership/Tagging** | `aws_*`, `azurerm_*`, `google_*` in IaC; `*.tf`, `*.bicep`, `cloudformation/` |
| **Evidence strength** | Agent review output; recommendations; findings |

---

## Check Categories: Block / Warn / Info

### 1. Tests (Added or Updated)

| Finding | Classification | Condition |
|---------|----------------|-----------|
| New production code without test changes | **Warn** | Triggered: new/modified prod code. No corresponding `*_test.*`, `*.test.*`, `*.spec.*` change. |
| Test framework present but new code has no tests | **Warn** | Repo has pytest, jest, go test, etc.; new code path untested. |
| CI does not run tests | **Warn** | Pipeline exists; no test step. |
| Tests added/updated for new code | **Pass** | No finding. |

**Blocks push?** No.  
**Warns?** Yes when new code lacks tests.

---

### 2. Documentation Updates

| Finding | Classification | Condition |
|---------|----------------|-----------|
| API/config/deploy change without doc update | **Block** | Meaningful change to API, config, build, or deploy; no README, runbook, or architecture doc update. |
| Build or run steps changed without README update | **Block** | Build/deploy/run instructions changed; README not updated. |
| Architecture or deployment model changed without doc | **Warn** | Infrastructure or deployment model change; no ADR or architecture doc. |
| Runbook not updated for ops change | **Warn** | Ops procedure changed; runbook not updated. |
| Docs updated with change | **Pass** | No finding. |

**Blocks push?** Yes for meaningful code/config/deploy changes without doc update.  
**Warns?** Yes for architecture/runbook gaps.

---

### 3. Security Review Triggers

| Finding | Classification | Condition |
|---------|----------------|-----------|
| Plaintext secrets in code/config | **Block** | Secrets, keys, passwords in code, config, or pipeline. |
| `:latest` or unversioned ref in production | **Block** | Image or artifact ref uses `:latest` or unversioned in prod path. |
| Disabled TLS or overly permissive IAM | **Block** | Config weakens security (TLS off, `*` in IAM). |
| Dependency/CI/container/IaC change without security review | **Block** | Change to deps, CI, container, or IaC; no scan, attestation, or review. |
| Dependency change without lock file | **Block** | package.json, go.mod, etc. changed; lock file absent or not updated. |
| Security review completed; no issues | **Pass** | No finding. |

**Blocks push?** Yes for all block conditions.  
**Warns?** No (security is block or pass).

---

### 4. Architecture Note Triggers

| Finding | Classification | Condition |
|---------|----------------|-----------|
| New IaC or cloud resources without architecture note | **Warn** | New/modified IaC or cloud resources; no ADR or architecture doc. |
| Deployment model changed without doc | **Warn** | New env, new orchestration, new deploy path; no architecture doc. |
| Architecture doc or ADR present | **Pass** | No finding. |

**Blocks push?** No.  
**Warns?** Yes when infrastructure or deployment model changes without doc.

---

### 5. Changelog Expectations

| Finding | Classification | Condition |
|---------|----------------|-----------|
| Behavior change without CHANGELOG entry | **Warn** | API, config, or behavior materially changed; no CHANGELOG update. |
| Release/version bump without CHANGELOG | **Warn** | Version bumped or release tagged; no CHANGELOG entry. |
| CHANGELOG updated | **Pass** | No finding. |

**Blocks push?** No.  
**Warns?** Yes when behavior materially changes without changelog.

---

### 6. Ownership and Tagging (Cloud)

| Finding | Classification | Condition |
|---------|----------------|-----------|
| New cloud resources without tags | **Warn** | New `aws_*`, `azurerm_*`, `google_*` resources; missing environment, owner, cost center. |
| Production resources missing required tags | **Warn** | Prod path; tags incomplete. |
| Tags present and complete | **Pass** | No finding. |

**Blocks push?** No.  
**Warns?** Yes when cloud resources lack tags.

---

### 7. Evidence Strength

| Finding | Classification | Condition |
|---------|----------------|-----------|
| Recommendation without evidence | **Block** | Agent output contains recommendation without file/config/line citation. |
| Unverified claim presented as fact | **Block** | Claim without evidence; not labeled "evidence not found." |
| Missing evidence explicitly called out | **Info** | Good practice; no action. |
| All findings cite evidence | **Pass** | No finding. |

**Blocks push?** Yes when agent output has recommendations without evidence.  
**Warns?** No.  
**Info?** Yes when missing evidence is explicitly called out.

---

## What Blocks Push Readiness

| Category | Block Condition |
|----------|-----------------|
| Documentation | Meaningful code/config/deploy change without doc update |
| Security | Plaintext secrets; `:latest` in prod; disabled TLS; permissive IAM |
| Security | Dependency/CI/container/IaC change without security review |
| Security | Dependency change without lock file |
| Evidence | Recommendation without evidence; unverified claim as fact |

---

## What Only Warns

| Category | Warn Condition |
|----------|----------------|
| Tests | New code without tests; CI not running tests |
| Documentation | Architecture/runbook change without doc |
| Architecture | New IaC or deployment model change without ADR |
| Changelog | Behavior change without CHANGELOG |
| Ownership/Tagging | Cloud resources without tags |

---

## What Is Informational

| Category | Info Condition |
|----------|----------------|
| Evidence | Missing evidence explicitly called out in output |
| General | Best-practice reminders; non-critical observations |
| General | Suggestions for improvement |

---

## Verdict Logic

| Verdict | Condition |
|---------|-----------|
| **fail** | One or more **block** findings |
| **pass with warnings** | No block findings; one or more **warn** findings |
| **pass** | No block findings; no warn findings (info only or clean) |

---

## Hook Integration Points

| Hook | When | Action |
|------|------|--------|
| Pre-push | User asks "ready to push?" or runs `/quality-gate` | Run full check set; output verdict and findings |
| File edit | `write` or `edit` on trigger paths | Internal state; may surface reminder |
| Session idle | Session completes | Log warnings if any; do not block |

---

## References

- `docs/quality-gate-workflow.md` — Full workflow and check details
- `schemas/quality-gate.schema.json` — Output format
- `rules/no-push-without-verification.md` — Verification checklist
