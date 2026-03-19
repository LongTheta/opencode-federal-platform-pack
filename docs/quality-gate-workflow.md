# Quality Gate Workflow

Pre-push quality gate for the federal platform pack. Defines what to check, when, and how to classify results.

---

## Purpose

Act as if the gate runs before a developer should push major changes. Surface blockers, warnings, and informational items so the developer can address them before push.

---

## Workflow Steps

1. **Gather changed files** — Staged or recent changes (git diff, or workspace context).
2. **Classify changes** — Map changes to trigger categories (tests, docs, security, arch, changelog, cloud, evidence).
3. **Run checks** — For each triggered category, evaluate against criteria.
4. **Classify findings** — Block vs. Warn vs. Informational.
5. **Compute verdict** — Pass | Pass with warnings | Fail.
6. **Produce report** — Use `schemas/quality-gate.schema.json` format.

---

## Check Categories and Triggers

### 1. Tests (Added or Updated)

**Trigger:** New or modified production code (`*.py`, `*.js`, `*.ts`, `*.go`, `*.java`, `*.rs`, etc.).

| Finding | Classification | Action |
|---------|----------------|--------|
| New code without test changes | **Warn** | Recommend adding tests before push |
| Test framework present but new code has no tests | **Warn** | Recommend test coverage |
| CI does not run tests | **Warn** | Recommend adding test step to pipeline |
| Tests added/updated for new code | **Pass** | No finding |

**Block?** No. Tests are a warning.

---

### 2. Documentation

**Trigger:** Meaningful change to API, config, build, deploy, or architecture.

| Finding | Classification | Action |
|---------|----------------|--------|
| API/config/deploy change without doc update | **Block** | Require README, runbook, or architecture doc update |
| Build or run steps changed without README update | **Block** | Require README update |
| Architecture or deployment model changed without doc | **Warn** | Recommend ADR or architecture doc |
| Runbook not updated for ops change | **Warn** | Recommend runbook update |
| Docs updated with change | **Pass** | No finding |

**Block?** Yes for meaningful code/config/deploy changes without doc update.

---

### 3. Security Review Triggers

**Trigger:** Change to dependencies, CI/CD, containers, or IaC.

| Finding | Classification | Action |
|---------|----------------|--------|
| Plaintext secrets in code/config | **Block** | Require removal; use external secrets |
| `:latest` or unversioned ref in production config | **Block** | Require pinned digest or version |
| Disabled TLS or overly permissive IAM | **Block** | Require remediation |
| Dependency/CI/container/IaC change without security review | **Block** | Require security review (scan, attestation) |
| Dependency change without lock file | **Block** | Require lock file (package-lock.json, go.sum, etc.) |
| Security review completed; no issues | **Pass** | No finding |

**Block?** Yes for security-critical issues and for dependency/CI/container/IaC changes without review.

---

### 4. Architecture Note Triggers

**Trigger:** Infrastructure or deployment model change.

| Finding | Classification | Action |
|---------|----------------|--------|
| New IaC or cloud resources without architecture note | **Warn** | Recommend ADR or architecture doc update |
| Deployment model changed (new env, new orchestration) | **Warn** | Recommend architecture doc |
| Architecture doc or ADR present | **Pass** | No finding |

**Block?** No. Architecture notes are a warning.

---

### 5. Changelog

**Trigger:** Material behavior change (API, config, breaking change).

| Finding | Classification | Action |
|---------|----------------|--------|
| Behavior change without CHANGELOG entry | **Warn** | Recommend CHANGELOG update |
| Release/version bump without CHANGELOG | **Warn** | Recommend CHANGELOG for release |
| CHANGELOG updated | **Pass** | No finding |

**Block?** No. Changelog is a warning.

---

### 6. Ownership and Tagging (Cloud)

**Trigger:** Cloud-related IaC changes (`aws_*`, `azurerm_*`, `google_*`).

| Finding | Classification | Action |
|---------|----------------|--------|
| New cloud resources without tags | **Warn** | Recommend environment, owner, cost center tags |
| Production resources missing required tags | **Warn** | Recommend tagging |
| Tags present and complete | **Pass** | No finding |

**Block?** No. Tagging is a warning.

---

### 7. Evidence Strength

**Trigger:** Agent producing review, assessment, or recommendation output.

| Finding | Classification | Action |
|---------|----------------|--------|
| Recommendation without evidence (file, config, line) | **Block** | Require evidence citation |
| Unverified claim presented as fact | **Block** | Require verification or "evidence not found" |
| Missing evidence explicitly called out | **Info** | No action; good practice |
| All findings cite evidence | **Pass** | No finding |

**Block?** Yes when agent output contains recommendations without evidence.

---

## Verdict Logic

| Verdict | Condition |
|---------|-----------|
| **fail** | One or more **block** findings |
| **pass with warnings** | No block findings; one or more **warn** findings |
| **pass** | No block findings; no warn findings |

---

## What Blocks Push Readiness

- Plaintext secrets in code or config
- `:latest` or unversioned ref in production
- Disabled TLS or overly permissive IAM
- Dependency/CI/container/IaC change without security review
- Dependency change without lock file
- Meaningful code/config/deploy change without doc update
- Review output with recommendations without evidence

---

## What Only Warns

- New code without tests
- Architecture or deployment change without ADR
- Runbook not updated for ops change
- Behavior change without CHANGELOG
- New cloud resources without tags
- CI not running tests

---

## What Is Informational

- Missing evidence explicitly called out in review
- Suggestions for improvement
- Best-practice reminders
- Non-critical observations

---

## Usage

1. **Before push:** Run `/quality-gate` or ask "ready to push?"
2. **Review output:** Check verdict and findings.
3. **Address blockers:** Fix all block findings before push.
4. **Address warnings:** Fix warn findings when practical; push allowed but not recommended.
5. **Note informational:** No action required.

---

## Output Schema

See `schemas/quality-gate.schema.json` for the structured output format.
