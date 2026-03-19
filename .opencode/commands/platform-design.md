---
description: Platform architecture design with tradeoffs and cloud alignment
agent: solution-architect
---

# Platform Design

**Purpose:** Design platform architecture for the given context. Consider scalability, reliability, security, cost, and operational excellence. Present options with tradeoffs. Align with cloud Well-Architected where applicable. Think like a senior solution architect.

**When to use:** Designing or evolving platform architecture; evaluating cloud options; pre-implementation design review.

**Required inputs:** Context or design brief. Provide via arguments: $ARGUMENTS

**Optional inputs:** Cloud provider(s), compliance requirements, existing constraints.

**Workflow:**
1. Parse the design context and constraints.
2. Identify key non-functional requirements (scale, reliability, security, cost).
3. Propose 1–3 architecture options with pros, cons, and conditions.
4. Map to cloud Well-Architected pillars (AWS, Azure, GCP) where applicable.
5. Surface risks, assumptions, and recommended approach.

**Expected output format:**
- Problem statement and constraints
- Architecture options (1–3) with pros, cons, conditions
- Cloud alignment (Well-Architected pillars where relevant)
- Risks and assumptions
- Recommended approach and rationale

**Guardrails:**
- Present options with tradeoffs; avoid single-option prescriptions.
- Evidence-based; ground in stated requirements.
- Compliance-aware when federal/regulated context is indicated.

**Definition of done:** At least one architecture option with tradeoffs; risks and assumptions surfaced; recommendation with rationale.
