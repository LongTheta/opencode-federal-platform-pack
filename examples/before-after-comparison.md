# Before / After Comparison

Example showing how remediation improves scores. Uses `examples/fixture-repo` as the "before" state.

---

## Before (fixture-repo with gaps)

**Run:** `node scripts/evidence-extractor.js examples/fixture-repo | node scripts/federal-control-mapper.js -`

**Typical gaps:**
- Dockerfile uses `:latest` → quality-gate warning
- No `package-lock.json` → supply chain gap
- No SBOM → SA-12, SI-7 gap
- Minimal Terraform → CM partial, no full IaC
- No observability config → AU, SI-4 gap

**Expected control coverage:** Partial on CM (terraform), SA (Dockerfile), CI (gitlab-ci). Gaps on AU, IA, IR, etc.

---

## After (remediated)

**Changes to make:**
1. Pin Dockerfile base: `FROM node:20.18.0-alpine`
2. Add `npm install` and commit `package-lock.json`
3. Add SBOM step to CI (e.g. `syft` or `cyclonedx-npm`)
4. Add logging config (e.g. `log4j`, `winston`, or CloudWatch)
5. Add external secrets (e.g. Vault, AWS Secrets Manager)

**Re-run:** `evidence-extractor` → `federal-control-mapper`

**Expected:** More control families show "partial"; fewer items in `remediation_roadmap`; `quality-gate` passes (no `:latest`).

---

## Score Impact (illustrative)

| Metric | Before | After |
|--------|--------|-------|
| Security category | ~5 (D) | ~7 (C) |
| Production readiness | not_ready | conditionally_ready |
| FedRAMP readiness estimate | Low | Moderate |
| Quality-gate verdict | pass_with_warnings | pass |

*Actual scores depend on full `/repo-assess` and `/federal-checklist` runs.*
