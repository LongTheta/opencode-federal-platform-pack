# Migration Guide

Moving from another OpenCode pack, standalone project rules, or a custom setup to the federal platform pack.

---

## From editor-only setup (no OpenCode)

If you use project AI rules under `.agent/rules/` (or similar) and no OpenCode:

1. **Install OpenCode** (if not already): [opencode.ai](https://opencode.ai)
2. **Copy the pack** into your project or set `OPENCODE_CONFIG_DIR` to the pack root.
3. **Optional rules** — You can keep editor-local rules for IDE hints while using OpenCode for commands and agents; paths and formats depend on your environment.
4. **Commands** — OpenCode commands (`/repo-assess`, `/quality-gate`) run in OpenCode. In other tools, use the same concepts via mentions or by pasting command templates into chat.

---

## From Another OpenCode Pack

If you already use an OpenCode pack (e.g., ECC, another platform pack):

1. **Backup** your current `.opencode/` and `opencode.json`.
2. **Merge vs replace:**
   - **Replace:** Copy this pack's `.opencode/` over yours. You lose custom agents/commands.
   - **Merge:** Copy commands and agents you want; merge `instructions` arrays; add this pack's plugins to your `plugin` array.
3. **Plugin conflict:** If both packs have plugins, both load. Hooks run in sequence. Ensure no conflicting `tool.execute.before` blocks (e.g., both blocking `.env` is fine; one blocking and one allowing would conflict).
4. **Paths:** Instructions and commands reference `../skills/`, `../schemas/`, etc. Ensure those directories exist relative to the config root.

---

## From Generic AI Assistant

If you use a generic AI coding assistant with no pack:

1. **Start with Option B (Run in Repo)** — Clone this pack, run OpenCode from it. Easiest way to try everything.
2. **Or Option A (Plugin Only)** — Copy `federal-platform-enforcement.js` into `.opencode/plugins/` of your project. You get enforcement without commands.
3. **Optional project rule** — Add a project rule file under `.agent/rules/` (or your editor’s convention) if you want local guidance alongside OpenCode.

---

## Schema Changes

If you have custom schemas or tools that consume `platform-review-report.json`:

- **New canonical schema:** `review-score.schema.json` — Use this for new integrations. It has `categories` (not `category_scores`) and structured findings.
- **platform-review-report.json** — Still present for compatibility. Consider migrating to `review-score.schema.json`.

---

## Rollback

1. Restore your previous `.opencode/` from backup.
2. Remove this pack's plugins from `plugin` array if merged.
3. Unset `OPENCODE_CONFIG_DIR` if used.
