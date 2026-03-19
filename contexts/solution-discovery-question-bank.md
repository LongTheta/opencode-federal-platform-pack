# Solution Discovery Question Bank

Use with the solution-architect agent and `docs/solution-architect-discovery-framework.md`.

**M** = Mandatory (must answer before design)  
**S** = Situational (ask when domain applies)  
**R** = Risk indicator (probe further; may reveal hidden risk)

---

## 1. Business Objective

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 1.1 | What problem are we solving? | M | "What pain exists today? What would change if we succeed?" | Assumption / Constraint |
| 1.2 | What does success look like? | M | "How would we know we're done? What would we measure?" | Assumption |
| 1.3 | What is the primary driver? (revenue, cost, compliance, experience) | S | "If we had to pick one, which matters most?" | Constraint |
| 1.4 | What is out of scope? | S | "What are we explicitly not building?" | Constraint |
| 1.5 | "We need everything" or "no clear priority" | R | Probe for prioritization; scope creep risk | — |

---

## 2. Users and Personas

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 2.1 | Who are the primary users? | M | "Internal, external, both? Roles?" | Assumption |
| 2.2 | How many users (order of magnitude)? | M | "10s, 100s, 1000s, 10k+?" | Assumption |
| 2.3 | What are their access patterns? (batch, real-time, mobile, API) | S | "When and how do they interact?" | Assumption |
| 2.4 | Are there different user types with different needs? | S | "Do admins vs. end users need different capabilities?" | Assumption |
| 2.5 | "Everyone" or "all users" without segmentation | R | Probe for personas; monolithic design risk | — |

---

## 3. Functional Requirements

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 3.1 | What must the system do? (top 3–5 capabilities) | M | "If we shipped without X, would it be useless?" | Constraint |
| 3.2 | What are the critical user flows? | S | "Walk me through the main journey." | Assumption |
| 3.3 | What is read-heavy vs. write-heavy? | S | "Where does data change most?" | Assumption |
| 3.4 | Are there workflows that span systems? | S | "What crosses boundaries?" | Assumption |
| 3.5 | "Everything in the backlog" or no prioritization | R | Probe for MVP; scope risk | — |

---

## 4. Non-Functional Requirements

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 4.1 | What availability is required? (e.g., 99.9%, 99.99%) | M | "How much downtime is acceptable per month?" | Constraint |
| 4.2 | What latency is acceptable? (e.g., p95 < 200ms) | M | "What would users perceive as slow?" | Constraint |
| 4.3 | What is the recovery objective? (RTO, RPO) | M | "How quickly must we recover? How much data loss is acceptable?" | Constraint |
| 4.4 | Are there regulatory or contractual SLAs? | S | "Any signed SLAs or compliance requirements?" | Constraint |
| 4.5 | "As fast as possible" or "no downtime" without numbers | R | Probe for real numbers; over-engineering risk | — |

---

## 5. Performance and Scale

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 5.1 | Expected users/transactions/data volume (order of magnitude)? | M | "10, 100, 1k, 10k users? Requests/sec? TB of data?" | Assumption |
| 5.2 | Peak vs. average load? | S | "What's the spike? 2x, 10x, 100x?" | Assumption |
| 5.3 | Growth projection (6–12 months)? | S | "How much will this grow?" | Assumption |
| 5.4 | Geographic distribution? | S | "Single region or global?" | Constraint |
| 5.5 | "We don't know" or "it'll grow a lot" | R | Design for flexibility; ask for bounds | — |

---

## 6. Integrations and Dependencies

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 6.1 | What external systems must we integrate with? | S | "APIs, databases, message queues?" | Constraint |
| 6.2 | What is the integration pattern? (sync, async, batch) | S | "Real-time or batch? Push or pull?" | Assumption |
| 6.3 | Are there legacy systems with constraints? | S | "Protocols, versions, rate limits?" | Constraint |
| 6.4 | Who owns the integrations? (us vs. them) | S | "Who changes the contract?" | Assumption |
| 6.5 | "Many" or "lots of legacy" without a map | R | Map critical path; integration often drives architecture | — |

---

