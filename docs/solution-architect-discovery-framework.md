# Solution Architect Discovery Framework

A structured approach for the solution-architect agent to ask the right questions before designing or reviewing a platform. Use this framework to avoid designing on assumptions and to surface hidden risks early.

---

## Purpose

- **Before design:** Gather requirements and constraints so architecture options are grounded in reality.
- **Before review:** Understand intent and context so findings are relevant and prioritized.
- **Ongoing:** Turn answers into documented assumptions and design constraints.

---

## Question Domains (17)

| Domain | Purpose |
|--------|---------|
| 1. Business objective | Why we're building; success definition |
| 2. Users and personas | Who uses it; access patterns |
| 3. Functional requirements | What the system must do |
| 4. Non-functional requirements | Availability, latency, recovery |
| 5. Performance and scale | Users, transactions, data volume |
| 6. Integrations and dependencies | External systems, APIs, legacy |
| 7. Data sensitivity and compliance | PII, CUI, regulatory regime |
| 8. Hosting and cloud preferences | Cloud, on-prem, provider |
| 9. Environment strategy | Dev, stage, prod; promotion |
| 10. CI/CD and release model | Deploy frequency, rollback |
| 11. Operations and support | Who supports; escalation |
| 12. Observability | Logs, metrics, alerting |
| 13. Budget and timeline | Cost band; target date |
| 14. Security constraints | Mandated controls; auth model |
| 15. Team maturity and staffing | Skills; build/run ownership |
| 16. Documentation expectations | Architecture; runbooks; audit |
| 17. Success metrics | KPIs; review cadence |

---

## Question Classification

| Type | When to Ask | If Unanswered | Agent Behavior |
|------|-------------|---------------|----------------|
| **Mandatory** | Always. Required for any design or review. | Do not proceed with design; flag as blocker. | Ask first; document as open question if user cannot answer. |
| **Situational** | When domain applies (e.g., compliance only if regulated). | Document as "not applicable" or "to be determined." | Ask only when domain is in scope. |
| **Risk indicator** | When answer may reveal hidden risk. | Probe further; escalate if answer suggests risk. | Follow up with clarifying questions; document risk. |

---

## Mandatory Questions

These MUST be answered before architecture design or meaningful review. If unanswered, document as open question and recommend discovery step. Do not proceed with design until resolved or explicitly deferred.

| Domain | Mandatory Questions |
|--------|---------------------|
| **Business objective** | What problem are we solving? What does success look like? |
| **Users and personas** | Who are the primary users? How many (order of magnitude)? |
| **Functional requirements** | What must the system do? (top 3–5 capabilities) |
| **Non-functional requirements** | Availability? Latency? RTO/RPO? |
| **Performance and scale** | Expected users/transactions/data volume (order of magnitude) |
| **Data sensitivity and compliance** | Is data sensitive? What compliance regime applies? |
| **Hosting and cloud preferences** | Cloud, on-prem, or hybrid? Which provider(s)? |
| **Budget and timeline** | Budget band (order of magnitude)? Target date? |
| **Security constraints** | Any mandated security controls? |

---

## Situational Questions

Ask when the domain applies. If not applicable, document and skip.

| Domain | When to Ask |
|--------|-------------|
| **Integrations and dependencies** | When system connects to other systems, APIs, or data sources |
| **Environment strategy** | When multiple environments (dev, stage, prod) exist or are planned |
| **CI/CD and release model** | When deployment or release process is in scope |
| **Operations and support** | When 24/7, SLAs, or support model matters |
| **Observability** | When monitoring, alerting, or debugging is in scope |
| **Team maturity and staffing** | When build/run responsibility or skills matter |
| **Documentation expectations** | When audit, onboarding, or handoff is required |
| **Success metrics** | When measurable outcomes are expected |

---

## Signs of Hidden Risk

Answers that suggest hidden risk. Probe further; escalate if confirmed. Document in Risk Indicators section.

