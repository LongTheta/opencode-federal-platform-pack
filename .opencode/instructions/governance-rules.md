# Governance Rules

Enforce when proposing or reviewing code, config, cloud, or deployment changes.

---

## Documentation

**Required when:** API/config/deploy/architecture change.

**Update:** README, runbooks, architecture docs, inline comments. Docs reflect current state.

**Escalation:** `[DOC UPDATE REQUIRED] <change> requires update to <doc>.`

---

## Cloud (Tagging, Cost, Ownership)

**Required:** Tags on all billable resources: environment, owner, cost center.

**Flag:** `[TAGGING GAP] <resource> in <file>:<line> missing tags: <list>.`

**Cost:** Check right-sizing, unconstrained scaling; recommend budget alerts.

---

## GitOps (Supply Chain, Security, Promotion)

**Supply Chain:** Pinned deps, no `:latest` in prod, SBOM where applicable. Block push without review for dependency/CI/container/IaC changes.

**Security:** No plaintext secrets, no disabled TLS, least-privilege IAM. Block push for build/deploy changes without security review.

**Promotion:** Manual approval for prod; environment separation; no shared credentials.

**Drift:** IaC with drift detection (Argo CD, Terraform plan in CI).