## 7. Data Sensitivity and Compliance

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 7.1 | Is data sensitive? (PII, CUI, PHI, financial) | M | "What data do we store? Who can see it?" | Constraint |
| 7.2 | What compliance regime applies? (FedRAMP, HIPAA, PCI, etc.) | M | "Any regulatory or contractual requirements?" | Constraint |
| 7.3 | Data residency requirements? | S | "Must data stay in specific regions?" | Constraint |
| 7.4 | Audit and retention requirements? | S | "How long? What must we prove?" | Constraint |
| 7.5 | "We'll figure it out later" or "some PII" vague | R | Compliance is rarely retrofittable; high risk | — |

---

## 8. Hosting and Cloud Preferences

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 8.1 | Cloud, on-prem, or hybrid? | M | "Where will this run?" | Constraint |
| 8.2 | Which cloud provider(s)? (AWS, Azure, GCP) | M | "Existing agreement? Multi-cloud?" | Constraint |
| 8.3 | Any mandated services or vendors? | S | "Must we use X?" | Constraint |
| 8.4 | Sovereign cloud or government cloud? | S | "AWS GovCloud, Azure Government, etc.?" | Constraint |
| 8.5 | "No preference" when compliance applies | R | Compliance often dictates cloud; clarify | — |

---

## 9. Environment Strategy

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 9.1 | How many environments? (dev, stage, prod, etc.) | S | "What do we need before production?" | Assumption |
| 9.2 | How do we promote between environments? | S | "Manual, automated, approval gates?" | Assumption |
| 9.3 | Environment parity? (same config, scaled down) | S | "Do dev and prod match?" | Assumption |
| 9.4 | Who can deploy to production? | S | "Who has access? What's the process?" | Constraint |
| 9.5 | "Just dev and prod" with no promotion path | R | Drift and deployment risk | — |

---

## 10. CI/CD and Release Model

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 10.1 | How often do we need to release? | S | "Daily, weekly, monthly?" | Assumption |
| 10.2 | What is the deployment model? (blue/green, canary, rolling) | S | "How do we minimize risk?" | Assumption |
| 10.3 | Rollback strategy? | S | "How do we undo a bad deploy?" | Assumption |
| 10.4 | Is GitOps or IaC-driven deploy in use or planned? | S | "Declarative or imperative?" | Assumption |
| 10.5 | "Manual deploy" or "no CI" for production | R | Reliability and audit risk | — |

---

## 11. Operations and Support

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 11.1 | Who supports this in production? | S | "Dedicated ops? Devs? Vendor?" | Assumption |
| 11.2 | What are the support hours? (24/7, business hours) | S | "When must someone respond?" | Constraint |
| 11.3 | Escalation path? | S | "Who gets paged? Who fixes?" | Assumption |
| 11.4 | Runbooks or playbooks exist? | S | "Documented procedures?" | Assumption |
| 11.5 | "Devs will support" or "no dedicated ops" | R | On-call, runbooks, escalation matter | — |

---

## 12. Observability

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 12.1 | What must we monitor? (health, latency, errors) | S | "What do we care about?" | Assumption |
| 12.2 | Logging and tracing requirements? | S | "Centralized? Retention? Correlation?" | Constraint |
| 12.3 | Alerting and on-call? | S | "Who gets alerted? How?" | Assumption |
| 12.4 | Existing observability stack? | S | "Prometheus, Datadog, CloudWatch?" | Constraint |
| 12.5 | "We'll add it later" for production system | R | Observability is hard to retrofit | — |

---

## 13. Budget and Timeline

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 13.1 | What is the budget band? (order of magnitude) | M | "10k, 100k, 1M per year? Cap?" | Constraint |
| 13.2 | What is the target date? | M | "Fixed date? Flexible? Phased?" | Constraint |
| 13.3 | Budget for build vs. run? | S | "One-time vs. ongoing?" | Constraint |
| 13.4 | Trade-offs between cost and speed? | S | "Cheap and slow vs. fast and expensive?" | Assumption |
| 13.5 | "Unlimited" or "no constraint" | R | Unrealistic; probe for real limits | — |

---

