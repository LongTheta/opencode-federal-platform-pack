# GitOps Capability Model

Use this model when conducting a GitOps capability audit. For each capability: assess against good/weak, identify anti-patterns, inspect evidence, and recommend remediation.

---

## 1. CI/CD Orchestration

### What Good Looks Like

- Pipeline has distinct stages: build, test, scan, artifact, deploy.
- Triggers are explicit (PR, tag, branch); no manual-only runs for prod.
- Artifacts are immutable (digest, version); stored in registry with retention.
- Failures fail fast; no silent passes; notifications on failure.
- Pipeline config is versioned in Git; no pipeline-in-pipeline or hidden logic.
- Idempotent and repeatable; same input yields same output.

### What Weak Looks Like

- Single monolithic job; no stage separation.
- Manual triggers only; no automation for deploy.
- Artifacts overwritten or ephemeral; no traceability.
- Failures ignored or suppressed; no alerting.
- Pipeline logic in UI or external config; not in repo.
- Non-deterministic; flaky runs; no retry strategy.

### Common Anti-Patterns

- **Kitchen sink job** — One job does build, test, deploy; no gates.
- **Manual deploy** — Prod deploy via `kubectl apply` or console; no pipeline.
- **Silent failure** — `|| true` or `continue-on-error: true` masking failures.
- **Floating refs** — `:latest`, `main`, unversioned; no pinning.
- **Secret in pipeline** — `AWS_ACCESS_KEY_ID`, `GITHUB_TOKEN` in plaintext.
- **Pipeline sprawl** — Duplicate pipelines per team; no shared templates.

### Evidence to Inspect

| Location | Look For |
|----------|----------|
| `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile` | Stage structure, triggers, `on:` / `rules:` |
| Pipeline config | `continue-on-error`, `|| true`, failure handling |
| Registry references | `image:tag`, digest (`sha256:...`), version |
| Notifications | Slack/Teams/PagerDuty on failure; status checks |
| Reusable workflows | `.github/workflows/reusable-*.yml`, `extends` |

### Suggested Remediation

1. Split pipeline into stages: build → test → scan → artifact → deploy.
2. Add explicit triggers; remove manual-only for prod.
3. Pin all artifact refs (digest or semantic version); remove `:latest`.
4. Remove `continue-on-error` for critical steps; add failure notifications.
5. Move pipeline config to Git; use reusable workflows or templates.
6. Document retry strategy; add idempotency checks where applicable.

---

## 2. GitOps and Configuration as Code

### What Good Looks Like

- Git is the single source of truth for desired state.
- Declarative manifests (Helm, Kustomize, raw YAML); no imperative `kubectl` in prod.
- Drift detection and reconciliation (Argo CD sync, Flux reconciliation).
- Environment-specific config in separate paths or overlays; no env vars in prod manifests.
- Change history in Git; PR reviews for config changes.
- Sync status visible; automated sync with health checks.

### What Weak Looks Like

- Manual `kubectl apply` or console edits; Git not authoritative.
- Imperative commands; ad-hoc config changes.
- No drift detection; cluster state diverges from Git.
- Shared config across envs; prod secrets in dev manifests.
- No PR review for config; direct push to main.
- Sync status unknown; manual reconciliation.

### Common Anti-Patterns

- **Git as backup** — Config in Git but cluster is source of truth; Git updated after manual changes.
- **Config drift** — Cluster modified directly; Argo CD/Flux not installed or disabled.
- **Monorepo chaos** — All envs in one path; overlay confusion; accidental prod deploy.
- **Secret in Git** — Base64 or plaintext secrets in manifests.
- **No sync policy** — Auto-sync with no health check; broken deploys propagate.
- **Manual sync** — Argo CD/Flux present but sync triggered manually only.

### Evidence to Inspect

