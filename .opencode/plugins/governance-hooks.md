# Governance Hooks Specification

Pre-push quality gate hooks for the federal platform pack. Defines what to check, when, and how to classify results.

---

## Overview

Governance hooks run before a developer should push major changes. They evaluate staged or recent changes against quality criteria and produce a verdict: **pass**, **pass with warnings**, or **fail**.

---

## Check Categories

### 1. Tests

| Check | Trigger | Block | Warn | Info |
|-------|---------|-------|------|------|
| Tests added/updated for new code paths | New or modified `*.py`, `*.js`, `*.ts`, `*.go`, `*.java`, etc. | — | ✓ | — |
| Test config present | Repo has test framework; new code has no tests | — | ✓ | — |
| Tests run in CI | Pipeline runs tests; tests not in pipeline | — | ✓ | — |

**Block condition:** None. Tests are a warning; blocking would be too strict for incremental work.

**Warn condition:** New production code added without corresponding test changes.

---

### 2. Documentation

| Check | Trigger | Block | Warn | Info |
|-------|---------|-------|------|------|
| Docs updated for meaningful change | API, config, deploy, or architecture change | ✓ | — | — |
| README reflects current setup | Build/deploy/run steps changed | ✓ | — | — |
| Runbooks updated for ops changes | Deployment or operational procedure changed | — | ✓ | — |
| Architecture doc updated | Infrastructure or deployment model changed | — | ✓ | — |

**Block condition:** Meaningful code, config, or deployment change without corresponding doc update (README, runbook, or architecture doc).

**Warn condition:** Architecture or runbook change without doc update.

---

### 3. Security Review Triggers

| Check | Trigger | Block | Warn | Info |
|-------|---------|-------|------|------|
| Dependency change | `package.json`, `go.mod`, `requirements.txt`, `Cargo.toml`, etc. | ✓* | — | — |
| CI/CD change | `.github/`, `.gitlab/`, `Jenkinsfile`, etc. | ✓* | — | — |
| Container change | `Dockerfile`, `docker-compose`, container config | ✓* | — | — |
| IaC change | `*.tf`, `*.bicep`, `cloudformation/`, etc. | ✓* | — | — |
| Plaintext secrets | Any file with secrets, keys, passwords | ✓ | — | — |
| `:latest` in production | Image tag in prod config | ✓ | — | — |
| Disabled TLS or permissive IAM | Config weakening security | ✓ | — | — |

**Block condition:** *Security review required for dependency/CI/container/IaC changes. Block if: plaintext secrets, `:latest` in prod, disabled TLS, overly permissive IAM. For other changes, block if security review was not performed (e.g., no scan, no attestation).

**Warn condition:** Security review triggered but not yet completed; defer to human.

---

### 4. Architecture Note Triggers

| Check | Trigger | Block | Warn | Info |
|-------|---------|-------|------|------|
| Infrastructure change | New/modified IaC, new cloud resources | — | ✓ | — |
| Deployment model change | New deploy path, new environment, new orchestration | — | ✓ | — |
| ADR or architecture doc | Significant architectural decision | — | ✓ | — |

**Block condition:** None. Architecture notes are a warning.

**Warn condition:** Infrastructure or deployment model change without ADR or architecture doc update.

---

### 5. Changelog

| Check | Trigger | Block | Warn | Info |
|-------|---------|-------|------|------|
| Changelog updated for behavior change | API change, config change, breaking change | — | ✓ | — |
| Version bump for release | Release tag or version file | — | ✓ | — |

**Block condition:** None. Changelog is a warning.

**Warn condition:** Material behavior change without CHANGELOG entry.

---

### 6. Ownership and Tagging (Cloud)

| Check | Trigger | Block | Warn | Info |
|-------|---------|-------|------|------|
| Tags on new cloud resources | New `aws_*`, `azurerm_*`, `google_*` in IaC | — | ✓ | — |
| Environment, Owner, CostCenter | Required tags missing | — | ✓ | — |
| Untagged production resources | Prod path without tags | — | ✓ | — |

**Block condition:** None. Tagging is a warning for incremental work.

**Warn condition:** New cloud resources without environment, owner, cost center tags.

---

### 7. Evidence Strength

| Check | Trigger | Block | Warn | Info |
|-------|---------|-------|------|------|
| Recommendations cite evidence | Agent producing review or assessment | ✓ | — | — |
| No unverified claims | Findings without file/config reference | ✓ | — | — |
| Missing evidence called out | Review output | — | — | ✓ |

**Block condition:** Review or assessment output contains recommendations without observable evidence. (Applies when agent is in review mode.)

**Warn condition:** — 

**Info condition:** Missing evidence explicitly called out in output.

---

## Verdict Logic

| Verdict | Condition |
|---------|-----------|
| **fail** | Any block condition is true |
| **pass with warnings** | No block conditions; one or more warn conditions |
| **pass** | No block conditions; no warn conditions (info only or clean) |

---

## Hook Integration Points

| Hook | When | Action |
|------|------|--------|
| Pre-push | User asks "ready to push?" or runs `/quality-gate` | Run full check set |
| File edit | `write` or `edit` on trigger paths | Update internal state |
| Session idle | Session completes | Log warnings if any |

---

## Implementation Notes

- Hooks are implemented as plugins (`.opencode/plugins/*.js`) or invoked via `/quality-gate` command.
- Block conditions are enforced; fail verdict blocks push recommendation.
- Warn conditions are reported; pass with warnings allows push but surfaces items to address.
- Informational items are logged but do not affect verdict.
