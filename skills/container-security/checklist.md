# Container Security Checklist

Use when assessing container security per NIST SP 800-190.

---

## 1. Image Build

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 1.1 | Minimal base image | Alpine, distroless, or minimal base |
| 1.2 | Multi-stage build | Separate build and runtime stages |
| 1.3 | No secrets in image | No ENV with secrets; no .env in image |
| 1.4 | Non-root user | USER directive; not root in runtime |
| 1.5 | Vulnerability scan in build | Trivy, Snyk, or similar in pipeline |

---

## 2. Image Security

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 2.1 | Pinned digests (no :latest) | sha256:... in prod |
| 2.2 | Signed images | cosign, sigstore |
| 2.3 | SBOM for images | syft, cyclonedx |

---

## 3. Registry

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 3.1 | Private registry | ECR, GCR, Artifact Registry, Harbor |
| 3.2 | Access control | IAM, RBAC on registry |
| 3.3 | Image signing | Registry policy for signed only |

---

## 4. Runtime (Kubernetes)

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 4.1 | Read-only root filesystem | securityContext.readOnlyRootFilesystem |
| 4.2 | No privileged | securityContext.privileged: false |
| 4.3 | Resource limits | resources.limits set |
| 4.4 | Security context | runAsNonRoot, allowPrivilegeEscalation: false |

---

## 5. Orchestration

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 5.1 | Network policies | NetworkPolicy for ingress/egress |
| 5.2 | RBAC | RBAC for service accounts |
| 5.3 | Secrets management | External Secrets, Vault, cloud native |
