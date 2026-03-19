# Runtime Orchestration

How commands, agents, skills, and plugins interact at runtime.

---

## Flow

```
User runs /command
    → OpenCode routes to agent
    → Agent loads prompt + instructions + rules
    → Template references skills (paths)
    → Agent executes workflow (from template + skill)
    → Agent produces output (schema)
    → Plugin hooks fire on tool execution (parallel)
```

---

## Plugin vs Command

| Layer | When | What |
|-------|------|------|
| **Plugin** | tool.execute.before/after, session.idle | Block .env, dangerous bash; warn on push, secrets; log supply-chain |
| **Command** | User invokes /command | Agent runs; produces structured output |

Plugins do not run commands. Commands do not invoke plugins directly. Plugins hook tool execution; commands run agent workflows.

---

## Skill Loading

Agent prompt says "Use skills/X". Agent (model) reads:
- skills/X/SKILL.md
- skills/X/checklist.yaml or checklist.md
- skills/X/output-template.md

No programmatic skill invocation. Model follows instructions.

---

## Schema Validation

Output schemas (review-score, quality-gate, compliance-report) are referenced in templates. Agent is instructed to conform. No runtime JSON schema validation in this pack (future: tool could validate).

---

## Orchestration Patterns

### Sequential (orchestrate)

User runs /orchestrate. Agent produces plan. User runs each step manually (or future: automated).

### Single Command

User runs /repo-assess. Agent runs full workflow in one turn.

### Command Chaining

User runs /repo-assess, then /platform-design with context from report. Manual handoff.