| Location | Look For |
|----------|----------|
| `argocd/`, `flux/`, `deployments/` | Application manifests, sync policy, health checks |
| `helm/`, `kustomize/`, `manifests/` | Declarative config; overlays per env |
| Git history | PR flow for config changes; no direct push to prod path |
| Argo CD/Flux UI or CLI | Sync status, drift, health |
| `.argocd-source-*` or Flux Kustomization | Source repo, path, branch |

### Suggested Remediation

1. Install Argo CD or Flux; point to Git repo as source.
2. Define sync policy with health checks; enable auto-sync or require manual with status visibility.
3. Separate overlays/paths per environment; never mix prod config with dev.
4. Remove secrets from Git; use External Secrets Operator or sealed-secrets.
5. Require PR review for all config changes to prod path.
6. Document reconciliation cadence; enable drift alerts.

---

## 3. Security Scanning and Software Supply Chain

### What Good Looks Like

- SBOM produced for every build (CycloneDX, SPDX); stored as artifact.
- Vulnerability scanning in CI (Trivy, Snyk, Grype); fail on high/critical.
- Dependencies pinned (lock file); no floating versions.
- Container images by digest; no `:latest` in prod.
- Provenance or attestation (sigstore, in-toto); verifiable build chain.
- Dependency updates via Dependabot/Renovate; reviewed and merged.

### What Weak Looks Like

- No SBOM; no visibility into dependencies.
- No vulnerability scan; or scan present but does not block.
- Floating deps (`^1.2.3`, `>=1.0`); lock file absent or not committed.
- `:latest` or unversioned refs in prod.
- No provenance; build chain not verifiable.
- Manual dependency updates; outdated deps.

### Common Anti-Patterns

- **Scan and ignore** — Trivy/Snyk runs but `continue-on-error`; vulns ship.
- **No lock file** — `npm install` without `package-lock.json`; non-reproducible.
- **Latest in prod** — `image: nginx:latest`; no digest or version.
- **SBOM optional** — SBOM step commented out or conditional.
- **Unpinned transitive** — Direct deps pinned; transitive float.
- **No attestation** — Build artifacts not signed; supply chain not verifiable.

### Evidence to Inspect

| Location | Look For |
|----------|----------|
| Pipeline | `trivy`, `snyk`, `grype`, `npm audit`, `go list -m` |
| Pipeline | SBOM step (Syft, CycloneDX); artifact upload |
| `package.json`, `go.mod`, `requirements.txt` | Lock file present; pinned versions |
| Dockerfile, Kustomize, Helm | Image refs with digest or version; no `:latest` |
| `.github/dependabot.yml`, `renovate.json` | Automated dependency updates |
| sigstore, in-toto | Attestation step; provenance artifact |

### Suggested Remediation

1. Add Trivy or Snyk to pipeline; fail on high/critical; fix or document exception.
2. Add Syft or equivalent; publish SBOM artifact; store in registry or artifact store.
3. Ensure lock file present and committed; use `npm ci`, `go mod download`.
4. Replace all `:latest` with digest or semantic version.
5. Add provenance/attestation step (e.g., sigstore); verify in deploy gate.
6. Enable Dependabot or Renovate; establish review cadence for updates.

---

## 4. Promotion and Release Governance

### What Good Looks Like

- Clear promotion path: dev → staging → prod; no skip.
- Manual approval for production; required reviewers or environment protection.
- Environment separation (namespaces, clusters, accounts); no shared credentials.
- Release notes or changelog; traceability from commit to release.
- Rollback procedure documented and tested.
- Feature flags or canary where appropriate; no big-bang prod deploy.

### What Weak Looks Like

- Direct deploy to prod from dev; no staging.
- No approval for prod; anyone can merge and deploy.
- Shared credentials across envs; same service account for dev and prod.
- No release notes; no traceability.
- Rollback ad-hoc; no runbook.
- All-or-nothing deploy; no gradual rollout.

### Common Anti-Patterns