## 14. Security Constraints

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 14.1 | Any mandated security controls? | M | "FedRAMP, SOC2, internal policy?" | Constraint |
| 14.2 | Authentication and authorization model? | S | "SSO? MFA? RBAC?" | Constraint |
| 14.3 | Secrets management approach? | S | "Vault, cloud native, other?" | Constraint |
| 14.4 | Network segmentation requirements? | S | "DMZ? Private only?" | Constraint |
| 14.5 | "Standard" or "whatever you recommend" | R | Clarify mandated controls; "standard" may not exist | — |

---

## 15. Team Maturity and Staffing

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 15.1 | Who is building this? (internal, vendor, mix) | S | "Team composition?" | Assumption |
| 15.2 | What skills does the team have? | S | "Cloud? Kubernetes? Legacy?" | Assumption |
| 15.3 | Team size and availability? | S | "How many? Full-time?" | Assumption |
| 15.4 | Experience with proposed tech stack? | S | "Have they used X before?" | Assumption |
| 15.5 | "We'll hire" or "junior team" | R | Skills gap affects technology choices | — |

---

## 16. Documentation Expectations

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 16.1 | What documentation is required? | S | "Architecture? Runbooks? API docs?" | Constraint |
| 16.2 | Who is the audience? | S | "Engineers? Auditors? Handoff?" | Assumption |
| 16.3 | Audit or compliance documentation? | S | "Evidence for assessors?" | Constraint |
| 16.4 | ADR or decision log expected? | S | "Do we document decisions?" | Assumption |
| 16.5 | "Minimal" when compliance applies | R | Compliance often requires evidence | — |

---

## 17. Success Metrics

| # | Question | Type | Follow-Up if Unclear | Maps To |
|---|----------|------|----------------------|---------|
| 17.1 | How do we measure success? | S | "KPIs? SLAs? Business outcomes?" | Assumption |
| 17.2 | What would indicate failure? | S | "What would cause us to stop?" | Assumption |
| 17.3 | Review cadence? | S | "When do we assess?" | Assumption |
| 17.4 | Who owns success? | S | "Product? Engineering? Both?" | Assumption |
| 17.5 | No defined metrics for "critical" system | R | Accountability and scope creep risk | — |

---

## Quick Reference: Mandatory vs. Situational vs. Risk

### Mandatory (must answer before design)

| Domain | Question IDs |
|--------|--------------|
| Business objective | 1.1, 1.2 |
| Users and personas | 2.1, 2.2 |
| Functional requirements | 3.1 |
| Non-functional requirements | 4.1, 4.2, 4.3 |
| Performance and scale | 5.1 |
| Data sensitivity and compliance | 7.1, 7.2 |
| Hosting and cloud preferences | 8.1, 8.2 |
| Budget and timeline | 13.1, 13.2 |
| Security constraints | 14.1 |

### Situational (ask when domain applies)

All questions not marked M or R.

### Risk indicators (probe further; document in Risk Indicators)

| Domain | Question ID |
|--------|-------------|
| Business objective | 1.5 |
| Users and personas | 2.5 |
| Functional requirements | 3.5 |
| Non-functional requirements | 4.5 |
| Performance and scale | 5.5 |
| Integrations | 6.5 |
| Data sensitivity | 7.5 |
| Hosting | 8.5 |
| Environment strategy | 9.5 |
| CI/CD | 10.5 |
| Operations | 11.5 |
| Observability | 12.5 |
| Budget and timeline | 13.5 |
| Security | 14.5 |
| Team maturity | 15.5 |
| Documentation | 16.5 |
| Success metrics | 17.5 |

---

## How to Summarize Answers

| Answer Type | Output | Example |
|-------------|--------|---------|
| **Verified fact** | Design constraint | "We have an AWS EA" → Constraint: Must use AWS |
| **Estimate or belief** | Architecture assumption | "~1k users" → Assumption: Peak load ~1,000 users |
| **Hard limit** | Design constraint | "Must be FedRAMP" → Constraint: FedRAMP compliance required |
| **Preference** | Constraint (flexible) or assumption | "We prefer serverless" → Constraint: Prefer serverless (flexible) |
| **Unknown** | Open question | "We'll figure it out" → Do not assume; add to Open Questions |

See `docs/solution-architect-discovery-framework.md` for full format and examples.
