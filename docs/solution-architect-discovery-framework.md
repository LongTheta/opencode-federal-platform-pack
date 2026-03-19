# Solution Architect Discovery Framework

A structured approach for the solution-architect agent to ask the right questions before designing or reviewing a platform. Use this framework to avoid designing on assumptions and to surface hidden risks early.

---

## Purpose

- **Before design:** Gather requirements and constraints so architecture options are grounded in reality.
- **Before review:** Understand intent and context so findings are relevant and prioritized.
- **Ongoing:** Turn answers into documented assumptions and design constraints.

---

## Question Classification

| Type | When to Ask | If Unanswered |
|------|-------------|----------------|
| **Mandatory** | Always. Required for any design or review. | Do not proceed with design; flag as blocker. |
| **Situational** | When domain applies (e.g., compliance only if regulated). | Document as "not applicable" or "to be determined." |
| **Risk indicator** | When answer may reveal hidden risk. | Probe further; escalate if answer suggests risk. |

---

## Mandatory Questions

These must be answered before architecture design or meaningful review. If unanswered, document as open question and recommend discovery step.

1. **Business objective** — What problem are we solving? What does success look like?
2. **Users and personas** — Who uses the system? Internal, external, both?
3. **Functional requirements** — What must the system do? (at least high-level)
4. **Non-functional requirements** — Availability, latency, recovery (at least order of magnitude)
5. **Performance and scale** — Expected users, transactions, data volume (even if approximate)
6. **Data sensitivity and compliance** — Is data sensitive? Any regulatory context?
7. **Hosting and cloud preferences** — Cloud, on-prem, hybrid? Which provider(s)?
8. **Budget and timeline** — Rough budget band and target date (even if "as soon as possible")
9. **Security constraints** — Any mandated controls, certifications, or constraints?

---

## Situational Questions

Ask when the domain applies. If not applicable, document and skip.

| Domain | When to Ask |
|--------|-------------|
| Integrations and dependencies | When system connects to other systems, APIs, or data sources |
| Environment strategy | When multiple environments (dev, stage, prod) exist or are planned |
| CI/CD and release model | When deployment or release process is in scope |
| Operations and support | When 24/7, SLAs, or support model matters |
| Observability | When monitoring, alerting, or debugging is in scope |
| Team maturity and staffing | When build/run responsibility or skills matter |
| Documentation expectations | When audit, onboarding, or handoff is required |
| Success metrics | When measurable outcomes are expected |

---

## Risk Indicator Questions

Answers that suggest hidden risk. Probe further; escalate if confirmed.

| Question Area | Risk Signal | Follow-Up |
|---------------|-------------|-----------|
| Budget and timeline | "Unlimited" or "no constraint" | Clarify real limits; unrealistic often means scope creep or failure |
| Compliance | "We'll figure it out later" | Compliance is rarely retrofittable; flag as high risk |
| Scale | "We don't know" or "it'll grow" | Design for flexibility but ask for order of magnitude |
| Integrations | "Many" or "lots of legacy" | Map critical path; legacy often drives architecture |
| Security | "Standard" or "whatever you recommend" | Clarify mandated controls; "standard" may not exist |
| Team | "We'll hire" or "junior team" | Skills gap affects technology choices |
| Operations | "Devs will support" or "no dedicated ops" | Runbook, on-call, escalation path matter |
| Data sensitivity | "Some PII" or "confidential" | Clarify scope; drives encryption, access, compliance |

---

## Summarizing Answers into Assumptions and Constraints

After discovery, produce two artifacts:

### 1. Architecture Assumptions

Document what we are assuming (not verified). Format:

```
**Assumption:** [statement]
**Source:** [who said it, or "inferred from X"]
**Confidence:** High | Medium | Low
**If wrong:** [impact on architecture]
**Verification step:** [how to confirm]
```

Example:
```
**Assumption:** Peak load is ~1,000 concurrent users.
**Source:** Product owner estimate.
**Confidence:** Medium.
**If wrong:** Under-provisioning may cause outages; over-provisioning increases cost.
**Verification step:** Review analytics from similar system; load test before launch.
```

### 2. Design Constraints

Document what limits design choices. Format:

```
**Constraint:** [statement]
**Type:** Technical | Budget | Compliance | Organizational | Timeline
**Implication:** [what it means for architecture]
**Flexible?** Yes | No
```

Example:
```
**Constraint:** Must use AWS (existing enterprise agreement).
**Type:** Organizational.
**Implication:** No Azure or GCP; use AWS-native services where beneficial.
**Flexible?** No.
```

---

## Discovery Workflow

1. **Start with mandatory questions** — Get answers or document as blockers.
2. **Assess situational relevance** — Which situational domains apply? Ask those.
3. **Watch for risk signals** — When answer suggests risk, probe with follow-ups.
4. **Document assumptions** — Turn unverified answers into explicit assumptions.
5. **Document constraints** — Turn hard limits into design constraints.
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
[List with format above]

## Design Constraints
[List with format above]

## Open Questions (Prioritized)
1. [Question] — Blocker? Y/N
2. ...

## Risk Indicators
[Any risk signals and recommended follow-up]

## Recommended Next Steps
1. [Action]
2. ...
```

---

## References

- `contexts/solution-discovery-question-bank.md` — Full question set by domain
- `.opencode/prompts/agents/solution-architect.md` — Agent prompt