- **Skip staging** — Dev → prod; staging exists but unused.
- **Auto-merge prod** — PR merged and deployed without human approval.
- **Shared secrets** — One K8s secret or env file for all envs.
- **No promotion control** — Same pipeline deploys to all envs; env selected by branch only.
- **Undocumented rollback** — Team knows how but no runbook.
- **Deploy on merge** — Merge to main triggers prod deploy; no release gate.

### Evidence to Inspect

| Location | Look For |
|----------|----------|
| Pipeline | `environment: production` with `required_reviewers`; manual approval step |
| Argo CD/Flux | Separate Application per env; sync waves; no shared app |
| K8s namespaces, cluster config | Separate namespaces/clusters per env |
| Secrets config | Per-env secrets; no cross-env reference |
| `CHANGELOG.md`, release workflow | Release notes; tag-based release |
| `docs/runbooks/` | Rollback procedure; tested |

### Suggested Remediation

1. Enforce promotion path: dev → staging → prod; block direct prod from dev.
2. Add manual approval for prod; use environment protection or required reviewers.
3. Separate credentials per env; use External Secrets with env-specific backend.
4. Add release workflow; require release notes or changelog entry.
5. Document and test rollback; add to runbook.
6. Consider canary or feature flags for high-risk changes.

---

## 5. Observability and Continuous Monitoring

### What Good Looks Like

- Centralized logging (Loki, CloudWatch, Elastic); retention configured.
- Metrics and dashboards (Prometheus, Grafana); key SLOs defined.
- Distributed tracing (Jaeger, Tempo); trace IDs in logs.
- Alerting on failure, latency, error rate; runbooks linked to alerts.
- Pipeline emits metrics (build time, success rate); visible in dashboard.
- Audit trail for deploys; who deployed what, when.

### What Weak Looks Like

- Logs local or ephemeral; no central aggregation.
- No metrics or dashboards; blind to system health.
- No tracing; cannot trace request across services.
- No alerting; issues discovered by users.
- Pipeline opaque; no build metrics.
- No deploy audit; cannot answer "who deployed X?"

### Common Anti-Patterns

- **Logs to stdout only** — No aggregation; logs lost on pod restart.
- **Dashboard graveyard** — Dashboards exist but unused; no SLO ownership.
- **Alert fatigue** — Too many alerts; no runbook; alerts ignored.
- **No pipeline observability** — Build failures not surfaced; no metrics.
- **Audit gap** — Git history exists but deploy events not logged.
- **Retention unlimited** — Logs retained forever; cost and compliance risk.

### Evidence to Inspect

| Location | Look For |
|----------|----------|
| `prometheus/`, `grafana/`, `observability/` | Scrape configs, dashboards, alert rules |
| Pipeline | Log shipping; metric export; trace context |
| K8s config | Log sidecars; Prometheus annotations; OpenTelemetry |
| Runbooks | `docs/runbooks/`; alert → runbook mapping |
| Audit | Argo CD audit log; pipeline deploy events; Git tags |
| Retention | Log retention policy; metric retention |

### Suggested Remediation

1. Configure centralized logging; set retention; ensure pipeline logs included.
2. Define key metrics and SLOs; create dashboards; assign ownership.
3. Add distributed tracing; propagate trace IDs; link logs to traces.
4. Reduce alert noise; link alerts to runbooks; review and tune.
5. Emit pipeline metrics (build time, success rate); add to platform dashboard.
6. Enable deploy audit logging; retain for compliance; document retention.

---

## 6. Identity, Secrets, and Access Control

### What Good Looks Like

- Workload identity (OIDC, workload identity federation); no long-lived keys in pipelines.
- External secrets (Vault, ESO, Secrets Manager); no plaintext in code or config.
- Least privilege; scoped roles; no wildcard permissions.
- Per-environment secrets; no shared prod credentials.
- Secret rotation documented; rotation tested.
- RBAC for pipelines; only authorized identities can deploy to prod.

### What Weak Looks Like

- Long-lived API keys or client secrets in pipelines.
- Secrets in env vars, config files, or Git.
- Broad permissions; `*` in IAM or RBAC.
- Same secret for dev and prod.
- No rotation; secrets static.
- Anyone with repo access can deploy to prod.

