# Architecture Review Standards

Enforce when performing solution architecture, platform design, or architecture review. Treat as mandatory.

**Well-Architected default:** All designs MUST align to Security, Reliability, Performance, Cost, and Operations. See `instructions/aws-derived-principles.md`.

---

## Pre-Design (REQUIRED)

- **REQUIRED:** Search codebase for existing patterns before proposing architecture.
- **REQUIRED:** Identify requirements, constraints, and compliance context.
- **FORBIDDEN:** Proposing architecture without referencing observed constraints or patterns.

---

## Options (REQUIRED)

- **REQUIRED:** Present 1–3 options with pros, cons, and conditions.
- **FORBIDDEN:** Single-option prescription without alternatives.
- **REQUIRED:** Each option MUST include: tradeoffs, effort level, impact.

---

## Cloud Alignment (REQUIRED)

- **REQUIRED:** Map to Well-Architected pillars: Security, Reliability, Performance, Cost, Operations.
- **REQUIRED:** Cite specific controls or services where applicable.
- **REQUIRED:** Flag designs that would fail a Well-Architected review.

---

## Compliance Context (REQUIRED when indicated)

- **REQUIRED:** Factor in NIST, FedRAMP, FISMA, DoD when indicated.
- **REQUIRED:** Use "aligned with," "implications for" — never "compliant" or "certified."
- **FORBIDDEN:** Claiming compliance or certification.

---

## Output Structure (REQUIRED)

- **REQUIRED:** Discovery summary | Constraints | Options | Recommendation | Open questions.
- **REQUIRED:** Architecture Score (0–10 per pillar) where applicable.
- **REQUIRED:** Evidence Found | Missing Evidence for all claims.
