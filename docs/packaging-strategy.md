# Packaging Strategy

How the federal platform pack is distributed and consumed.

---

## Distribution Modes

| Mode | Contents | Use Case |
|------|----------|----------|
| **Plugin only** | federal-platform-enforcement.js | Enforcement without commands |
| **Run in repo** | Full repo as config root | Development, evaluation |
| **Copy into project** | .opencode + skills + schemas + contexts + rules + docs | Project-specific adoption |
| **OPENCODE_CONFIG_DIR** | Point to pack root | Shared config across projects |
| **npm (future)** | Plugin package | One-line plugin install |

---

## What Gets Packaged

| Asset | Plugin Only | Full Catalog |
|-------|-------------|--------------|
| federal-platform-enforcement.js | ✓ | ✓ |
| opencode.json | ✗ | ✓ |
| commands/ | ✗ | ✓ |
| agents/ | ✗ | ✓ |
| instructions/ | ✗ | ✓ |
| skills/ | ✗ | ✓ |
| schemas/ | ✗ | ✓ |
| contexts/ | ✗ | ✓ |
| rules/ | ✗ | ✓ |
| docs/ | ✗ | ✓ |
| governance-plugin/ | ✗ | ✓ |
| tools/ (specs) | ✗ | ✓ |

---

## Versioning

- **package.json** — version field (e.g., 0.2.0)
- **Schema $id** — Include version in URL when breaking
- **Backward compatibility** — New commands/agents additive; deprecate with notice

---

## Future: npm Publish

When publishing:

1. `package.json` with `opencode.plugin` pointing to plugin entry
2. `files` array: .opencode, skills, schemas, contexts, rules, docs, INSTALL.md, llms.txt
3. Users add `"plugin": ["opencode-federal-platform-pack"]` to opencode.json
4. Full catalog: clone repo or copy; plugin-only: npm install
