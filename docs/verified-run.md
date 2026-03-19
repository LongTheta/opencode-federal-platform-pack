# Verified Run

Documented end-to-end run of OpenCode federal platform pack commands. Use this to verify the pack works in OpenCode.

---

## Prerequisites

- OpenCode installed (`npm install -g opencode` or equivalent)
- This repo cloned; run OpenCode from repo root

---

## Step 1: Start OpenCode

```bash
cd opencode-federal-platform-pack
opencode
```

OpenCode loads `.opencode/opencode.json` and plugins from `.opencode/plugins/`.

---

## Step 2: Run /repo-assess

In the OpenCode session:

```
/repo-assess
```

**Expected:** Agent (repo-auditor) runs. Output conforms to `schemas/review-score.schema.json`:
- review_target (name, type, scope)
- summary (final_score, letter_grade, confidence, production_readiness)
- categories (security, reliability, performance, cost_awareness, operational_excellence) with score, rationale, evidence_found, missing_evidence, risks, recommended_actions
- findings (critical, high, medium, low, informational)
- top_priorities

**Verify:** Copy output JSON; run `node scripts/validate-schema.js review-score <file>` — should pass.

---

## Step 3: Run /quality-gate

```
/quality-gate
```

**Expected:** Agent runs. Output includes verdict (pass | pass_with_warnings | fail), blockers, warnings, required_actions.

**Verify:** Output conforms to `schemas/quality-gate.schema.json`.

---

## Step 4: Plugin Enforcement

**Test .env block:**
- Ask the agent to read `.env` (or a file containing `.env` in path)
- **Expected:** Plugin blocks with error: "Do not read .env files"

**Test git push warn:**
- Ask the agent to run `git push`
- **Expected:** Plugin logs warning: "Consider running /quality-gate before push"

**Test block (optional):**
- Set `FEDERAL_PLATFORM_BLOCK_PUSH=1` in environment
- Ask agent to run `git push`
- **Expected:** Plugin throws; push blocked

---

## Step 5: Run /orchestrate

```
/orchestrate Prepare this repo for federal deployment
```

**Expected:** Numbered plan with steps (e.g., repo-assess → platform-design → federal-checklist → quality-gate).

---

## Verification Checklist

| Step | Command / Action | Expected |
|------|------------------|----------|
| 1 | Start OpenCode | Loads config, plugins |
| 2 | /repo-assess | review-score schema output |
| 3 | /quality-gate | verdict, blockers, warnings |
| 4 | Read .env | Blocked |
| 4 | git push | Warn (or block if env set) |
| 5 | /orchestrate | Workflow plan |

---

## Automated Verification

Without OpenCode UI, run:

```bash
npm install
npm run verify       # Smoke test: structure, schemas, scripts
npm test             # Unit tests + schema validation
```

These verify the pack structure and scripts. Full command verification requires an OpenCode session.
