# Solution Discovery Question Bank

Use with the solution-architect agent and `docs/solution-architect-discovery-framework.md`.  
**M** = Mandatory | **S** = Situational | **R** = Risk indicator

---

## 1. Business Objective

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 1.1 | What problem are we solving? | M | "What pain exists today? What would change if we succeed?" |
| 1.2 | What does success look like? | M | "How would we know we're done? What would we measure?" |
| 1.3 | What is the primary driver? (revenue, cost, compliance, experience) | S | "If we had to pick one, which matters most?" |
| 1.4 | What is out of scope? | S | "What are we explicitly not building?" |
| 1.5 | "We need everything" or "no clear priority" | R | Probe for prioritization; scope creep risk |

---

## 2. Users and Personas

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 2.1 | Who are the primary users? | M | "Internal, external, both? Roles?" |
| 2.2 | How many users (order of magnitude)? | M | "10s, 100s, 1000s, 10k+?" |
| 2.3 | What are their access patterns? (batch, real-time, mobile, API) | S | "When and how do they interact?" |
| 2.4 | Are there different user types with different needs? | S | "Do admins vs. end users need different capabilities?" |
| 2.5 | "Everyone" or "all users" without segmentation | R | Probe for personas; monolithic design risk |

---

## 3. Functional Requirements

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 3.1 | What must the system do? (top 3–5 capabilities) | M | "If we shipped without X, would it be useless?" |
| 3.2 | What are the critical user flows? | S | "Walk me through the main journey." |
| 3.3 | What is read-heavy vs. write-heavy? | S | "Where does data change most?" |
| 3.4 | Are there workflows that span systems? | S | "What crosses boundaries?" |
| 3.5 | "Everything in the backlog" or no prioritization | R | Probe for MVP; scope risk |

---

## 4. Non-Functional Requirements

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 4.1 | What availability is required? (e.g., 99.9%, 99.99%) | M | "How much downtime is acceptable per month?" |
| 4.2 | What latency is acceptable? (e.g., p95 < 200ms) | M | "What would users perceive as slow?" |
| 4.3 | What is the recovery objective? (RTO, RPO) | M | "How quickly must we recover? How much data loss is acceptable?" |
| 4.4 | Are there regulatory or contractual SLAs? | S | "Any signed SLAs or compliance requirements?" |
| 4.5 | "As fast as possible" or "no downtime" without numbers | R | Probe for real numbers; over-engineering risk |

---

## 5. Performance and Scale

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 5.1 | Expected users/transactions/data volume (order of magnitude)? | M | "10, 100, 1k, 10k users? Requests/sec? TB of data?" |
| 5.2 | Peak vs. average load? | S | "What's the spike? 2x, 10x, 100x?" |
| 5.3 | Growth projection (6–12 months)? | S | "How much will this grow?" |
| 5.4 | Geographic distribution? | S | "Single region or global?" |
| 5.5 | "We don't know" or "it'll grow a lot" | R | Design for flexibility; ask for bounds |

---

## 6. Integrations and Dependencies

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 6.1 | What external systems must we integrate with? | S | "APIs, databases, message queues?" |
| 6.2 | What is the integration pattern? (sync, async, batch) | S | "Real-time or batch? Push or pull?" |
| 6.3 | Are there legacy systems with constraints? | S | "Protocols, versions, rate limits?" |
| 6.4 | Who owns the integrations? (us vs. them) | S | "Who changes the contract?" |
| 6.5 | "Many" or "lots of legacy" without a map | R | Map critical path; integration often drives architecture |

---

## 7. Data Sensitivity and Compliance

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 7.1 | Is data sensitive? (PII, CUI, PHI, financial) | M | "What data do we store? Who can see it?" |
| 7.2 | What compliance regime applies? (FedRAMP, HIPAA, PCI, etc.) | M | "Any regulatory or contractual requirements?" |
| 7.3 | Data residency requirements? | S | "Must data stay in specific regions?" |
| 7.4 | Audit and retention requirements? | S | "How long? What must we prove?" |
| 7.5 | "We'll figure it out later" or "some PII" vague | R | Compliance is rarely retrofittable; high risk |

---

## 8. Hosting and Cloud Preferences

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 8.1 | Cloud, on-prem, or hybrid? | M | "Where will this run?" |
| 8.2 | Which cloud provider(s)? (AWS, Azure, GCP) | M | "Existing agreement? Multi-cloud?" |
| 8.3 | Any mandated services or vendors? | S | "Must we use X?" |
| 8.4 | Sovereign cloud or government cloud? | S | "AWS GovCloud, Azure Government, etc.?" |
| 8.5 | "No preference" when compliance applies | R | Compliance often dictates cloud; clarify |

---

