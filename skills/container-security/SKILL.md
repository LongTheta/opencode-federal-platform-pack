---
name: container-security
description: Container security assessment per NIST SP 800-190. Evaluates image build, registry, runtime, orchestration, and supply chain for containers. Use for federal-checklist, repo-assess, gitops-audit.
risk_tier: 1
---

# Container Security Skill

Assesses container security per **NIST SP 800-190** (Application Container Security Guide). Covers image, registry, orchestration, and runtime security. **Aligned to:** NIST 800-190, DoD DevSecOps (Play 3 — Containerized Microservices), FedRAMP container workloads.

---

## When to Use

- Federal checklist (container workloads)
- Repo assessment (containerized apps)
- GitOps audit (container images, registry)
- Pre-production readiness for containerized federal workloads

---

## NIST 800-190 Threat Areas

| Threat Area | What to Assess |
|-------------|----------------|
| **Image** | Base image choice; minimal layers; no secrets in image; vulnerability scanning |
| **Registry** | Access control; signing; no public untrusted images |

---

## Evaluation Domains

| Domain | What to Assess | Evidence |
|--------|----------------|----------|
| **Image build** | Minimal base; multi-stage; no secrets; non-root user | Dockerfile, Dockerfile.* |
| **Image security** | No `:latest`; pinned digests; signed; vulnerability scan | Pipeline, cosign, Trivy |
| **Registry** | Private registry; access control; image signing | ECR, GCR, Artifact Registry config |
| **Runtime** | Read-only root; no privileged; resource limits; security context | Kubernetes manifests, pod spec |
| **Orchestration** | Network policies; RBAC; secrets management | K8s RBAC, NetworkPolicy, External Secrets |
| **Supply chain** | SBOM for images; provenance | See supply-chain-sbom skill |

---

## Workflow

1. **Gather artifacts** — Dockerfile, docker-compose, Kubernetes manifests, pipeline configs.
2. **Evaluate each domain** — Use `checklist.md` for criteria.
3. **Document evidence** — What was observed; what was not found.
4. **Assess readiness** — Per domain; severity for gaps.
5. **Produce findings** — Include in federal-checklist, repo-assess, or gitops-audit output.

---

## Mandatory Rules

- **REQUIRED:** Every finding cites observable evidence or states "Evidence not found."
- **REQUIRED:** Map to NIST 800-190 threat areas; DoD Play 3 where applicable.
- **REQUIRED:** Reference supply-chain-sbom for SBOM, provenance, signing.
- **FORBIDDEN:** Claim compliance; use "readiness," "gap," "partial."

---

## References

- [NIST SP 800-190](https://www.nist.gov/publications/application-container-security-guide) — Application Container Security Guide
- [DoD Enterprise DevSecOps 2.0 Playbook](https://dl.dod.cyber.mil/wp-content/uploads/devsecops/pdf/DoD-Enterprise-DevSecOps-2.0-Playbook.pdf) — Play 3 (Containerized Microservices)
- `contexts/federal-compliance-criteria.md` — NIST 800-190 alignment
- `skills/supply-chain-sbom/` — SBOM, provenance, signing
