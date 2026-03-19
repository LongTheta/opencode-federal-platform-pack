---
description: Full repository assessment — architecture, security, deployment readiness
agent: repo-auditor
---

# Repository Assessment

**Purpose:** Comprehensive review of a software repository for architecture, maintainability, security, and deployment readiness. Think like a senior engineer. Identify gaps, recommend actions, avoid shallow advice.

**When to use:** Evaluating public or private repos for onboarding, due diligence, pre-merge review, or production readiness.

**Required inputs:** Repository context (current workspace or specified path).

**Optional inputs:** Focus areas (e.g., security-only, cloud-only), compliance context (federal/regulated).

**Workflow:**
1. Map repository structure, tech stack, and entry points.
2. Assess architecture: patterns, coupling, scalability, technology choices.
3. Assess maintainability: code quality, documentation, tests, dependency management.
4. Assess security: secrets, dependencies, config, access control, supply chain.
5. Assess deployment readiness: build, deploy, observability, runbooks.
6. Produce findings with evidence; prioritize recommendations.

**Expected output format:** Use schemas/review-report.json structure.
- Executive summary (2–4 sentences; critical findings)
- Per-domain findings (Architecture | Maintainability | Security | Deployment)
- Severity per finding: High (blocking) | Medium (should fix) | Low (nice-to-have)
- Evidence: file path and line/range
- Prioritized recommendations (ordered by impact and effort)

**Guardrails:**
- Every finding cites specific files, configs, or patterns.
- No speculation; if evidence is missing, state it and recommend verification.
- No generic advice; recommendations must be actionable and repo-specific.

**Definition of done:** Report delivered with at least one finding per domain where applicable; all findings have evidence; recommendations are ordered and actionable.
