---
description: Solution architect discovery — requirements, budget, constraints, compliance
agent: solution-architect
---

# Solution Discovery

**Purpose:** Conduct solution architect and product manager discovery. Ask clarifying questions about requirements, budget, timeline, users, compliance, and integrations. Produce a discovery summary with open questions and next steps. Think like a senior solution architect and product manager.

**When to use:** Starting a new initiative, migration, or platform effort; before design or implementation; when scope is vague.

**Required inputs:** Context or problem statement. Provide via arguments: $ARGUMENTS

**Optional inputs:** Known constraints; compliance regime (FedRAMP, FISMA, DoD); cloud provider preferences (AWS, Azure, GCP); existing tech stack.

**Workflow:**
1. Parse the provided context and problem statement.
2. Identify what is known vs. unknown.
3. Ask clarifying questions: requirements, budget, timeline, users, compliance, integrations, scale.
4. Synthesize constraints: technical, organizational, regulatory.
5. Produce discovery summary, open questions, and recommended next steps.

**Expected output format:**
- Discovery summary (what we know, what we need to clarify)
- Open questions (prioritized)
- Constraints (technical, budget, compliance, timeline)
- Recommended next steps (design phases, spikes, decisions)

**Guardrails:**
- Ask before assuming; do not fill gaps with assumptions.
- Ground recommendations in stated requirements and constraints.
- When federal/regulated context is indicated, factor in NIST, FedRAMP, FISMA, DoD.

**Definition of done:** Discovery summary complete; open questions listed and prioritized; next steps are actionable.