## 9. Environment Strategy

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 9.1 | How many environments? (dev, stage, prod, etc.) | S | "What do we need before production?" |
| 9.2 | How do we promote between environments? | S | "Manual, automated, approval gates?" |
| 9.3 | Environment parity? (same config, scaled down) | S | "Do dev and prod match?" |
| 9.4 | Who can deploy to production? | S | "Who has access? What's the process?" |
| 9.5 | "Just dev and prod" with no promotion path | R | Drift and deployment risk |

---

## 10. CI/CD and Release Model

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 10.1 | How often do we need to release? | S | "Daily, weekly, monthly?" |
| 10.2 | What is the deployment model? (blue/green, canary, rolling) | S | "How do we minimize risk?" |
| 10.3 | Rollback strategy? | S | "How do we undo a bad deploy?" |
| 10.4 | Is GitOps or IaC-driven deploy in use or planned? | S | "Declarative or imperative?" |
| 10.5 | "Manual deploy" or "no CI" for production | R | Reliability and audit risk |

---

## 11. Operations and Support

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 11.1 | Who supports this in production? | S | "Dedicated ops? Devs? Vendor?" |
| 11.2 | What are the support hours? (24/7, business hours) | S | "When must someone respond?" |
| 11.3 | Escalation path? | S | "Who gets paged? Who fixes?" |
| 11.4 | Runbooks or playbooks exist? | S | "Documented procedures?" |
| 11.5 | "Devs will support" or "no dedicated ops" | R | On-call, runbooks, escalation matter |

---

## 12. Observability

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 12.1 | What must we monitor? (health, latency, errors) | S | "What do we care about?" |
| 12.2 | Logging and tracing requirements? | S | "Centralized? Retention? Correlation?" |
| 12.3 | Alerting and on-call? | S | "Who gets alerted? How?" |
| 12.4 | Existing observability stack? | S | "Prometheus, Datadog, CloudWatch?" |
| 12.5 | "We'll add it later" for production system | R | Observability is hard to retrofit |

---

## 13. Budget and Timeline

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 13.1 | What is the budget band? (order of magnitude) | M | "10k, 100k, 1M per year? Cap?" |
| 13.2 | What is the target date? | M | "Fixed date? Flexible? Phased?" |
| 13.3 | Budget for build vs. run? | S | "One-time vs. ongoing?" |
| 13.4 | Trade-offs between cost and speed? | S | "Cheap and slow vs. fast and expensive?" |
| 13.5 | "Unlimited" or "no constraint" | R | Unrealistic; probe for real limits |

---

## 14. Security Constraints

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 14.1 | Any mandated security controls? | M | "FedRAMP, SOC2, internal policy?" |
| 14.2 | Authentication and authorization model? | S | "SSO? MFA? RBAC?" |
| 14.3 | Secrets management approach? | S | "Vault, cloud native, other?" |
| 14.4 | Network segmentation requirements? | S | "DMZ? Private only?" |
| 14.5 | "Standard" or "whatever you recommend" | R | Clarify mandated controls; "standard" may not exist |

---

## 15. Team Maturity and Staffing

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 15.1 | Who is building this? (internal, vendor, mix) | S | "Team composition?" |
| 15.2 | What skills does the team have? | S | "Cloud? Kubernetes? Legacy?" |
| 15.3 | Team size and availability? | S | "How many? Full-time?" |
| 15.4 | Experience with proposed tech stack? | S | "Have they used X before?" |
| 15.5 | "We'll hire" or "junior team" | R | Skills gap affects technology choices |

---

## 16. Documentation Expectations

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 16.1 | What documentation is required? | S | "Architecture? Runbooks? API docs?" |
| 16.2 | Who is the audience? | S | "Engineers? Auditors? Handoff?" |
| 16.3 | Audit or compliance documentation? | S | "Evidence for assessors?" |
| 16.4 | ADR or decision log expected? | S | "Do we document decisions?" |
| 16.5 | "Minimal" when compliance applies | R | Compliance often requires evidence |

---

## 17. Success Metrics

| # | Question | Type | Follow-Up if Unclear |
|---|----------|------|----------------------|
| 17.1 | How do we measure success? | S | "KPIs? SLAs? Business outcomes?" |
| 17.2 | What would indicate failure? | S | "What would cause us to stop?" |
| 17.3 | Review cadence? | S | "When do we assess?" |
| 17.4 | Who owns success? | S | "Product? Engineering? Both?" |
| 17.5 | No defined metrics for "critical" system | R | Accountability and scope creep risk |

---

## Quick Reference: Mandatory vs. Situational

**Mandatory (must answer before design):**  
1.1, 1.2 | 2.1, 2.2 | 3.1 | 4.1, 4.2, 4.3 | 5.1 | 7.1, 7.2 | 8.1, 8.2 | 13.1, 13.2 | 14.1

**Situational (ask when domain applies):**  
All others not marked R.

**Risk indicators (probe further):**  
1.5 | 2.5 | 3.5 | 4.5 | 5.5 | 6.5 | 7.5 | 8.5 | 9.5 | 10.5 | 11.5 | 12.5 | 13.5 | 14.5 | 15.5 | 16.5 | 17.5
