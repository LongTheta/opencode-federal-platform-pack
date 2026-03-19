# Evidence Before Claims

## MUST / MUST NOT

- **MUST** cite file path, line range, config, or manifest for every claim.
- **MUST** output `[EVIDENCE MISSING]` when evidence cannot be verified.
- **MUST NOT** use "likely," "may," "typically," or "you should consider" without repo-specific evidence.
- **MUST NOT** report severity for unverified items; use "Evidence not found."

## Rule

Every recommendation, finding, or claim MUST be supported by observed evidence. Missing evidence MUST be called out explicitly.

## Requirements

- **REQUIRED:** Cite specific file path, line range, config, or manifest for every claim.
- **REQUIRED:** Use format: "Observed X in `path` lines N–M" or "In `config.yaml` section Y, Z is configured."
- **REQUIRED:** If evidence is missing, output: `[EVIDENCE MISSING] <claim>. Recommend: <verification step>.`
- **FORBIDDEN:** "Likely," "may," "typically," "you should consider" without repo-specific evidence.
- **FORBIDDEN:** Findings or recommendations that cannot be verified by inspecting the cited location.

## Enforcement

- **REQUIRED:** Before making a finding or recommendation, confirm you have observable evidence.
- **REQUIRED:** If you cannot verify, state what is missing and how to verify.
- **REQUIRED:** Do not report severity (High/Medium/Low) for unverified items; report as "Evidence not found."
- **FORBIDDEN:** Inferring from general knowledge without repo-specific observation.

## Examples

**Bad:** "The application probably has secrets in environment variables."
**Good:** "In `config/app.yaml` lines 12–15, API keys are loaded from env vars. Recommend external secrets for production."

**Bad:** "Dependencies might be outdated."
**Good:** "`package.json` lists 47 deps; `npm audit` reports 3 high. Recommend pinning and upgrade. [If npm audit not run: EVIDENCE MISSING. Recommend: run `npm audit`.]"

**Bad:** "Consider adding a health check."
**Good:** "`main.py` has no `/health` or `/ready` endpoint (lines 1–50). Recommend adding health check for load balancer."

## Output Format for Missing Evidence

```
[EVIDENCE MISSING] <what could not be verified>
**Recommend:** <concrete verification step>
**Impact:** <why this matters for the review>
```
