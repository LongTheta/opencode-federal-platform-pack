# Solution Discovery Checklist

Use when conducting discovery. Ensure mandatory questions are answered before design.

---

## Mandatory (Must Answer Before Design)

| Domain | Questions |
|--------|-----------|
| Business objective | What problem? What does success look like? |
| Users and personas | Who? How many (order of magnitude)? |
| Functional requirements | What must the system do? (top 3–5) |
| Non-functional requirements | Availability? Latency? RTO/RPO? |
| Performance and scale | Users/transactions/data volume? |
| Data sensitivity and compliance | Sensitive data? Compliance regime? |
| Hosting and cloud | Cloud/on-prem? Which provider(s)? |
| Budget and timeline | Budget band? Target date? |
| Security constraints | Mandated controls? |

---

## Situational (Ask When Domain Applies)

| Domain | When |
|--------|------|
| Integrations | System connects to other systems |
| Environment strategy | Multiple environments |
| CI/CD and release | Deployment in scope |
| Operations and support | Who supports; escalation |
| Observability | Monitoring in scope |
| Team maturity | Build/run responsibility |
| Documentation | Audit, onboarding, handoff |
| Success metrics | Measurable outcomes |

---

## Risk Indicators (Probe Further)

| Answer Pattern | Risk |
|----------------|------|
| "We need everything" | Scope creep |
| "No clear priority" | Scope creep |
| "We'll figure it out later" | Compliance risk |
| "Everyone" / "all users" | Monolithic design |
| "As fast as possible" | Over-engineering |
| "Unlimited" budget | Unrealistic |
| "Standard" security | No mandated controls |
