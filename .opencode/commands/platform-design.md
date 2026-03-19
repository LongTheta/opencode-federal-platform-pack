---
description: Platform architecture design with tradeoffs and cloud alignment
agent: solution-architect
---

# /platform-design

## Intent

Design platform architecture from constraints. Present 1–3 options with tradeoffs, risks, and evidence. Flag designs that would fail Well-Architected review.

## When to Run

- After solution-discovery when constraints are known
- When migrating or redesigning architecture
- As part of orchestrate → solution-discovery → platform-design

## Required Context

- Constraints from $ARGUMENTS or prior discovery
- instructions/aws-derived-principles.md

## Questions to Ask

- What are the scale, compliance, and cost constraints?
- What is the failure tolerance?
- Single cloud or multi-cloud?
- Event-driven vs request-response?

## Steps

1. Discovery — constraints from context
2. Constraints synthesis — scale, compliance, cost
3. Reference architecture — 1–3 options
4. Decision log — tradeoffs, risks
5. Flag Well-Architected failures

## Routing

- **Agent:** solution-architect
- **Skills:** aws-derived-principles
- **Tools (future):** target-architecture-synthesizer

## Output Contract

- **Format:** Executive Summary, Architecture Score (0–10 per pillar), Key Risks, Evidence/Missing Evidence, Recommended Actions
- **Required:** 1–3 options with pros/cons; risks documented; evidence or missing_evidence

## Quality Bar

- Each option has tradeoffs
- If design would fail Well-Architected review, flag it
- Observability, auditability, scalability, failure handling required

## Exit Criteria

- 1–3 options with tradeoffs
- Risks and evidence documented
- Decision log present

## Blocking Conditions

None.
