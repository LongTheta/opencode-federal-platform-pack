# Schemas

## Canonical Schemas

| Schema | Purpose | Used By |
|--------|---------|---------|
| **review-score.schema.json** | Canonical review output | /repo-assess, /gitops-audit, /federal-checklist |
| **quality-gate.schema.json** | Quality gate verdict | /quality-gate, /verify |
| **compliance-report.json** | Federal compliance extension | /federal-checklist |
| **command-routing.schema.json** | Command routing matrix | Docs |

## Deprecated (use review-score.schema.json)

| Schema | Deprecated | Replacement |
|--------|------------|-------------|
| platform-review-report.json | 0.3.0 | review-score.schema.json |
| review-report.json | 0.3.0 | review-score.schema.json |

## Validation

```bash
npm run validate:review-score path/to/output.json
npm run validate:quality-gate path/to/gate-output.json
```

Or use `node scripts/validate-schema.js <schema> <file>`.
