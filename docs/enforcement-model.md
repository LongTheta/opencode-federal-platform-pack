# Enforcement Model

What gets enforced, when, and how.

---

## Plugin Enforcement (Runtime)

The `federal-platform-enforcement` plugin runs during OpenCode sessions. Hooks fire on tool execution.

### tool.execute.before

| Condition | Action |
|-----------|--------|
| Read `.env` file | **Block** — Throw error; do not read |
| Dangerous bash (`rm -rf /`, etc.) | **Block** — Throw error |
| `git push` | **Warn** by default; **Block** if `FEDERAL_PLATFORM_BLOCK_PUSH=1` |
| Write/edit contains potential secret | **Warn** — Log; do not block |

### tool.execute.after

| Condition | Action |
|-----------|--------|
| Edit Dockerfile, package.json, go.mod, etc. | **Log** — Supply-chain reminder: pin deps, avoid :latest, consider SBOM |

---

## Quality Gate (Command)

`/quality-gate` and `/verify` are commands, not automated hooks. They run when the user invokes them. Output: pass / pass with warnings / fail.

### Block (Fail)

- Plaintext secrets in code/config
- `:latest` or unversioned ref in production path
- Disabled TLS or overly permissive IAM
- Dependency/CI/container/IaC change without security review
- Dependency change without lock file
- Meaningful code/config/deploy change without doc update
- Recommendation without evidence; unverified claim as fact

### Warn (Pass with Warnings)

- New code without tests
- CI not running tests
- Architecture/runbook change without doc
- New IaC or deployment model change without ADR
- Behavior change without CHANGELOG
- Cloud resources without tags

---

## Rules (Instructions)

Loaded via `opencode.json` instructions. They guide the model; they do not programmatically block.

| Rule | Effect |
|------|--------|
| evidence-before-claims | Model must cite evidence; flag missing evidence |
| no-push-without-verification | Model must recommend quality-gate before push |
| docs-required-for-meaningful-change | Model must require doc updates for meaningful changes |
| security-review-required-for-build-changes | Model must require security review for dep/CI/container/IaC changes |
| tagging-required-for-cloud-resources | Model must require tags for cloud resources |

---

## Enforcement vs Guidance

| Layer | Enforcement | Guidance |
|-------|-------------|----------|
| **Plugin** | Block .env read, dangerous bash | Warn on secrets, supply-chain, push |
| **Quality gate** | Report fail; user decides whether to push | — |
| **Rules** | — | Model behavior; no programmatic block |

---

## When Enforcement Fires

| Event | Plugin | Quality Gate | Rules |
|-------|--------|--------------|-------|
| User runs `read .env` | Block | — | — |
| User runs `git push` | Warn | — | Remind |
| User runs `/quality-gate` | — | Execute | — |
| User edits Dockerfile | Log | — | — |
| Model recommends without evidence | — | Fail if in gate | Guide |