| Domain | Risk Signal | Why It Matters | Follow-Up |
|--------|-------------|----------------|-----------|
| **Business objective** | "We need everything" or "no clear priority" | Scope creep; no exit criteria | "If we had to ship in 3 months, what's in and what's out?" |
| **Users and personas** | "Everyone" or "all users" without segmentation | Monolithic design; wrong scaling | "Who are the top 2–3 user types? What do they do differently?" |
| **Functional requirements** | "Everything in the backlog" or no prioritization | Scope risk; over-engineering | "What's the MVP? What can wait for v2?" |
| **Non-functional requirements** | "As fast as possible" or "no downtime" without numbers | Over-engineering; cost blowout | "What's acceptable downtime per month? p95 latency target?" |
| **Performance and scale** | "We don't know" or "it'll grow a lot" | Wrong capacity; wasted spend | "Order of magnitude: 100, 1k, 10k users? TB or PB?" |
| **Integrations** | "Many" or "lots of legacy" without a map | Integration drives architecture; hidden complexity | "List the top 5. Which are critical path? What protocols?" |
| **Data sensitivity** | "We'll figure it out later" or "some PII" vague | Compliance is rarely retrofittable | "What data? PII, CUI, PHI? FedRAMP, HIPAA, PCI?" |
| **Hosting** | "No preference" when compliance applies | Compliance often dictates cloud | "Does compliance require specific cloud or region?" |
| **Environment strategy** | "Just dev and prod" with no promotion path | Drift; deployment risk | "How do changes get to prod? Manual? Approval?" |
| **CI/CD** | "Manual deploy" or "no CI" for production | Reliability; audit risk | "How often do you deploy? Who approves?" |
| **Operations** | "Devs will support" or "no dedicated ops" | On-call, runbooks, escalation unclear | "Who gets paged at 2am? What's the escalation path?" |
| **Observability** | "We'll add it later" for production system | Hard to retrofit; blind to failures | "What do you need to debug an outage today?" |
| **Budget and timeline** | "Unlimited" or "no constraint" | Unrealistic; scope creep or failure | "Rough cap? Fixed date? What's non-negotiable?" |
| **Security** | "Standard" or "whatever you recommend" | Mandated controls may not exist | "Any required certifications? Internal policy?" |
| **Team** | "We'll hire" or "junior team" | Skills gap affects technology choices | "What does the team know today? Kubernetes? Cloud?" |
| **Documentation** | "Minimal" when compliance applies | Compliance often requires evidence | "Does audit require architecture docs? Runbooks?" |
| **Success metrics** | No defined metrics for "critical" system | Accountability; scope creep | "How do we know we succeeded? Who owns it?" |

---

## Summarizing Answers into Architecture Assumptions and Design Constraints

After discovery, produce two artifacts. Use these formats so the AI and stakeholders share a common model.

### 1. Architecture Assumptions

Document what we are assuming (not verified). Every assumption should have a verification path.

**Format:**

```
**Assumption:** [statement]
**Source:** [who said it, or "inferred from X"]
**Confidence:** High | Medium | Low
**If wrong:** [impact on architecture]
**Verification step:** [how to confirm]
```

**Examples:**

```
**Assumption:** Peak load is ~1,000 concurrent users.
**Source:** Product owner estimate.
**Confidence:** Medium.
**If wrong:** Under-provisioning may cause outages; over-provisioning increases cost.
**Verification step:** Review analytics from similar system; load test before launch.

**Assumption:** Data is not PII; no FedRAMP required.
**Source:** Stakeholder statement.
**Confidence:** Low.
**If wrong:** Major architecture change; encryption, access control, audit trail.
**Verification step:** Legal/compliance review before design finalization.
```

### 2. Design Constraints

Document what limits design choices. Constraints are hard limits; assumptions are beliefs.

**Format:**

```
**Constraint:** [statement]
**Type:** Technical | Budget | Compliance | Organizational | Timeline
**Implication:** [what it means for architecture]
**Flexible?** Yes | No
```

**Examples:**

```
**Constraint:** Must use AWS (existing enterprise agreement).
**Type:** Organizational.
**Implication:** No Azure or GCP; use AWS-native services where beneficial.
**Flexible?** No.

**Constraint:** RTO < 4 hours; RPO < 1 hour.
**Type:** Technical (non-functional).
**Implication:** Multi-AZ; automated backups; tested restore.
**Flexible?** No (contractual).

**Constraint:** Budget ~$50k/year for run.
**Type:** Budget.
**Implication:** Right-size; avoid over-provisioning; consider reserved capacity.
**Flexible?** Yes (with approval).
```

### 3. Mapping Answers to Assumptions and Constraints

| Answer Type | Output |
|-------------|--------|
| Verified fact (e.g., "we have an AWS EA") | Design constraint |
| Estimate or belief (e.g., "~1k users") | Architecture assumption |
| Hard limit (e.g., "must be FedRAMP") | Design constraint |
| Preference (e.g., "we prefer serverless") | Design constraint (flexible) or assumption |
| Unknown ("we'll figure it out") | Open question; do not assume |

---

## Discovery Workflow

1. **Start with mandatory questions** — Get answers or document as blockers.
2. **Assess situational relevance** — Which situational domains apply? Ask those.
3. **Watch for risk signals** — When answer suggests risk, probe with follow-ups from "Signs of Hidden Risk" table.
4. **Document assumptions** — Turn unverified answers into explicit assumptions (format above).
5. **Document constraints** — Turn hard limits into design constraints (format above).
6. **Produce discovery summary** — What we know, what we assume, what we need to verify.
7. **Recommend next steps** — Design phases, spikes, or decisions needed.

---

## Output Template

Use this structure for discovery output:

```markdown
## Discovery Summary
[2–4 sentences: what we know, what we assume, critical gaps]

## Answers by Domain
[Table or list of answers per domain]

## Architecture Assumptions
[List with format: Assumption | Source | Confidence | If wrong | Verification step]

## Design Constraints
[List with format: Constraint | Type | Implication | Flexible?]

## Open Questions (Prioritized)
1. [Question] — Blocker? Y/N
2. ...

## Risk Indicators
[Any risk signals observed; recommended follow-up]

## Recommended Next Steps
1. [Action]
2. ...
```

---

## References

- `contexts/solution-discovery-question-bank.md` — Full question set by domain with M/S/R classification
- `.opencode/prompts/agents/solution-architect.md` — Agent prompt
