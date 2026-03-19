# Supply Chain & SBOM Checklist

Use when assessing supply chain security. Align to DoD Play 7, NIST SA-12, SI-7.

---

## 1. SBOM Generation

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 1.1 | SBOM generated at build time | syft, cyclonedx-npm, bom tool in pipeline |
| 1.2 | SBOM format (CycloneDX or SPDX) | cyclonedx.json, spdx.json in artifacts |
| 1.3 | SBOM included in release artifacts | SBOM attached to container images or releases |
| 1.4 | Transitive dependencies included | SBOM depth includes all deps |

---

## 2. Dependency Pinning

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 2.1 | Lock files present | package-lock.json, yarn.lock, go.sum, Cargo.lock, Pipfile.lock |
| 2.2 | No floating versions in prod | No `*`, `^1.0`, `~1.0` in production deps |
| 2.3 | Lock files committed | Lock files in repo, not gitignored |
| 2.4 | Dependencies updated in controlled way | Dependabot, Renovate, or manual PR process |

---

## 3. Provenance & Attestation

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 3.1 | Build provenance | SLSA provenance, in-toto attestation |
| 3.2 | Artifact signing | cosign, sigstore; .sig files |

---

## 4. Vulnerability Scanning

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 4.1 | SCA in pipeline | Trivy, Snyk, Dependabot, npm audit |
| 4.2 | Fail on high/critical | Pipeline fails on critical or high CVEs |
| 4.3 | Scan results in artifacts | Scan results stored or reported |

---

## 5. Container Image Security

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 5.1 | No `:latest` in prod | Pinned digests (sha256:...) |
| 5.2 | Images signed | cosign verify in deployment |
| 5.3 | Base image provenance | Minimal, trusted base images |
