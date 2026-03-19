# GitOps Governance Rules

Enforce when reviewing or proposing CI/CD, GitOps, containers, dependencies, or IaC changes. Treat as mandatory.

---

## Supply Chain (REQUIRED)

- **REQUIRED:** Pinned dependencies; lock file present where applicable.
- **REQUIRED:** No `:latest` or unversioned refs in production. Use digest or pinned version.
- **REQUIRED:** Recommend SBOM, provenance, or attestation where production artifacts are built.
- **REQUIRED:** Block push/merge readiness for dependency, CI, container, or IaC changes without supply-chain review.

---

## Security (REQUIRED)

- **REQUIRED:** No plaintext secrets in code, config, or pipeline. External secrets (Vault, ESO) preferred.
- **REQUIRED:** No disabled TLS. Least-privilege IAM.
- **REQUIRED:** Block push/merge for build/deploy changes without security review.
- **FORBIDDEN:** Recommending disabled TLS, hardcoded secrets, or overly permissive IAM without flagging as High severity.

---

## Promotion and Environment Separation (REQUIRED)

- **REQUIRED:** Manual approval for production promotion.
- **REQUIRED:** Environment separation (dev, staging, prod).
- **REQUIRED:** No shared credentials across environments.

---

## Drift Detection (REQUIRED)

- **REQUIRED:** IaC with drift detection (Argo CD sync status, Terraform plan in CI).
- **REQUIRED:** Flag pipelines that do not validate IaC before apply.

---

## Trigger Conditions (REQUIRED)

Security and supply-chain checks REQUIRED when changing:

- Dockerfile, docker-compose, container config
- package.json, go.mod, requirements.txt, Cargo.toml, Pipfile
- .github/workflows, .gitlab-ci.yml, Jenkinsfile
- Terraform, CloudFormation, Pulumi, Bicep
- Helm, Kustomize, Argo CD, Flux manifests

---

## Output Format (REQUIRED)

```
**Change type:** CI/CD | Container | Dependencies | IaC
**Security checks:** Secrets | Tags | Deps | IAM | Network | SBOM
**Findings:** <list with evidence>
**Blocking:** <yes/no and items>
```
