# federal-control-mapper Tool

## Purpose

Map repo artifacts to NIST 800-53 control families. Identify gaps with evidence; produce control-family coverage.

---

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `artifacts` | array | Yes | From evidence-extractor or equivalent |
| `control_families` | array | No | Subset of NIST 800-53 families; default all |
| `strictness` | string | No | federal | moderate | minimal; default federal |

---

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `control_mapping` | array | { family, control_id, status, evidence, gap } |
| `coverage` | object | Per-family: covered, partial, gap |
| `gaps` | array | Controls with no evidence |
| `evidence_found` | array | Controls with evidence |
| `remediation_roadmap` | array | Prioritized remediation for gaps |

---

## When Commands Call It

- `/federal-checklist` — After evidence extraction; primary use

---

## Failure Cases

| Case | Behavior |
|------|----------|
| No artifacts | Return empty mapping; all gaps |
| Invalid control family | Skip; log warning |
| Artifact parse error | Partial mapping; note in output |

---

## Schema Reference

`schemas/compliance-report.json` — control_mapping, gaps, remediation_roadmap

---

## Example Usage

```json
{
  "artifacts": [
    { "path": "terraform/iam.tf", "type": "iac" },
    { "path": "Dockerfile", "type": "container" }
  ]
}
```

```json
{
  "control_mapping": [
    { "family": "AC", "control_id": "AC-2", "status": "partial", "evidence": "terraform/iam.tf", "gap": "No MFA enforcement" }
  ],
  "gaps": ["AC-2(1)", "SC-2"],
  "remediation_roadmap": ["Require MFA for IAM users", "Add network segmentation"]
}
```
