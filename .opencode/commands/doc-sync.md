---
description: Identify documentation drift; propose doc updates to match code/config/deploy
agent: documentation-writer
---

# /doc-sync

## Intent

Identify documentation drift. Compare README, runbooks, architecture docs against code, config, IaC, CI. Propose updates. No implementation.

## When to Run

- After meaningful code/config/deploy changes
- Before release when docs may be stale
- As part of quality-gate or repo-assess follow-up

## Required Context

- Repository workspace
- instructions/documentation-rules.md
- $ARGUMENTS (optional: focus paths)

## Questions to Ask

- Does README match build/run steps?
- Are env vars and config options documented?
- Do architecture docs reflect current infra?
- Are runbooks updated for ops changes?

## Steps

1. Compare docs to code/config/IaC/CI
2. Identify drift: outdated, missing, contradictory
3. Propose updates: file, section, change, rationale
4. Prioritize: critical, high, medium, low

## Routing

- **Agent:** documentation-writer
- **Skills:** well-architected-review (for context)
- **Tools (future):** evidence-extractor

## Output Contract

- **Format:** Drift report + proposed updates
- **Required:** file, section, drift type; proposed change, rationale; priority

## Quality Bar

- No implementation; proposals only
- Cite specific files and sections
- Priority reflects impact (critical = blocks ops)

## Exit Criteria

- Drift report complete
- Proposed updates with rationale
- No implementation performed

## Blocking Conditions

None.
