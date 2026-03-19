# End-to-End Review Run

Example workflow showing the full pack in action: orchestrate → repo-assess → quality-gate.

---

## Scenario

New Python FastAPI service. Team wants to assess readiness and prepare for federal customer deployment.

---

## Step 1: Orchestrate

**User:** `/orchestrate Prepare this repo for federal customer deployment`

**Output (excerpt):**

```markdown
# Workflow Plan: Federal Customer Deployment

1. **repo-assess** — Full repository assessment
   - Input: Current repo
   - Output: review-score.schema.json (categories, findings, top_priorities)
   - Next: If production_readiness = not_ready, address critical findings before step 2.

2. **platform-design** — Architecture alignment (if gaps in step 1)
   - Input: Findings from repo-assess; federal constraints
   - Output: Architecture options with tradeoffs
   - Next: Proceed to federal-checklist.

3. **federal-checklist** — NIST control mapping
   - Input: Current state from repo-assess
   - Output: compliance-report.json; control mapping; remediation roadmap
   - Next: Address gaps; re-run quality-gate.

4. **quality-gate** — Pre-push verification
   - Input: Staged changes; full checklist
   - Output: pass / pass with warnings / fail
   - Next: If pass, ready for push. If fail, remediate blockers.
```

---

## Step 2: Repo Assess

**User:** `/repo-assess`

**Output (excerpt):**

```markdown
# OpenCode Architecture Review

**Target:** my-api-service
**Type:** service
**Scope:** ./

## Summary Metrics

| Metric | Value |
|--------|-------|
| Final Score | 6.8/10 |
| Letter Grade | D |
| Confidence | medium |
| Production Readiness | not_ready |

## Category Scores

| Category | Score | Grade |
|----------|-------|-------|
| Security | 5.5 | D |
| Reliability | 7.0 | C |
| Performance | 7.0 | C |
| Cost Awareness | 6.0 | D |
| Operational Excellence | 8.0 | B |

## Top Priorities

1. **Move secrets to external store** — config/settings.py has API keys in env — Severity: critical
2. **Pin base image** — Dockerfile uses python:latest — Severity: high
3. **Add dependency lock** — requirements.txt only; no lock file — Severity: high
```

---

## Step 3: Plugin Enforcement (During Session)

While the agent works:

- **User edits Dockerfile** → Plugin logs: "Supply-chain file edited. Reminder: pin dependencies, avoid :latest, consider SBOM."
- **User tries to read .env** → Plugin blocks: "Do not read .env files."
- **User runs git push** → Plugin warns: "Consider running /quality-gate before push."

---

## Step 4: Quality Gate

**User:** `/quality-gate`

**Output (excerpt):**

```markdown
# Quality Gate Report

**Verdict:** fail

## Blockers

1. Plaintext secrets in config/settings.py (lines 12–15)
2. Dockerfile uses :latest base image
3. No dependency lock file (requirements.txt changed; no requirements.lock)
4. Meaningful API change without doc update (README not updated)

## Warnings

1. New cloud resources in terraform/ without tags
2. No health check in deployment manifest

## Next Steps

1. Move secrets to Vault or Secrets Manager
2. Pin Docker base: `FROM python:3.12@sha256:...`
3. Add `pip freeze > requirements.lock` or use pip-tools
4. Update README with new API endpoints
5. Add tags to Terraform resources
6. Add liveness/readiness probes to k8s/deployment.yaml
```

---

## Step 5: Checkpoint (Handoff)

**User:** `/checkpoint`

**Output (excerpt):**

```markdown
# Session Checkpoint

## Current Task
Preparing my-api-service for federal deployment. Repo-assess and quality-gate completed.

## Key Decisions
- Use Vault for secrets (not env vars)
- Pin Python 3.12 with digest in Dockerfile
- Add pip-tools for lock file

## Files Modified
- (none yet; recommendations only)

## Blockers
- 4 quality-gate blockers must be fixed before push

## Next Steps
1. Implement secret migration to Vault
2. Update Dockerfile with pinned digest
3. Add requirements.lock via pip-tools
4. Update README
5. Re-run /quality-gate
```

---

## Summary

| Step | Command | Result |
|------|---------|--------|
| 1 | /orchestrate | Workflow plan with 4 steps |
| 2 | /repo-assess | Score 6.8/10, not_ready, 3 top priorities |
| 3 | (plugin) | Supply-chain reminder, .env block, push warning |
| 4 | /quality-gate | fail — 4 blockers, 2 warnings |
| 5 | /checkpoint | Handoff summary for next session |

This run demonstrates: **orchestration** → **assessment** → **enforcement** → **gate** → **handoff**.
