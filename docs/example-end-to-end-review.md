# Example End-to-End Review

Full workflow: orchestrate → repo-assess → quality-gate → checkpoint.

---

## Scenario

New Python FastAPI service. Team wants to assess readiness and prepare for federal customer deployment.

---

## Step 1: Orchestrate

**User:** `/orchestrate Prepare this repo for federal customer deployment`

**Output (excerpt):**

1. **repo-assess** — Full repository assessment. Output: review-score. Next: If not_ready, address critical findings.
2. **platform-design** — Architecture alignment (if gaps). Next: federal-checklist.
3. **federal-checklist** — NIST control mapping. Next: quality-gate.
4. **quality-gate** — Pre-push verification. Next: If pass, ready for push.

---

## Step 2: Repo Assess

**User:** `/repo-assess`

**Output (excerpt):**

- Final Score: 6.8/10 (D)
- Production Readiness: not_ready
- Top Priorities: Move secrets to external store (critical); Pin base image (high); Add dependency lock (high)

---

## Step 3: Plugin Enforcement (During Session)

- Edit Dockerfile → Plugin logs supply-chain reminder
- Try read .env → Plugin blocks
- Run git push → Plugin warns: run /quality-gate first

---

## Step 4: Quality Gate

**User:** `/quality-gate`

**Output (excerpt):**

- Verdict: fail
- Blockers: Plaintext secrets; Dockerfile :latest; No lock file; Doc not updated
- Required actions: Move secrets; Pin digest; Add lock; Update README

---

## Step 5: Checkpoint

**User:** `/checkpoint`

**Output (excerpt):**

- Task: Preparing for federal deployment
- Decisions: Use Vault for secrets; Pin Python 3.12
- Blockers: 4 quality-gate blockers
- Next steps: Implement fixes; re-run /quality-gate

---

## Summary

| Step | Command | Result |
|------|---------|--------|
| 1 | /orchestrate | 4-step plan |
| 2 | /repo-assess | 6.8/10, not_ready |
| 3 | (plugin) | Block/warn/log |
| 4 | /quality-gate | fail |
| 5 | /checkpoint | Handoff summary |

**Full example:** See `examples/end-to-end-review-run.md` for detailed output.
