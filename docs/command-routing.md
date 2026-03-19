# Command Routing

How OpenCode commands map to agents and skills.

---

## Command → Agent → Skill Graph

| Command | Agent | Primary Skills | Output Schema |
|---------|-------|----------------|---------------|
| `/repo-assess` | repo-auditor | well-architected-review | review-score.schema.json |
| `/solution-discovery` | solution-architect | — | Discovery summary |
| `/platform-design` | solution-architect | aws-derived-principles | Architecture options |
| `/federal-checklist` | federal-security-reviewer | federal-platform-review, nist-compliance-evaluator, aws-federal-grade-checklist | compliance-report.json |
| `/gitops-audit` | gitops-reviewer | gitops-capability-audit, well-architected-review | Capability findings |
| `/quality-gate` | repo-auditor | quality-gate-workflow | quality-gate.schema.json |
| `/verify` | repo-auditor | quality-gate-workflow | quality-gate.schema.json |
| `/checkpoint` | solution-architect | — | Checkpoint markdown |
| `/orchestrate` | solution-architect | — | Workflow plan |

---

## Skill Invocation

Commands reference skills via their templates. The agent prompt instructs the model to use the skill's checklist, output format, and evidence rules.

**Example: `/repo-assess`**

1. User runs `/repo-assess`
2. OpenCode routes to `repo-auditor` agent
3. Template says: "Use skills/well-architected-review"
4. Agent loads `skills/well-architected-review/SKILL.md`, `output-template.md`, `checklist.yaml`
5. Agent evaluates repo against categories
6. Output conforms to `schemas/review-score.schema.json`

---

## Lifecycle Commands

| Phase | Commands |
|-------|----------|
| **Planning** | /solution-discovery, /orchestrate |
| **Review** | /repo-assess, /gitops-audit, /federal-checklist |
| **Design** | /platform-design |
| **Verification** | /verify, /quality-gate |
| **Handoff** | /checkpoint |

---

## Adding a Command

1. Add entry to `opencode.json` under `command`
2. Create `.opencode/commands/<name>.md` with purpose and usage
3. Map to an agent; ensure agent prompt references required skills
4. Document in this file and README
