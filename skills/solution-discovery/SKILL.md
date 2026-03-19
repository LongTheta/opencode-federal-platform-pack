---
name: solution-discovery
description: Solution architect discovery workflow. Uses question bank and discovery framework to gather requirements, constraints, and assumptions before design. Produces documented assumptions, constraints, and risk indicators. Use for /solution-discovery, /platform-design.
risk_tier: 0
---

# Solution Discovery Skill

Structured discovery workflow for the solution-architect agent. Asks the right questions before design or review. Produces documented assumptions, constraints, and risk indicators. **Do not jump to implementation.** Ask questions first; document assumptions.

---

## When to Use

- `/solution-discovery` — Requirements and constraints gathering
- `/platform-design` — Before producing architecture options
- `/checkpoint` — Session handoff with documented context

---

## Core Principle

**Discovery before design.** Do not design or recommend architecture until mandatory questions are answered or explicitly deferred. Document open questions; flag blockers.

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

| Type | When to Ask | If Unanswered |
|------|-------------|---------------|
| **Mandatory (M)** | Always. Required for design. | Do not proceed; document as open question; flag blocker. |
| **Situational (S)** | When domain applies. | Document "not applicable" or "to be determined." |
| **Risk indicator (R)** | Answer may reveal hidden risk. | Probe further; document in Risk Indicators. |

---

## Workflow

1. **Load question bank** — Use `contexts/solution-discovery-question-bank.md`.
2. **Ask mandatory questions first** — Business objective, users, functional requirements, NFRs, scale, compliance, hosting, budget, security.
3. **Ask situational questions** — When domain applies (integrations, environments, CI/CD, etc.).
4. **Probe risk indicators** — "We need everything," "no clear priority," "we'll figure it out later" → follow up.
5. **Summarize** — Assumptions, constraints, open questions, risk indicators in structured format.
6. **Output** — Use format from `docs/solution-architect-discovery-framework.md`.

---

## Output Format

| Section | Content |
|---------|---------|
| **Assumptions** | Verified facts or estimates (e.g., "~1k users") |
| **Constraints** | Hard limits (e.g., "Must use AWS GovCloud") |
| **Open Questions** | Unanswered mandatory or situational |
| **Risk Indicators** | Answers that suggest scope creep, compliance risk, or design risk |

---

## Mandatory Rules

- **REQUIRED:** Use `contexts/solution-discovery-question-bank.md` for questions.
- **REQUIRED:** Use `docs/solution-architect-discovery-framework.md` for output format.
- **FORBIDDEN:** Jump to implementation or architecture without discovery.
- **REQUIRED:** Document mandatory questions as open if unanswered.

---

## References

- `contexts/solution-discovery-question-bank.md` — Full question bank (M/S/R)
- `docs/solution-architect-discovery-framework.md` — Output format, examples
