# No Push Without Verification

## MUST / MUST NOT

- **MUST** run verification checklist when user asks "ready to push?" or "merge ready?"
- **MUST** output `[BLOCK]` with reason if any condition fails.
- **MUST NOT** say "looks good" or "ready" without explicit verification.

## Rule

Do NOT recommend or approve push/merge readiness without verification of required checks.

## Conditions (All Must Pass)

Before recommending push or merge:

1. **Evidence** — All findings and recommendations cite observable evidence. No unverified claims.
2. **Security** — For build/deploy changes: no plaintext secrets, no `:latest` in prod, no disabled TLS.
3. **Supply chain** — For build/deploy changes: dependencies pinned, lock file present where applicable.
4. **Documentation** — For meaningful code/arch/deploy changes: doc updates specified.
5. **Quality gate** — If `/quality-gate` or equivalent was run: no blocking High findings.

## Enforcement

- **REQUIRED:** When user asks "ready to push?" or "merge ready?", run the verification checklist.
- **REQUIRED:** If any condition fails, output: `[BLOCK] Push/merge not recommended. <condition> failed: <reason>.`
- **REQUIRED:** List required actions before push/merge.
- **FORBIDDEN:** Saying "looks good" or "ready" without explicit verification.

## Output Format

```
**Verdict:** PASS | BLOCK
**Checks:** Evidence | Security | Supply chain | Docs | Quality gate
**Blocking items:** <list or "None">
**Required before push:** <concrete actions>
```
