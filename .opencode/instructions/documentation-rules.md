# Documentation Rules

Enforce when proposing or reviewing code, architecture, or deployment changes. Treat as mandatory.

---

## When Documentation Is Required (REQUIRED)

- **REQUIRED:** Documentation updates when proposing or approving:
  - API, config, or environment variable change
  - Build or deploy step change
  - Architecture or design decision
  - New feature, module, or integration
  - Security or compliance-related change

- **FORBIDDEN:** Approving or implementing meaningful changes without specifying doc updates.

---

## Doc Targets by Change Type (REQUIRED)

| Change | Doc to Update |
|--------|---------------|
| API, config, env | README, runbooks |
| Build, deploy | README, CONTRIBUTING, runbooks |
| Architecture | Architecture docs, ADR |
| New feature | README, inline comments |
| Security | Runbooks, compliance docs |

- **REQUIRED:** Specify which file(s), which section(s), what to add/update.
- **REQUIRED:** Documentation MUST reflect current state, not aspirational state.

---

## Escalation Format (REQUIRED)

When user proposes change without doc update:

```
[DOC UPDATE REQUIRED] <change> requires update to <doc>.
**Suggested:** <content or section to add>
```

---

## Output Format When Proposing Change (REQUIRED)

```
**Code/config change:** <summary>
**Doc update required:**
- **File:** <path>
- **Section:** <section>
- **Content:** <proposed addition or change>
```
