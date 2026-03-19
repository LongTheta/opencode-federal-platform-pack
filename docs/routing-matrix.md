# Routing Matrix

Command → Agent → Skills → Schema. Quick reference.

---

## Full Matrix

| Command | Agent | Primary Skills | Output Schema | Lifecycle Phase |
|---------|-------|----------------|---------------|-----------------|
| repo-assess | repo-auditor | well-architected-review | review-score.schema.json | assessment |
| solution-discovery | solution-architect | — | Markdown | discovery |
| platform-design | solution-architect | aws-derived-principles | Architecture options | synthesis |
| federal-checklist | federal-security-reviewer | federal-platform-review, nist-compliance-evaluator, well-architected-review | review-score + compliance-report | assessment |
| gitops-audit | gitops-reviewer | gitops-capability-audit, well-architected-review | review-score.schema.json | assessment |
| quality-gate | repo-auditor | quality-gate-workflow, governance-plugin/rules-map | quality-gate.schema.json | verification |
| doc-sync | documentation-writer | well-architected-review (context) | Drift report | documentation |
| verify | repo-auditor | quality-gate-workflow | quality-gate.schema.json | verification |
| checkpoint | solution-architect | — | Checkpoint markdown | checkpointing |
| orchestrate | solution-architect | — | Workflow plan | orchestration |

---

## By Lifecycle Phase

| Phase | Commands |
|-------|----------|
| discovery | solution-discovery |
| assessment | repo-assess, federal-checklist, gitops-audit |
| synthesis | platform-design |
| verification | quality-gate, verify |
| orchestration | orchestrate |
| checkpointing | checkpoint |
| documentation | doc-sync |

---

## By Agent

| Agent | Commands |
|-------|----------|
| repo-auditor | repo-assess, quality-gate, verify |
| solution-architect | solution-discovery, platform-design, checkpoint, orchestrate |
| federal-security-reviewer | federal-checklist |
| gitops-reviewer | gitops-audit |
| documentation-writer | doc-sync |
