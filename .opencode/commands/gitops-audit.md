---
description: GitOps, CI/CD, and platform engineering maturity audit
agent: gitops-reviewer
---

# GitOps Audit

**Purpose:** Audit GitOps, CI/CD, IaC, observability, and platform engineering maturity. Evaluate pipelines (GitHub Actions, GitLab CI), deployment manifests (Argo CD, Flux, Helm, Kustomize), Terraform, supply chain (SBOM, provenance), and observability. Produce a maturity scorecard and prioritized improvement roadmap. Think like a platform engineering and DevSecOps specialist.

**When to use:** Assessing pipeline security, GitOps adoption, platform readiness, or pre-production maturity review.

**Required inputs:** Repository context (current workspace or specified path).

**Optional inputs:** Focus areas (supply chain only, observability only, CI/CD only).

**Workflow:**
1. Locate CI/CD configs (.github/workflows, .gitlab-ci.yml, Jenkinsfile, etc.).
2. Locate deployment manifests (Argo CD, Flux, Helm, Kustomize).
3. Locate IaC (Terraform, Pulumi, CloudFormation, Bicep).
4. Evaluate observability (metrics, logs, tracing, alerting, runbooks).
5. Evaluate supply chain (SBOM, provenance, pinned deps, signed artifacts).
6. Score maturity per dimension; identify blockers and improvements.

**Expected output format:**
- Executive summary
- Architecture Score (0–10 per category: Security, Reliability, Performance, Cost, Operations)
- Maturity scorecard: CI/CD | GitOps | IaC | Observability | Supply Chain (score + notes)
- Findings: Severity | Evidence | Recommendation
- Key Risks, Evidence Found, Missing Evidence
- Improvement roadmap: prioritized actions with effort estimates
- Blockers: items that must be addressed before production readiness

**Guardrails:**
- Zero Trust alignment: identity, supply chain, deployment integrity, secrets, promotion controls.
- Cite specific files and configs.
- Prioritize high-impact, low-effort improvements.
- Production-minded; focus on what matters for operations.

**Definition of done:** Scorecard for all dimensions; findings with evidence; roadmap with priorities; blockers clearly called out.
