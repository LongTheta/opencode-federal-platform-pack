# Command-to-Skill Mapping

How commands invoke skills. Single source of truth for orchestration.

---

## Mapping Table

| Command | Agent | Primary Skills | Supporting Skills | Output Schema |
|---------|-------|----------------|-------------------|---------------|
| /repo-assess | repo-auditor | well-architected-review | — | review-score.schema.json |
| /solution-discovery | solution-architect | — | — | Markdown |
| /platform-design | solution-architect | aws-derived-principles | — | Architecture options |
| /federal-checklist | federal-security-reviewer | federal-platform-review, nist-compliance-evaluator, well-architected-review | aws-federal-grade-checklist (if AWS) | review-score + compliance-report |
| /gitops-audit | gitops-reviewer | gitops-capability-audit, well-architected-review | — | review-score.schema.json |
| /quality-gate | repo-auditor | quality-gate-workflow | governance-plugin/rules-map | quality-gate.schema.json |
| /doc-sync | documentation-writer | well-architected-review (context) | documentation-rules | Drift report |
| /verify | repo-auditor | quality-gate-workflow | governance-plugin/rules-map | quality-gate.schema.json |
| /checkpoint | solution-architect | — | — | Checkpoint markdown |
| /orchestrate | solution-architect | — | — | Workflow plan |

---

## Skill Workflows

### /repo-assess

```
repo discovery → architecture inference → security review → observability review → scoring engine → final report
```

**Skill:** well-architected-review (checklist, output-template, scoring model)

### /federal-checklist

```
evidence extraction → control-family mapping → readiness report
```

**Skills:** federal-platform-review, nist-compliance-evaluator, well-architected-review; aws-federal-grade-checklist (AWS)

### /platform-design

```
discovery → constraints synthesis → reference architecture → decision log
```

**Skill:** aws-derived-principles (instructions)

### /quality-gate, /verify

```
gather changes → classify triggers → run checks → classify findings → verdict
```

**Skills:** quality-gate-workflow, governance-plugin/rules-map

---

## No Duplication

- **Commands** define intent, routing, output contract
- **Agents** execute; load skills via prompts
- **Skills** provide checklists, templates, domain logic
- **Instructions** provide cross-cutting rules (evidence, docs, security)
