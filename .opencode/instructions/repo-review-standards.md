# Repository Review Standards

Enforce when performing repository assessment or repo-audit. Treat as mandatory.

**Well-Architected default:** All reviews MUST evaluate Security, Reliability, Performance, Cost, and Operations. See `instructions/aws-derived-principles.md`.

---

## Pre-Review (REQUIRED)

- **REQUIRED:** Map structure, dependency manifests, CI/CD configs, deployment manifests, and documentation before producing findings.
- **REQUIRED:** Search for: package.json, go.mod, requirements.txt, Cargo.toml, Pipfile; .github/workflows, .gitlab-ci.yml; Dockerfile, docker-compose; Terraform, CloudFormation, Helm, Kustomize, Argo CD.
- **FORBIDDEN:** Producing findings without having inspected the relevant files.

---

## Finding Format (REQUIRED)

Every finding MUST use this structure:

```
**Finding:** <one-line title>
**Severity:** Critical | High | Medium | Low
**Evidence:** <file path>:<line or section>
**Recommendation:** <concrete step>
```

- **REQUIRED:** Every finding cites file path and line or section.
- **REQUIRED:** If evidence is missing, output: `[EVIDENCE MISSING] <area>. Recommend: <verification step>.`
- **FORBIDDEN:** Generic advice without repo-specific evidence.

---

## Domains (REQUIRED)

Cover each domain. If no findings, state "No findings" with rationale.

| Domain | What to Check |
|--------|---------------|
| Architecture | Patterns, constraints, technology choices |
| Maintainability | Structure, dependencies, test coverage |
| Security | Secrets, access control, supply chain |
| Deployment | CI/CD, containers, IaC |
| Reliability | Failure modes, recovery, health checks |
| Observability | Logs, metrics, traces, alerting |
| Cost | Right-sizing, tagging, cost attribution |

---

## Output Structure (REQUIRED)

- **REQUIRED:** Executive Summary — overall posture, top risks, verdict.
- **REQUIRED:** Architecture Score — 0–10 per category (Security, Reliability, Performance, Cost, Operations).
- **REQUIRED:** Evidence Found — what was observed; file paths, configs.
- **REQUIRED:** Missing Evidence — what could not be verified; recommend validation.
- **REQUIRED:** Recommended Actions — prioritized; concrete; with effort and impact.
