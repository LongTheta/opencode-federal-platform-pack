---
description: Quick verification — quality-gate checks and status
agent: repo-auditor
---

# /verify

## Intent

Quick verification pass. Focused quality-gate checks: staged changes, security, docs, evidence. Faster than full /quality-gate.

## When to Run

- Mid-session check
- After small change set
- Before full quality-gate

## Required Context

- Repository workspace
- Staged or recent changes
- docs/quality-gate-workflow.md, schemas/quality-gate.schema.json

## Questions to Ask

- What changed? (staged/unstaged)
- Secrets? :latest? Lock files?
- Docs updated for meaningful changes?
- Evidence in review output?

## Steps

1. Focused pass on staged/unstaged changes
2. Security: secrets, :latest, lock files
3. Docs for meaningful changes
4. Evidence citations in review output
5. Verdict and next steps

## Routing

- **Agent:** repo-auditor
- **Skills:** quality-gate-workflow
- **Tools (future):** quality-gate-check

## Output Contract

- **Schema:** schemas/quality-gate.schema.json
- **Required:** verdict, blockers, warnings, next steps (concise)

## Quality Bar

- Same block/warn logic as quality-gate
- Concise output

## Exit Criteria

- Verdict and findings
- Next steps when fail

## Blocking Conditions

- **Verdict fail blocks push readiness.**
