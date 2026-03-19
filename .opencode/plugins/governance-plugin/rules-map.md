# Governance Rules Map

Block / warn / informational matrix for quality-gate and plugin. Single source of truth.

---

## Trigger Patterns

| Check | Trigger Paths |
|-------|---------------|
| **Tests** | `*.py`, `*.js`, `*.ts`, `*.tsx`, `*.go`, `*.java`, `*.rs`, `*.rb`, `*.php`, `*.cs` (exclude `*_test.*`, `*.test.*`, `*.spec.*`) |
| **Documentation** | API code, `config/*`, `*.yaml`, `*.yml`, build scripts, deploy manifests, `Dockerfile`, `docker-compose*` |
| **Security** | `package.json`, `go.mod`, `requirements.txt`, `Cargo.toml`, `Pipfile`, `.github/`, `.gitlab-ci.yml`, `Jenkinsfile`, `Dockerfile`, `docker-compose*`, `*.tf`, `*.bicep`, `cloudformation/`, `cdk/` |
| **Architecture** | `*.tf`, `*.bicep`, `cloudformation/`, `cdk/`, `helm/`, `kustomize/`, `manifests/`, `deployments/`, `argocd/`, `flux/` |
| **Changelog** | API changes, config schema changes, breaking changes, `package.json` version, release tags |
| **Ownership/Tagging** | `aws_*`, `azurerm_*`, `google_*` in IaC |
| **Evidence strength** | Agent review output |

---

## Block (Fail)

| Category | Condition |
|----------|-----------|
| Documentation | Meaningful code/config/deploy change without doc update |
| Documentation | Build or run steps changed without README update |
| Security | Plaintext secrets in code/config |
| Security | `:latest` or unversioned ref in production |
| Security | Disabled TLS or overly permissive IAM |
| Security | Dependency/CI/container/IaC change without security review |
| Security | Dependency change without lock file |
| Evidence | Recommendation without evidence |
| Evidence | Unverified claim presented as fact |

**Push readiness:** Blocked. Do not push until resolved.

---

## Warn (Pass with Warnings)

| Category | Condition |
|----------|-----------|
| Tests | New production code without test changes |
| Tests | Test framework present but new code has no tests |
| Tests | CI does not run tests |
| Documentation | Architecture or deployment model changed without doc |
| Documentation | Runbook not updated for ops change |
| Architecture | New IaC or cloud resources without architecture note |
| Architecture | Deployment model changed without doc |
| Changelog | Behavior change without CHANGELOG entry |
| Changelog | Release/version bump without CHANGELOG |
| Ownership/Tagging | New cloud resources without tags |
| Ownership/Tagging | Production resources missing required tags |

**Push readiness:** Allowed but not recommended. Address when practical.

---

## Informational

| Category | Condition |
|----------|-----------|
| Evidence | Missing evidence explicitly called out in output |
| General | Best-practice reminders |
| General | Suggestions for improvement |

**Push readiness:** No impact.

---

## Verdict Logic

| Verdict | Condition |
|---------|-----------|
| **fail** | One or more block findings |
| **pass with warnings** | No block; one or more warn |
| **pass** | No block; no warn |

---

## Observability, Access Control, Recovery, Deployment Safety

Quality-gate **FAIL** if:

- No observability (logs, metrics, health checks)
- No access control model documented or evident
- No deployment safety (no rollback, no canary, no approval)
- No documentation for major components
- No recovery strategy (RTO/RPO, backup, failover)

These are evaluated when quality-gate runs; they map to Security, Reliability, Operational Excellence categories.
