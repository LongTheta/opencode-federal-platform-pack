---
description: Capture session state, decisions, and next steps for handoff
agent: solution-architect
---

# /checkpoint

## Intent

Create checkpoint for session handoff. Summarize task, decisions, files, blockers, next steps. Enable new agent or human to resume.

## When to Run

- Session ending
- Context switch
- Handoff to another team member
- Before long break

## Required Context

- Session context (what was done)
- $ARGUMENTS (optional: focus area)

## Questions to Ask

- What was the current task?
- What decisions were made?
- What files were modified?
- What blockers exist?
- What should happen next?

## Steps

1. Summarize current task and status
2. List key decisions made
3. List files modified or in progress
4. List blockers or dependencies
5. Recommend next steps

## Routing

- **Agent:** solution-architect
- **Skills:** —

## Output Contract

- **Format:** Structured markdown
- **Required:** Five sections (task, decisions, files, blockers, next steps)

## Quality Bar

- Sufficient for resume
- No implementation

## Exit Criteria

- Checkpoint with all five sections
- Actionable next steps

## Blocking Conditions

None.
