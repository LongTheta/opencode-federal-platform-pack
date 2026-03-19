# quality-gate-check Tool

## Purpose

Run quality-gate checks over changed files; return verdict, blockers, warnings, and informational findings.

---

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `trigger_paths` | array | No | Paths from git diff; if empty, infer from workspace |
| `staged_only` | boolean | No | If true, only check staged changes; default false |
| `review_output` | string | No | Agent review output to check for evidence citations |

---

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `verdict` | string | pass | pass_with_warnings | fail |
| `push_ready` | boolean | True if verdict != fail |
| `blockers` | array | Findings that block push |
| `warnings` | array | Findings that warn |
| `informational` | array | Informational findings |
| `checks` | object | Per-category status (tests, documentation, security, etc.) |
| `required_actions` | array | Concrete actions when fail |

---

## When Commands Call It

- `/quality-gate` — Full check; primary use
- `/verify` — Focused check; faster pass

---

## Failure Cases

| Case | Behavior |
|------|----------|
| No git repo | Return fail; blocker: "Not a git repository" |
| Cannot read diff | Return fail; blocker: "Could not determine changed files" |
| Review output has recommendations without evidence | Add blocker to evidence_strength |

---

## Schema Reference

`schemas/quality-gate.schema.json`

---

## Example Usage

```json
{
  "trigger_paths": ["Dockerfile", "package.json", "src/api.ts"],
  "staged_only": true
}
```

```json
{
  "verdict": "fail",
  "push_ready": false,
  "blockers": [
    {
      "id": "security-001",
      "category": "security",
      "message": "Dockerfile uses :latest base image",
      "evidence": "Dockerfile:1",
      "required_action": "Pin to digest: FROM python:3.12@sha256:..."
    }
  ],
  "warnings": [],
  "required_actions": ["Pin Docker base image to digest"]
}
```
