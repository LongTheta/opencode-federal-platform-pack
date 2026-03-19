# Governance Plugin

OpenCode plugin specification for federal platform pack enforcement. Defines how the pack reacts to events and enforces quality, security, and evidence rules.

---

## Purpose

- **Block** unsafe actions (read .env, dangerous bash)
- **Warn** before push without quality-gate; flag secrets in edits; supply-chain reminders
- **Classify** quality-gate findings: block, warn, informational
- **Produce** verdict: pass | pass with warnings | fail

---

## Contents

| File | Purpose |
|------|----------|
| `README.md` | This file |
| `plugin-spec.md` | Plugin contract, hooks, behavior |
| `event-model.md` | Event types and reactions |
| `rules-map.md` | Block/warn/info matrix; trigger patterns |

---

## Implementation

Runtime enforcement is implemented in:

- `../federal-platform-enforcement.js` — tool.execute.before/after; blocks .env, dangerous bash; warns on secrets, git push; supply-chain reminders
- `/quality-gate` and `/verify` commands — invoke rules-map logic via agent

---

## References

- `docs/quality-gate-workflow.md` — Workflow steps
- `docs/enforcement-model.md` — Plugin vs command vs rules
- `schemas/quality-gate.schema.json` — Output format
