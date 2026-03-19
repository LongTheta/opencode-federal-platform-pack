# Docs Required for Meaningful Change

## MUST / MUST NOT

- **MUST** include doc update specification when proposing meaningful change.
- **MUST** output `[DOC UPDATE REQUIRED]` when user proposes change without doc update.
- **MUST NOT** approve or implement meaningful changes without doc update specification.

## Rule

Meaningful code, architecture, or deployment changes REQUIRE corresponding documentation updates.

## Meaningful Change (Definition)

- API, config, or environment variable change
- Build or deploy step change
- Architecture or design decision
- New feature, module, or integration
- Security or compliance-related change

## Enforcement

- **REQUIRED:** When proposing a meaningful change, include doc update in the same response.
- **REQUIRED:** Specify: which file(s), which section(s), what to add/update.
- **REQUIRED:** If user proposes a change without doc update, output: `[DOC UPDATE REQUIRED] This change requires update to <doc>. Suggested: <content>.`
- **FORBIDDEN:** Approving or implementing meaningful changes without doc update specification.

## Doc Targets by Change Type

| Change | Doc to Update |
|--------|---------------|
| API, config, env | README, runbooks |
| Build, deploy | README, CONTRIBUTING, runbooks |
| Architecture | Architecture docs, ADR |
| New feature | README, inline comments |
| Security | Runbooks, compliance docs |

## Output Format

When proposing a change with doc update:

```
**Code/config change:** <summary>
**Doc update required:**
- **File:** <path>
- **Section:** <section>
- **Content:** <proposed addition or change>
```
