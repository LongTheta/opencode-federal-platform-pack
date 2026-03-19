# Repository Cleanup Plan

**Mission alignment:** OpenCode-first AI engineering pack for (1) repository review + platform/architecture/DevSecOps recommendations, (2) solution architect + product manager discovery.

---

## 1. What to Keep

| Artifact | Reason |
|----------|--------|
| **Commands:** repo-assess, solution-discovery, platform-design, federal-checklist, gitops-audit, quality-gate | Core workflow: review + discovery + gate |
| **Agents:** solution-architect, product-manager-discovery, repo-auditor, federal-security-reviewer, gitops-reviewer, cloud-platform-reviewer | Each maps to a real need |
| **Skills:** repo-review, federal-platform-review, gitops-maturity, aws-platform-review, azure-platform-review, gcp-platform-review | Depth over breadth; cloud skills are provider-specific |
| **Rules:** all 5 | Enforceable; no duplication |
| **Docs:** architecture, usage, federal-alignment, quality-gate-workflow, solution-architect-discovery-framework | All referenced |
| **Contexts:** repo-review-context, solution-discovery-question-bank | Used by agents |
| **Schemas:** review-report, compliance-report, quality-gate | Structured output |
| **Examples:** sample-repo-review, sample-federal-report | Reference outputs |
| **Plugins:** pre-merge-quality.js, supply-chain-guard.js, governance-hooks.md | Pre-push workflow |

---

## 2. What to Merge

| Source | Target | Action |
|--------|--------|--------|
| repo-review-standards, architecture-review-standards, federal-review-standards | platform-review-standards.md | Single file for all review standards |
| documentation-rules, cloud-governance-rules, gitops-governance-rules | governance-rules.md | Single file for governance |
| federal-compliance skill | federal-platform-review skill | federal-platform-review already covers; add NIST control table to SKILL |
| federal-compliance-context | federal-platform-review/checklist.md | Already in checklist |
| cloud-eval-context | aws/azure/gcp skills | Each skill has provider-specific checklist |

---

## 3. What to Delete

| Artifact | Reason |
|----------|--------|
| doc-sync command | Doc drift is part of repo-assess and quality-gate; standalone is redundant |
| skill-create command | Meta; not core mission; use @product-manager-discovery ad hoc if needed |
| documentation-writer agent | Review agents produce structured output; redundant |
| federal-compliance skill | Merged into federal-platform-review |
| federal-compliance-context.md | Merged into federal-platform-review |
| cloud-eval-context.md | Merged into cloud skills |

---

## 4. What to Rename

| Current | New | Reason |
|---------|-----|--------|
| (none) | — | Names are already clear |

---

## 5. Final Repo Tree

```
opencode-federal-platform-pack/
├── .gitignore
├── README.md
├── .opencode/
│   ├── opencode.json
│   ├── commands/
│   │   ├── repo-assess.md
│   │   ├── solution-discovery.md
│   │   ├── platform-design.md
│   │   ├── federal-checklist.md
│   │   ├── gitops-audit.md
│   │   └── quality-gate.md
│   ├── instructions/
│   │   ├── core-engineering.md
│   │   ├── platform-review-standards.md
│   │   └── governance-rules.md
│   ├── prompts/agents/
│   │   ├── solution-architect.md
│   │   ├── product-manager-discovery.md
│   │   ├── repo-auditor.md
│   │   ├── federal-security-reviewer.md
│   │   ├── gitops-reviewer.md
│   │   └── cloud-platform-reviewer.md
│   ├── plugins/
│   │   ├── pre-merge-quality.js
│   │   ├── supply-chain-guard.js
│   │   └── governance-hooks.md
│   └── tools/
│       └── .gitkeep
├── skills/
│   ├── repo-review/
│   │   └── SKILL.md
│   ├── federal-platform-review/
│   │   ├── SKILL.md
│   │   ├── checklist.md
│   │   ├── examples.md
│   │   └── output-template.md
│   ├── gitops-maturity/
│   │   └── SKILL.md
│   ├── aws-platform-review/
│   │   ├── SKILL.md
│   │   ├── checklist.md
│   │   ├── examples.md
│   │   └── output-template.md
│   ├── azure-platform-review/
│   │   └── (same)
│   └── gcp-platform-review/
│       └── (same)
├── rules/
│   ├── evidence-before-claims.md
│   ├── no-push-without-verification.md
│   ├── docs-required-for-meaningful-change.md
│   ├── security-review-required-for-build-changes.md
│   └── tagging-required-for-cloud-resources.md
├── contexts/
│   ├── repo-review-context.md
│   └── solution-discovery-question-bank.md
├── docs/
│   ├── architecture.md
│   ├── usage.md
│   ├── federal-alignment.md
│   ├── quality-gate-workflow.md
│   └── solution-architect-discovery-framework.md
├── examples/
│   ├── sample-repo-review.md
│   └── sample-federal-report.md
└── schemas/
    ├── review-report.json
    ├── compliance-report.json
    └── quality-gate.schema.json
```

---

## 6. Placement by Type

| Type | Contents |
|------|----------|
| **Commands** | Entry points: repo-assess, solution-discovery, platform-design, federal-checklist, gitops-audit, quality-gate |
| **Skills** | Reusable patterns: repo-review, federal-platform-review, gitops-maturity, aws/azure/gcp-platform-review |
| **Rules** | Enforceable constraints: evidence, push verification, docs, security, tagging |
| **Instructions** | System guidance: core-engineering, platform-review-standards, governance-rules |
| **Docs** | User-facing: architecture, usage, federal-alignment, quality-gate, discovery-framework |
