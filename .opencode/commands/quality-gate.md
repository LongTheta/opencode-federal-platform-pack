---
description: Pre-push quality gate — evidence, security, docs, supply chain
agent: repo-auditor
---

# /quality-gate

## Intent

Run pre-push quality gate. Check evidence, security, docs, supply chain, Well-Architected requirements. Produce verdict: pass | pass with warnings | fail.

## When to Run

- Before push or merge
- As gate in PR review
- Before release
- When user asks "ready to push?"

## Required Context

- Repository workspace
- Staged or recent changes (git diff)
- docs/quality-gate-workflow.md, .opencode/plugins/governance-plugin/rules-map.md

## Questions to Ask

- What files changed? (trigger patterns)
- Are there plaintext secrets?
- Is :latest used in production path?
- Are docs updated for meaningful changes?
- Do recommendations cite evidence?

## Steps

1. Gather changed files (git diff --staged or git diff)
2. Classify changes to trigger categories
3. Run checks per rules-map
4. Classify findings: block | warn | info
5. Compute verdict
6. Produce report

## Routing

- **Agent:** repo-auditor
- **Skills:** quality-gate-workflow
- **Tools (future):** quality-gate-check

## Output Contract

- **Schema:** schemas/quality-gate.schema.json
- **Required:** verdict, blockers, warnings, informational, required_actions

## Quality Bar

- FAIL if any block finding
- WARN if any warn finding
- Use rules-map as single source of truth

## Exit Criteria

- Verdict and findings conform to schema
- All blocking findings listed with required actions

## Blocking Conditions

- **Verdict fail blocks push readiness.** User must not push until blockers resolved.
