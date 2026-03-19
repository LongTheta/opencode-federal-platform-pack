# Current State Assessment

**Date:** 2025-03  
**Scope:** opencode-federal-platform-pack upgrade to executable, installable OpenCode-native platform pack

---

## 1. What Already Exists and Is Good

| Asset | Status |
|-------|--------|
| **opencode.json** | 9 commands, 6 agents, 8 instructions + rules; templates reference skills and schemas |
| **Commands** | repo-assess, solution-discovery, platform-design, federal-checklist, gitops-audit, quality-gate, verify, checkpoint, orchestrate — all have agent mappings |
| **Agents** | 6 specialized agents with prompts; subagent mode; read-only tools |
| **Skills** | 8 skills with SKILL.md, checklist, output-template; well-architected-review, federal-platform-review, gitops-capability-audit, nist-compliance-evaluator, aws-federal-grade-checklist, aws/azure/gcp-platform-review |
| **Schemas** | review-score.schema.json (canonical), quality-gate.schema.json, compliance-report.json, well-architected-score.json |
| **Scoring model** | docs/scoring-model.md with weights, letter grades, confidence, production readiness |
| **Plugins** | federal-platform-enforcement.js (blocks .env, dangerous bash; warns on secrets, git push; supply-chain reminders); pre-merge-quality.js; supply-chain-guard.js |
| **Governance spec** | governance-hooks.md defines block/warn/info; quality-gate-workflow.md operational |
| **Rules** | 5 rules: evidence-before-claims, no-push-without-verification, docs-required, security-review, tagging-required |
| **Docs** | usage, architecture, command-routing, enforcement-model, scoring-model, report-template, quality-gate-workflow |
| **INSTALL.md, MIGRATION.md, llms.txt** | Present from v0.2 work |

---

## 2. What Is Documentation-Only and Not Executable

| Item | Gap |
|------|-----|
| **doc-sync** | Command not defined; user requested it |
| **documentation-writer** | Agent not defined |
| **Plugin wiring** | opencode.json has `"plugin": []`; plugins load from directory but no explicit registration |
| **Native tools** | No tool specs; commands rely on agent prompts, not tool calls |
| **Skill orchestration** | Skills referenced in templates but no documented workflow graph or routing matrix |
| **Command lifecycle** | Command .md files are thin; no intent, when-to-run, required context, steps, output contract, exit criteria |
| **Routing schema** | No command-routing.schema.json or routing-matrix.md |

---

## 3. What Is Missing Compared to a Mature OpenCode Pack

| Gap | Description |
|-----|-------------|
| **Governance plugin structure** | No `.opencode/plugins/governance-plugin/` with README, plugin-spec, event-model, rules-map |
| **Native tool designs** | No `.opencode/tools/` with review-score, quality-gate-check, evidence-extractor, federal-control-mapper, target-architecture-synthesizer |
| **Command lifecycle design** | Commands lack: intent, when to run, required context, questions to ask, steps, routing, output contract, quality bar, exit criteria |
| **Skill orchestration docs** | No command-to-skill-mapping.md, runtime-orchestration.md |
| **Packaging strategy** | No docs/packaging-strategy.md; INSTALL exists but packaging distinction could be clearer |
| **Plugin-and-hook model** | No docs/plugin-and-hook-model.md consolidating governance-hooks, enforcement, event model |
| **Example end-to-end** | examples/end-to-end-review-run.md exists; user asked for docs/example-end-to-end-review.md (may consolidate) |
| **Scoring engine wiring** | federal-checklist uses compliance-report + well-architected-score; should also use review-score for consistency |

---

## 4. Where Runtime Behavior Is Unclear or Not Wired

| Area | Issue |
|------|-------|
| **Plugin load order** | OpenCode auto-loads from `.opencode/plugins/`; federal-platform-enforcement, supply-chain-guard, pre-merge-quality all load; supply-chain overlap with federal-platform-enforcement |
| **Command → skill flow** | Templates say "use skills/X" but no explicit step sequence; agent infers |
| **Blocking conditions** | Quality gate blocks are in docs; plugin blocks .env and dangerous bash; no single source of truth for "what blocks push" |
| **Definition of done** | Commands lack explicit exit criteria |

---

## 5. What Should Be Preserved vs Refactored

| Preserve | Refactor |
|----------|----------|
| All 6 agents, their prompts | Add documentation-writer agent |
| All 8 skills, their structure | Consolidate supply-chain-guard into federal-platform-enforcement; remove redundant plugin |
| review-score.schema.json as canonical | Deprecate platform-review-report.json; align federal-checklist to review-score |
| quality-gate.schema.json | Keep as-is |
| governance-hooks.md logic | Move into governance-plugin/; consolidate with quality-gate-workflow |
| Rules and instructions | Keep; ensure no duplication |
| Command templates in opencode.json | Enrich with blocking conditions, output schema, definition of done |

---

## 6. Proposed Implementation Plan

### Phase 2 — Executable Pack
- Add /doc-sync command; add documentation-writer agent
- Enrich each command in opencode.json with: purpose, primary agent, supporting skills, output schema, blocking conditions, definition of done (in command .md files and/or opencode.json)
- Update .opencode/README.md

### Phase 3 — Governance Plugin
- Create `.opencode/plugins/governance-plugin/` with README.md, plugin-spec.md, event-model.md, rules-map.md
- Consolidate governance-hooks.md and quality-gate-workflow logic into rules-map
- Define event reactions: file.edited, command.completed, tool.execute.before/after, architecture/CI/IaC changes, docs missing, evidence missing

### Phase 4 — Native Tool Designs
- Create `.opencode/tools/` with README.md, review-score.md, quality-gate-check.md, evidence-extractor.md, federal-control-mapper.md, target-architecture-synthesizer.md
- Each: purpose, inputs, outputs, when to call, failure cases, schema refs, example usage

### Phase 5 — Command Lifecycle
- Refactor each command .md: intent, when to run, required context, questions to ask, steps, routing, output contract, quality bar, exit criteria
- Remove duplication between commands, agents, skills

### Phase 6 — Skill Orchestration
- Create docs/command-to-skill-mapping.md, docs/runtime-orchestration.md
- Create schemas/command-routing.schema.json, docs/routing-matrix.md

### Phase 7 — Packaging
- Update INSTALL.md; ensure .opencode/MIGRATION.md; update llms.txt
- Create docs/plugin-and-hook-model.md, docs/packaging-strategy.md
- Create or consolidate docs/example-end-to-end-review.md

### Phase 8 — Scoring Engine
- Wire review-score.schema.json to repo-assess, gitops-audit, federal-checklist, verify
- Align docs/scoring-model.md, docs/report-template.md, schemas, examples

### Phase 9 — Cleanup
- Remove redundant docs; merge overlapping concepts; rename unclear files
- Ensure rules, instructions, commands, skills have distinct jobs
- Improve README: executable behavior, commands, agents, skills, plugins, scoring, pre-push governance
