---
description: Plan multi-step workflow (review → design → federal check) with dependencies
agent: solution-architect
---

# /orchestrate

## Intent

Plan multi-step platform engineering workflow. Given goal, produce ordered plan with commands, inputs, outputs, dependencies.

## When to Run

- Starting complex platform effort
- Federal deployment preparation
- Migration or redesign project

## Required Context

- Goal from $ARGUMENTS
- Knowledge of commands: repo-assess, solution-discovery, platform-design, federal-checklist, gitops-audit, quality-gate

## Questions to Ask

- What is the end goal?
- Federal context?
- Assessment first or discovery first?

## Steps

1. Parse goal
2. Select workflow pattern (e.g., repo-assess → platform-design → federal-checklist)
3. For each step: command, inputs, expected output, next-step trigger
4. Output numbered plan with dependencies

## Routing

- **Agent:** solution-architect
- **Skills:** —

## Output Contract

- **Format:** Numbered plan with dependencies
- **Required:** At least 2 steps; command per step; next-step trigger

## Quality Bar

- Logical dependency order
- Commands exist in pack

## Exit Criteria

- Plan with 2+ steps
- Dependencies clear

## Blocking Conditions

None.
