# Governance Plugin Event Model

How OpenCode events map to governance reactions.

---

## Event Types

| Event | Source | When |
|-------|--------|------|
| `tool.execute.before` | OpenCode | Before tool (read, write, edit, bash, etc.) runs |
| `tool.execute.after` | OpenCode | After tool completes |
| `file.edited` | OpenCode | When file is edited (if available) |
| `file.watcher.updated` | OpenCode | When watched file changes |
| `command.executed` | OpenCode | After command completes |
| `session.idle` | OpenCode | Session completes |

---

## Event → Reaction Matrix

| Event | Trigger | Reaction |
|-------|---------|----------|
| **tool.execute.before** | Tool = read, path contains `.env` | **Block** — Throw; do not read |
| **tool.execute.before** | Tool = bash, command matches dangerous pattern | **Block** — Throw |
| **tool.execute.before** | Tool = bash, command contains `git push` | **Warn** — Log reminder |
| **tool.execute.before** | Tool = write/edit, content matches secret pattern | **Warn** — Log |
| **tool.execute.after** | Tool = write/edit, path in supply-chain list | **Log** — Supply-chain reminder |
| **session.idle** | — | Reset state |

---

## Architecture-Related Files Changed

When `tool.execute.after` fires for write/edit on:

- `*.tf`, `*.bicep`, `cloudformation/`, `cdk/`
- `helm/`, `kustomize/`, `manifests/`, `deployments/`, `argocd/`, `flux/`

**Plugin:** Log supply-chain reminder (IaC is supply-chain relevant).

**Quality-gate (command):** If architecture/deployment model changed without ADR → **warn**.

---

## CI/CD Files Changed

When write/edit on:

- `.github/`, `.gitlab-ci.yml`, `Jenkinsfile`, `Dockerfile`, `docker-compose*`

**Plugin:** Log supply-chain reminder.

**Quality-gate (command):** If dep/CI/container/IaC change without security review → **block**.

---

## Docs Missing for Meaningful Changes

**Plugin:** Does not detect. Quality-gate command evaluates when run.

**Quality-gate (command):** If meaningful code/config/deploy change without doc update → **block**.

---

## Evidence Missing in Findings

**Plugin:** Does not evaluate review output. Quality-gate command evaluates when run.

**Quality-gate (command):** If recommendation without evidence → **block**.

---

## No Push Readiness Without Quality-Gate Pass

**Plugin:** Warns when `git push` is in command. Does not block (configurable).

**Quality-gate (command):** Produces verdict. User must not push if verdict = fail.

**Enforcement:** Social/process. Plugin reminds; user runs quality-gate; user decides.

---

## Summary

| Concern | Plugin | Quality-Gate Command |
|---------|--------|----------------------|
| .env read | Block | — |
| Dangerous bash | Block | — |
| git push | Warn | — |
| Secrets in edit | Warn | — |
| Supply-chain file edit | Log | — |
| Architecture change no ADR | — | Warn |
| CI/IaC change no security review | — | Block |
| Meaningful change no doc | — | Block |
| Recommendation no evidence | — | Block |
