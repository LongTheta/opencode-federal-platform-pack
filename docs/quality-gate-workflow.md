# Quality Gate Workflow

Pre-push quality gate for the federal platform pack. The system acts as if it runs before a developer should push major changes. Defines what to check, when, and how to classify results.

---

## Purpose

Surface blockers, warnings, and informational items so the developer can address them before push. Produce a verdict: **pass**, **pass with warnings**, or **fail**.

---

## Workflow Steps

1. **Gather changed files** — Staged or recent changes (`git diff --staged`, `git diff`, or workspace context).
2. **Classify changes** — Map changes to trigger categories using file patterns (see `.opencode/plugins/governance-hooks.md`).
3. **Run checks** — For each triggered category, evaluate against criteria.
4. **Classify findings** — Block vs. Warn vs. Informational.
5. **Compute verdict** — Pass | Pass with warnings | Fail.
6. **Produce report** — Use `schemas/quality-gate.schema.json` format.

---

## Check Categories and Triggers

### 1. Tests (Added or Updated)

**Trigger:** New or modified production code (`*.py`, `*.js`, `*.ts`, `*.go`, `*.java`, `*.rs`, etc.) — exclude test files.

| Finding | Classification | Action |
|---------|----------------|--------|
| New code without test changes | **Warn** | Recommend adding tests before push |
| Test framework present but new code has no tests | **Warn** | Recommend test coverage |
| CI does not run tests | **Warn** | Recommend adding test step to pipeline |
| Tests added/updated for new code | **Pass** | No finding |

**Block?** No. Tests are a warning.  
**Warn?** Yes when new production code lacks corresponding test changes.

---

### 2. Documentation Updates

**Trigger:** Meaningful change to API, config, build, deploy, or architecture.

| Finding | Classification | Action |
|---------|----------------|--------|
| API/config/deploy change without doc update | **Block** | Require README, runbook, or architecture doc update |
| Build or run steps changed without README update | **Block** | Require README update |
| Architecture or deployment model changed without doc | **Warn** | Recommend ADR or architecture doc |
| Runbook not updated for ops change | **Warn** | Recommend runbook update |
| Docs updated with change | **Pass** | No finding |

**Block?** Yes for meaningful code/config/deploy changes without doc update.  
**Warn?** Yes for architecture or runbook gaps.

---

### 3. Security Review Triggers

**Trigger:** Change to dependencies, CI/CD, containers, or IaC.

**Trigger paths:** `package.json`, `go.mod`, `requirements.txt`, `Cargo.toml`, `Pipfile`; `.github/`, `.gitlab-ci.yml`, `Jenkinsfile`; `Dockerfile`, `docker-compose*`; `*.tf`, `*.bicep`, `cloudformation/`, `cdk/`.

| Finding | Classification | Action |
|---------|----------------|--------|
| Plaintext secrets in code/config | **Block** | Require removal; use external secrets |
| `:latest` or unversioned ref in production config | **Block** | Require pinned digest or version |
| Disabled TLS or overly permissive IAM | **Block** | Require remediation |
| Dependency/CI/container/IaC change without security review | **Block** | Require security review (scan, attestation) |
| Dependency change without lock file | **Block** | Require lock file (package-lock.json, go.sum, etc.) |
| Security review completed; no issues | **Pass** | No finding |

**Block?** Yes for all security-critical issues and for dependency/CI/container/IaC changes without review.  
**Warn?** No.

---

### 4. Architecture Note Triggers

**Trigger:** Infrastructure or deployment model change.

**Trigger paths:** `*.tf`, `*.bicep`, `cloudformation/`, `cdk/`, `helm/`, `kustomize/`, `manifests/`, `deployments/`, `argocd/`, `flux/`.

| Finding | Classification | Action |
|---------|----------------|--------|
| New IaC or cloud resources without architecture note | **Warn** | Recommend ADR or architecture doc update |
| Deployment model changed (new env, new orchestration) | **Warn** | Recommend architecture doc |
| Architecture doc or ADR present | **Pass** | No finding |

**Block?** No. Architecture notes are a warning.  
**Warn?** Yes when infrastructure or deployment model changes without doc.

---

### 5. Changelog Expectations

**Trigger:** Material behavior change (API, config, breaking change).

| Finding | Classification | Action |
|---------|----------------|--------|
| Behavior change without CHANGELOG entry | **Warn** | Recommend CHANGELOG update |
| Release/version bump without CHANGELOG | **Warn** | Recommend CHANGELOG for release |
| CHANGELOG updated | **Pass** | No finding |

**Block?** No. Changelog is a warning.  
**Warn?** Yes when behavior materially changes without changelog.

---

### 6. Ownership and Tagging (Cloud)

**Trigger:** Cloud-related IaC changes (`aws_*`, `azurerm_*`, `google_*` in Terraform, Bicep, CloudFormation).

| Finding | Classification | Action |
|---------|----------------|--------|
| New cloud resources without tags | **Warn** | Recommend environment, owner, cost center tags |
| Production resources missing required tags | **Warn** | Recommend tagging |
| Tags present and complete | **Pass** | No finding |

**Block?** No. Tagging is a warning.  
**Warn?** Yes when cloud resources lack tags.

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
**Warn?** No.  
**Info?** Yes when missing evidence is explicitly called out.

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

---

## References

- `.opencode/plugins/governance-hooks.md` — Trigger patterns and block/warn/info matrix
- `rules/no-push-without-verification.md` — Verification checklist
