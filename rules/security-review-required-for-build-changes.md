# Security Review Required for Build Changes

## MUST / MUST NOT

- **MUST** run security and supply-chain checks when CI/CD, containers, dependencies, or IaC change.
- **MUST NOT** approve push/merge for trigger changes without completing the checks.
- **MUST NOT** skip security review for build/deploy changes.

## Rule

Security and supply-chain review are REQUIRED when CI/CD, containers, dependencies, or IaC change.

## Trigger Conditions

- Change to: Dockerfile, docker-compose, container config
- Change to: package.json, go.mod, requirements.txt, Cargo.toml, Pipfile
- Change to: .github/workflows, .gitlab-ci.yml, Jenkinsfile, or equivalent
- Change to: Terraform, CloudFormation, Pulumi, Bicep, or equivalent IaC
- Change to: Helm, Kustomize, Argo CD, Flux manifests

## Required Checks

1. **Secrets** — No plaintext in code, config, or pipeline. External secrets (Vault, ESO) preferred.
2. **Tags/versions** — No `:latest` or unversioned refs in production. Use digest or pinned version.
3. **Dependencies** — Pinned (lock file). No floating versions. Run vulnerability scan.
4. **IAM/identity** — Least privilege. Workload identity preferred over long-lived keys.
5. **Network** — No overly permissive rules. TLS where applicable.
6. **SBOM/provenance** — Recommend where production artifacts are built.

## Enforcement

- **REQUIRED:** When reviewing or proposing a trigger change, run the security and supply-chain checks.
- **REQUIRED:** Output findings in format: Severity | Evidence | Recommendation.
- **REQUIRED:** Do not approve push/merge for trigger changes without completing the checks.
- **FORBIDDEN:** Skipping security review for build/deploy changes.

## Output Format

```
**Change type:** <CI/CD | Container | Dependencies | IaC>
**Security checks:** Secrets | Tags | Deps | IAM | Network | SBOM
**Findings:** <list with evidence>
**Blocking:** <yes/no and items>
```
