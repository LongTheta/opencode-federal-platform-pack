---
name: supply-chain-sbom
description: Software supply chain and SBOM assessment. Evaluates dependency pinning, SBOM generation, provenance, attestation, vulnerability scanning, and signed artifacts. Aligned to DoD DevSecOps, FedRAMP, NIST 800-53 SA-12/SI-7. Use for federal-checklist, gitops-audit, repo-assess.
risk_tier: 1
---

# Supply Chain & SBOM Skill

Assesses software supply chain security: SBOM generation, provenance, attestation, dependency pinning, vulnerability scanning, and signed artifacts. **Aligned to:** DoD Enterprise DevSecOps Fundamentals (Play 7), FedRAMP SA-12/SI-7, NIST 800-53, Executive Order 14028 (SBOM).

---

## When to Use

- Federal checklist (supply chain domain)
- GitOps audit (security scanning and supply chain capability)
- Repo assessment (security category)
- Pre-production readiness for federal/DoD workloads

---

## Evaluation Domains

| Domain | What to Assess | Evidence |
|--------|----------------|----------|
| **SBOM generation** | CycloneDX, SPDX; build-time generation; included in artifacts | syft, cyclonedx-npm, bom tool output |
| **Dependency pinning** | Lock files (package-lock.json, go.sum, Cargo.lock); no floating versions | Lock files present; no `*` or `^1.0` in prod |
| **Provenance** | Build provenance (SLSA, in-toto); source attestation | SLSA provenance, attestations |
| **Attestation** | Signed artifacts; cosign, sigstore | .sig files, attestation bundles |
| **Vulnerability scanning** | SCA in pipeline; CVE blocking; Dependabot, Snyk, Trivy | Pipeline scan step; fail on high/critical |
| **Signed artifacts** | Container images signed; no unsigned prod images | cosign verify; image policy |

---

## Workflow

1. **Gather artifacts** — package.json, go.mod, Cargo.toml, Dockerfile, pipeline configs, lock files.
2. **Evaluate each domain** — Use `checklist.md` for criteria.
3. **Document evidence** — What was observed; what was not found.
4. **Assess readiness** — Per domain; severity for gaps.
5. **Produce findings** — Include in federal-checklist, gitops-audit, or review-score output.

---

## Mandatory Rules

- **REQUIRED:** Every finding cites observable evidence or states "Evidence not found."
- **REQUIRED:** Map to NIST SA-12 (Supply Chain), SI-7 (Software Integrity) where applicable.
- **REQUIRED:** Reference DoD Play 7 (Meaningful DevSecOps Pipeline) for remediation.
- **FORBIDDEN:** Claim compliance; use "readiness," "gap," "partial."

---

## References

- [DoD Enterprise DevSecOps Fundamentals v2.5](https://dodcio.defense.gov/Portals/0/Documents/Library/DoD%20Enterprise%20DevSecOps%20Fundamentals%20v2.5.pdf) — Play 7
- [NIST 800-53 SA-12](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) — Supply Chain Risk Management
- [NIST 800-53 SI-7](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) — Software, Firmware, and Information Integrity
- [SLSA Framework](https://slsa.dev/) — Supply chain Levels for Software Artifacts
- `contexts/federal-compliance-criteria.md` — DoD DevSecOps, supply chain
