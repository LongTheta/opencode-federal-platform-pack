---
description: Solution architect discovery — requirements, budget, constraints, compliance
agent: solution-architect
---

# /solution-discovery

## Intent

Ask clarifying questions about requirements, budget, timeline, users, compliance, and integrations. Produce discovery summary with assumptions, constraints, and open questions.

## When to Run

- Before platform-design when requirements are vague
- At start of new project or migration
- When stakeholder context is missing

## Required Context

- Goal or problem statement ($ARGUMENTS)
- Access to contexts/solution-discovery-question-bank.md

## Questions to Ask

- Who are the users? What scale?
- What compliance (FedRAMP, NIST, HIPAA)?
- Budget and timeline constraints?
- Integrations and dependencies?
- Failure tolerance (RTO/RPO)?

## Steps

1. Parse goal from $ARGUMENTS
2. Ask clarifying questions (from question bank)
3. Synthesize assumptions and constraints
4. Produce discovery summary with open questions
5. Recommend next steps

## Routing

- **Agent:** solution-architect
- **Skills:** —
- **Context:** solution-discovery-question-bank.md

## Output Contract

- **Format:** Structured markdown
- **Required:** Discovery summary, assumptions, constraints, open questions, recommended next steps

## Quality Bar

- No design recommendations yet; discovery only
- Assumptions explicitly stated
- Open questions listed for stakeholder

## Exit Criteria

- Discovery summary complete
- Assumptions and constraints documented
- Open questions identified

## Blocking Conditions

None.
