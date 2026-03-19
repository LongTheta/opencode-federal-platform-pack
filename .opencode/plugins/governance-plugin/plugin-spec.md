# Governance Plugin Specification

Contract for the federal platform pack governance plugin. Defines hooks, behavior, and integration points.

---

## Plugin Identity

- **Name:** federal-platform-enforcement
- **Location:** `.opencode/plugins/federal-platform-enforcement.js`
- **Type:** OpenCode plugin (JavaScript module exporting hooks)

---

## Hooks Implemented

| Hook | When | Behavior |
|------|------|----------|
| `tool.execute.before` | Before any tool runs | Block .env reads; block dangerous bash; warn on git push; warn on secrets in write/edit |
| `tool.execute.after` | After write/edit | Log supply-chain reminder when editing Dockerfile, package.json, go.mod, etc. |
| `session.idle` | Session completes | Reset state; do not block |

---

## Block Conditions (tool.execute.before)

| Condition | Action |
|-----------|--------|
| Read `.env` file | Throw; block execution |
| Bash command matches dangerous pattern (rm -rf /, etc.) | Throw; block execution |

---

## Warn Conditions (tool.execute.before)

| Condition | Action |
|-----------|--------|
| `git push` in command | Log: "Consider running /quality-gate before push" |
| Write/edit content matches secret pattern | Log: "Potential secret detected; use secrets manager" |

---

## Log Conditions (tool.execute.after)

| Condition | Action |
|-----------|--------|
| Edit Dockerfile, package.json, go.mod, requirements.txt, Pipfile, Cargo.toml, .github/, .gitlab/ | Log: "Supply-chain file edited; pin deps, avoid :latest, consider SBOM" |

---

## Quality Gate Integration

The `/quality-gate` and `/verify` commands use `rules-map.md` logic. They are **commands**, not plugin hooks. The plugin does not run quality-gate checks; it only blocks/warns at tool level.

**Separation:**
- **Plugin:** Blocks .env, dangerous bash; warns on push, secrets; logs supply-chain
- **Quality-gate command:** Full check set; verdict; blockers, warnings, informational

---

## Output Classification (Quality Gate)

When quality-gate runs (via command):

| Verdict | Condition |
|---------|-----------|
| **fail** | One or more block findings |
| **pass with warnings** | No block; one or more warn |
| **pass** | No block; no warn |

---

## References

- `event-model.md` — Event types and reactions
- `rules-map.md` — Block/warn/info matrix for quality-gate