### Common Anti-Patterns

- **Secret in env** — `DATABASE_URL` in pipeline env; visible in logs.
- **Key in repo** — `credentials.json`, `.env` committed; in Git history.
- **Wildcard IAM** — `"Resource": "*"`, `roles/owner` for pipeline.
- **Shared service account** — One SA for dev, staging, prod.
- **No rotation** — Secrets never rotated; compromise = long exposure.
- **Pipeline as god** — Pipeline has admin; deploys with elevated rights.

### Evidence to Inspect

| Location | Look For |
|----------|----------|
| Pipeline | `oidc`, `id-token: write`, `role-to-assume`; no `AWS_ACCESS_KEY_ID` |
| K8s, Helm, Kustomize | External Secrets Operator; Vault annotations; no `secretKeyRef` with literal |
| IAM, RBAC | Role definitions; scope; no `*` |
| `.env`, `config/` | No secrets; `.env.example` only |
| Git history | No `credentials`, `secret`, `password` in committed files |

### Suggested Remediation

1. Migrate pipeline to OIDC or workload identity federation; remove long-lived keys.
2. Implement External Secrets Operator or Vault; migrate secrets out of config.
3. Scope IAM/RBAC to minimum required; remove wildcards.
4. Separate secrets per environment; use env-specific secret backends.
5. Document rotation procedure; test rotation; schedule rotation.
6. Restrict prod deploy to specific identities; use branch protection and required reviewers.

---

## 7. Policy as Code and Compliance Evidence

### What Good Looks Like

- Policy enforced in CI (OPA, Checkov, tfsec); blocks non-compliant changes.
- Policy definitions in Git; versioned and reviewed.
- Audit trail for policy decisions; evidence retained.
- Required tags/labels enforced; untagged resources blocked.
- Compliance evidence exportable; reports for auditors.
- Policy exceptions documented and time-bound.

### What Weak Looks Like

- No policy checks; config not validated.
- Policy in UI only; not in Git.
- No audit trail; cannot prove what was enforced.
- Tags optional; resources untagged.
- No evidence export; manual evidence gathering.
- Exceptions permanent; no review.

### Common Anti-Patterns

- **Policy optional** — Checkov runs but does not block; findings ignored.
- **Policy bypass** — `# checkov:skip` or equivalent without justification.
- **No policy repo** — Policy defined in console; not versioned.
- **Evidence on demand** — No automated evidence; scramble during audit.
- **Tagging advisory** — Tags recommended but not enforced.
- **Exception sprawl** — Many exceptions; no expiry; no owner.

### Evidence to Inspect

| Location | Look For |
|----------|----------|
| Pipeline | Checkov, tfsec, OPA, Conftest step; failure on violation |
| `policies/`, `opa/`, `.checkov.yml` | Policy definitions; rules; exceptions with ticket |
| Azure Policy, AWS Config, GCP Org Policy | Cloud-native policy; assignments |
| Audit logs | Policy decision log; retention |
| Evidence export | Automated report; SBOM; control mapping |
| Exceptions | Documented; ticket; expiry; owner |

### Suggested Remediation

1. Add Checkov, tfsec, or OPA to pipeline; fail on critical violations.
2. Store policy definitions in Git; version and review changes.
3. Enable policy decision logging; retain for audit; document retention.
4. Enforce required tags/labels via policy; block untagged resource creation.
5. Automate evidence export (SBOM, policy report, control mapping); run periodically.
6. Require ticket and expiry for exceptions; review quarterly.

---

## Capability Score Guide

| Score | Meaning |
|-------|---------|
| 1 | No evidence; critical gaps; anti-patterns dominant |
| 2 | Partial; significant gaps; multiple anti-patterns |
| 3 | Adequate; some gaps; minor anti-patterns |
| 4 | Strong; minor gaps; isolated issues |
| 5 | Full evidence; good practices; no blocking anti-patterns |
