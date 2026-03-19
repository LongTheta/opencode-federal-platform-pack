---
name: gitops-maturity
description: Evaluates GitOps, CI/CD, observability, IaC, and platform engineering maturity. Use when assessing pipeline security, deployment practices, or platform readiness.
---

# GitOps Maturity Skill

Evaluates GitOps, CI/CD, observability, IaC, and platform engineering maturity. Produces scorecards and improvement roadmaps.

## When to Use

- Pipeline security and supply-chain review
- GitOps adoption assessment
- Platform engineering maturity evaluation
- Pre-production readiness check

## Evaluation Dimensions

| Dimension | What to Assess |
|-----------|----------------|
| CI/CD | Pipeline structure, stages, security gates, artifact handling |
| GitOps | Declarative config, drift, promotion controls, environment separation |
| IaC | Modularity, drift detection, tagging, governance |
| Observability | Metrics, logs, tracing, alerting, runbooks |
| Supply Chain | SBOM, provenance, pinned deps, signed artifacts |

## Workflow

1. **Gather artifacts** — Pipelines, Argo CD/Flux manifests, IaC, observability configs.
2. **Evaluate per dimension** — Score and document findings.
3. **Identify blockers** — Items that block production readiness.
4. **Produce roadmap** — Prioritized improvements with effort estimates.

## Output Format

- Maturity scorecard (per dimension)
- Findings with severity
- Improvement roadmap
- Blockers list
