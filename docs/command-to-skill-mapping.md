# Command-to-Skill Mapping

How commands invoke skills. Single source of truth for orchestration.

---

## Mapping Table

| Command | Agent | Primary Skills | Supporting Skills | Output Schema |
|---------|-------|----------------|-------------------|---------------|
| /repo-assess | repo-auditor | well-architected-review, supply-chain-sbom, container-security, observability-review | terraform-iac (if Terraform) | review-score.schema.json |
| /solution-discovery | solution-architect | solution-discovery | — | Markdown |
| /platform-design | solution-architect | aws-derived-principles | — | Architecture options |
| /federal-checklist | federal-security-reviewer | federal-platform-review, nist-compliance-evaluator, well-architected-review, supply-chain-sbom, container-security, dod-zero-trust | terraform-iac (if Terraform), aws-federal-grade-checklist (if AWS) | review-score + compliance-report |
| /gitops-audit | gitops-reviewer | gitops-capability-audit, well-architected-review, supply-chain-sbom, observability-review | terraform-iac (if Terraform) | review-score.schema.json |
| /quality-gate | repo-auditor | quality-gate-workflow | governance-plugin/rules-map | quality-gate.schema.json |
| /doc-sync | documentation-writer | well-architected-review (context) | documentation-rules | Drift report |
| /verify | repo-auditor | quality-gate-workflow | governance-plugin/rules-map | quality-gate.schema.json |
| /checkpoint | solution-architect | — | — | Checkpoint markdown |
| /orchestrate | solution-architect | — | — | Workflow plan |

---

## Skill Workflows

### /repo-assess

```
repo discovery → architecture inference → security review (supply-chain-sbom) → container security → Terraform IaC (if *.tf) → observability review → scoring engine → final report
```

**Skills:** well-architected-review, supply-chain-sbom, container-security, observability-review; terraform-iac (if Terraform)

### /federal-checklist

```
evidence extraction → control-family mapping → DoD ZT 7 pillars → supply chain → container security → readiness report
```

**Skills:** federal-platform-review, nist-compliance-evaluator, well-architected-review, supply-chain-sbom, container-security, dod-zero-trust; aws-federal-grade-checklist (AWS)

### /platform-design

```
discovery → constraints synthesis → reference architecture → decision log
```

**Skill:** aws-derived-principles (instructions)

### /gitops-audit

```
7 capability areas: CI/CD, GitOps (terraform-iac for Terraform), supply chain (supply-chain-sbom), promotion, observability (observability-review), identity, policy-as-code
```

**Skills:** gitops-capability-audit, well-architected-review, supply-chain-sbom, observability-review; terraform-iac (if Terraform)

### /terraform-iac (when Terraform present)

```
state backend → provider/module pinning → policy-as-code (tfsec/Checkov) → drift → secrets → EKS-specific → tagging
```

**Skills:** terraform-iac

### /solution-discovery

```
question bank → mandatory/situational/risk questions → assumptions, constraints, open questions
```

**Skills:** solution-discovery

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
