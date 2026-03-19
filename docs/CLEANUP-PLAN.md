# Repository Cleanup Plan

**Mission alignment:** OpenCode-first AI engineering pack for (1) repository review + platform/architecture/DevSecOps recommendations, (2) solution architect + product manager discovery.

**Refinement goals:** Remove generic/bloated; depth over breadth; structured outputs; opinionated skills; internal OS feel; align to real workflows; reduce duplication.

---

## 1. What to Keep

| Artifact | Reason |
|----------|--------|
| **Commands:** repo-assess, solution-discovery, platform-design, federal-checklist, gitops-audit, quality-gate | Core workflow: review + discovery + design + federal + GitOps + gate |
| **Agents:** solution-architect, product-manager-discovery, repo-auditor, federal-security-reviewer, gitops-reviewer, cloud-platform-reviewer | Each maps to a real need |
| **Skills:** well-architected-review, federal-platform-review, gitops-capability-audit, nist-compliance-evaluator, aws-federal-grade-checklist, aws/azure/gcp-platform-review | Depth; opinionated; practical |
| **Rules:** all 5 | Enforceable; no duplication |
| **Instructions:** aws-derived-principles, core-engineering, repo-review-standards, architecture-review-standards, federal-review-standards, documentation-rules, cloud-governance-rules, gitops-governance-rules | Domain-specific; no merge |
| **Contexts:** repo-review-context, solution-discovery-question-bank | Used by commands |
| **Docs:** architecture, usage, federal-alignment, quality-gate-workflow, solution-architect-discovery-framework | Essential |
| **Schemas:** review-report, compliance-report, quality-gate, well-architected-score | Structured output |
| **Examples:** sample-repo-review, sample-federal-report | Reference outputs |
| **Plugins:** governance-hooks.md, pre-merge-quality.js, supply-chain-guard.js | Pre-push workflow |

---

## 2. What to Merge

| Source | Target | Action |
|--------|--------|--------|
| gitops-maturity | gitops-capability-audit | gitops-audit command uses gitops-capability-audit; delete gitops-maturity |
| repo-review-context | well-architected-review | repo-review-context checklist absorbed by well-architected-review; keep context as thin pointer |
| opencode-config-explained | usage.md | Merge key config explanation into usage; delete standalone |

---

## 3. What to Delete

| Artifact | Reason |
|----------|--------|
| doc-sync command | Doc drift is part of repo-assess and quality-gate; standalone redundant |
| skill-create command | Meta; not core mission |
| documentation-writer agent | Not in opencode.json; review agents produce structured output |
| repo-review skill | Redundant with well-architected-review |
| gitops-maturity skill | Replaced by gitops-capability-audit (deeper) |
| dod-zero-trust-architect skill | Niche; breadth over depth |
| security-evaluator skill | Generic; well-architected-review covers security |
| platform-review-standards instruction | Superseded by repo-review-standards, architecture-review-standards, federal-review-standards |
| governance-rules instruction | Superseded by documentation-rules, cloud-governance-rules, gitops-governance-rules |
| opencode-config-explained doc | Merged into usage |
| sample-well-architected-review example | Redundant with sample-repo-review |
| agents/ (root) | Duplicate of .opencode/prompts/agents; OpenCode-first |
| commands/ (root) | Duplicate of .opencode/commands; OpenCode-first |

---

## 4. What to Rename

| Current | New | Reason |
|---------|-----|--------|
| (none) | — | Names are clear |

---

## 5. Final Repo Tree

```
opencode-federal-platform-pack/
├── .gitignore
├── README.md
├── AGENTS.md
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
│   │   ├── aws-derived-principles.md
│   │   ├── core-engineering.md
│   │   ├── repo-review-standards.md
│   │   ├── architecture-review-standards.md
│   │   ├── federal-review-standards.md
│   │   ├── documentation-rules.md
│   │   ├── cloud-governance-rules.md
│   │   └── gitops-governance-rules.md
│   ├── prompts/agents/
│   │   ├── solution-architect.md
│   │   ├── product-manager-discovery.md
│   │   ├── repo-auditor.md
│   │   ├── federal-security-reviewer.md
│   │   ├── gitops-reviewer.md
│   │   └── cloud-platform-reviewer.md
│   └── plugins/
│       ├── governance-hooks.md
│       ├── pre-merge-quality.js
│       └── supply-chain-guard.js
├── skills/
│   ├── well-architected-review/
│   │   ├── SKILL.md
│   │   └── checklist.yaml
│   ├── federal-platform-review/
│   │   ├── SKILL.md
│   │   ├── checklist.md
│   │   ├── examples.md
│   │   └── output-template.md
│   ├── gitops-capability-audit/
│   │   ├── SKILL.md
│   │   ├── capability-model.md
│   │   ├── checklist.md
│   │   ├── examples.md
│   │   └── output-template.md
│   ├── nist-compliance-evaluator/
│   │   └── (existing files)
│   ├── aws-federal-grade-checklist/
│   │   └── (existing files)
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
│   ├── solution-architect-discovery-framework.md
│   └── CLEANUP-PLAN.md
├── examples/
│   ├── sample-repo-review.md
│   └── sample-federal-report.md
├── schemas/
│   ├── review-report.json
│   ├── compliance-report.json
│   ├── quality-gate.schema.json
│   └── well-architected-score.json
├── .cursor/
│   └── rules/
│       └── federal-platform-pack.mdc
├── hooks/
│   └── hooks.json
└── mcp-configs/
    └── mcp-servers.json
```

---

## 6. Placement by Type

| Type | Contents |
|------|----------|
| **Commands** | repo-assess, solution-discovery, platform-design, federal-checklist, gitops-audit, quality-gate |
| **Skills** | well-architected-review, federal-platform-review, gitops-capability-audit, nist-compliance-evaluator, aws-federal-grade-checklist, aws/azure/gcp-platform-review |
| **Rules** | evidence, push verification, docs, security, tagging |
| **Instructions** | aws-derived-principles, core-engineering, repo/arch/federal standards, documentation-rules, cloud-governance-rules, gitops-governance-rules |
| **Docs** | architecture, usage, federal-alignment, quality-gate, discovery-framework |
