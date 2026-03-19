# Plugin and Hook Model

How the federal platform pack uses OpenCode plugins and hooks for enforcement.

---

## Overview

| Layer | Type | Purpose |
|-------|------|---------|
| **Plugin** | JavaScript (federal-platform-enforcement.js) | Block/warn at tool execution |
| **Governance spec** | Markdown (governance-plugin/) | Event model, rules-map, plugin contract |
| **Quality-gate command** | Command | Full check; verdict; blockers, warnings |
| **Rules** | Instructions (rules/*.md) | Guide model behavior; no programmatic block |

---

## Plugin Hooks

| Hook | When | Behavior |
|------|------|----------|
| `tool.execute.before` | Before read, write, edit, bash | Block .env read; block dangerous bash; warn on git push; warn on secrets in write/edit |
| `tool.execute.after` | After write/edit | Log supply-chain reminder when editing Dockerfile, package.json, go.mod, etc. |
| `session.idle` | Session completes | Reset state |

---

## Event Model

See `.opencode/plugins/governance-plugin/event-model.md` for full event → reaction matrix.

**Plugin handles:** tool-level blocks and warnings.  
**Quality-gate command handles:** full check set; verdict; block/warn/info classification per rules-map.

---

## Rules Map

See `.opencode/plugins/governance-plugin/rules-map.md` for block/warn/info matrix.

**Block:** Plaintext secrets, :latest in prod, dep change without lock, meaningful change without doc, recommendation without evidence.  
**Warn:** New code without tests, architecture change without ADR, cloud resources without tags.  
**Info:** Missing evidence explicitly called out.

---

## Governance Hooks (Legacy)

`governance-hooks.md` in plugins/ defined the original spec. Logic is consolidated into:
- `governance-plugin/rules-map.md` — Block/warn/info
- `governance-plugin/event-model.md` — Event reactions
- `docs/quality-gate-workflow.md` — Workflow steps

---

## References

- `.opencode/plugins/governance-plugin/README.md`
- `docs/enforcement-model.md`
- `docs/quality-gate-workflow.md`
