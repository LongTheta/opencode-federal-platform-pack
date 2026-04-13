# Installation

Two ways to use this pack: **plugin only** (minimal) or **full catalog** (everything).

---

## Option A: Plugin Only

**Use when:** You want governance enforcement (secrets block, quality-gate reminders, supply-chain checks) without copying the full command/agent/skill catalog.

1. Install the plugin via npm (when published):
   ```bash
   npm install opencode-federal-platform-pack
   ```

2. Add to your OpenCode config (`~/.config/opencode/opencode.json` or `.opencode/opencode.json`):
   ```json
   {
     "plugin": ["opencode-federal-platform-pack"]
   }
   ```

3. Or copy the plugin file into your project:
   ```bash
   mkdir -p .opencode/plugins
   cp path/to/opencode-federal-platform-pack/.opencode/plugins/federal-platform-enforcement.js .opencode/plugins/
   ```

**What you get:** `tool.execute.before` / `tool.execute.after` hooks that block `.env` reads, flag secrets in edits, remind on supply-chain files, and log quality-gate reminders before push. Set `FEDERAL_PLATFORM_BLOCK_PUSH=1` to block `git push` until `/quality-gate` passes.

**What you don't get:** Commands (`/repo-assess`, `/quality-gate`, etc.), agents, skills, instructions. Those require the full catalog.

---

## Option B: Full Catalog (Run in Repo)

**Use when:** You want the full pack—commands, agents, skills, schemas—and will run OpenCode from this repo or point to it.

1. Clone this repository:
   ```bash
   git clone https://github.com/LongTheta/opencode-federal-platform-pack.git
   cd opencode-federal-platform-pack
   npm install
   ```

2. Run OpenCode from the pack root:
   ```bash
   opencode
   ```

   OpenCode loads `.opencode/` from the current directory. All commands, agents, skills, and plugins are available.

---

## Option C: Full Catalog (Install into Project)

**Use when:** You want the full pack applied to an existing project.

1. Copy the `.opencode/` directory into your project root:
   ```bash
   cp -r path/to/opencode-federal-platform-pack/.opencode ./my-project/
   ```

2. Copy supporting directories (skills, schemas, contexts, rules):
   ```bash
   cp -r path/to/opencode-federal-platform-pack/{skills,schemas,contexts,rules,docs} ./my-project/
   ```

3. Or set `OPENCODE_CONFIG_DIR` to the pack root:
   ```bash
   export OPENCODE_CONFIG_DIR=/path/to/opencode-federal-platform-pack
   cd my-project
   opencode
   ```

**Note:** With `OPENCODE_CONFIG_DIR`, instructions and commands reference paths relative to the pack. Skills, schemas, and contexts must be resolvable from that root.

---

## Packaging Distinction

| Mode | Plugin | Full Catalog | Commands | Agents | Skills |
|------|--------|--------------|----------|--------|--------|
| **Plugin only** | ✓ | ✗ | ✗ | ✗ | ✗ |
| **Run in repo** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Install into project** | ✓ | ✓ | ✓ | ✓ | ✓ |

**Plugin installed** = enforcement hooks run during tool execution.  
**Full config copied** = commands, agents, skills, instructions, schemas available.

---

## Verification

After installation:

1. **Plugin:** Edit a `Dockerfile` or `package.json` — you should see a supply-chain reminder in logs. Try reading `.env` — it should be blocked.
2. **Full catalog:** Run `/repo-assess` — you should get a structured review output.

---

## Using Skills Independently

Skills are in `skills/`. Each has `SKILL.md`, checklist, output-template. Use without full pack:

1. Copy the skill directory (e.g., `skills/well-architected-review/`) into your project.
2. Reference from project AI rules, custom prompts, or OpenCode commands: "Use skills/well-architected-review."
3. Ensure `schemas/review-score.schema.json` is available if producing structured output.

Skills do not require the full `.opencode/` catalog. They are documentation + templates.

---

## Future Plugin and Tool Installation

- **Plugin:** When published to npm, add `"plugin": ["opencode-federal-platform-pack"]` to opencode.json. OpenCode installs via Bun at startup.
- **Tools:** Native tools (review-score, quality-gate-check, etc.) are specified in `.opencode/tools/`. When OpenCode supports custom tools from plugins, this pack will expose them. Until then, commands use agent prompts.

---

## Uninstall

- **Plugin:** Remove from `plugin` array in opencode.json; delete `.opencode/plugins/federal-platform-enforcement.js` if copied.
- **Full catalog:** Remove `.opencode/` and copied directories; unset `OPENCODE_CONFIG_DIR`.
