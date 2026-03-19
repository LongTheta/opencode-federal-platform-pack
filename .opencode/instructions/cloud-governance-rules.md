# Cloud Governance Rules

Enforce when reviewing or proposing IaC, cloud config, or cloud resources. Treat as mandatory.

---

## Tagging (REQUIRED)

- **REQUIRED:** When reviewing IaC or cloud config, check every billable resource for tags.
- **REQUIRED:** Minimum tags: environment, owner, cost center (or equivalent).
- **REQUIRED:** Flag untagged or inconsistently tagged resources.
- **REQUIRED:** Output format: `[TAGGING GAP] <resource> in <file>:<line> missing: <tags>.`
- **FORBIDDEN:** Approving IaC that provisions untagged production resources without flagging.

---

## Ownership and Cost Governance (REQUIRED)

- **REQUIRED:** Verify cost attribution is possible (tags, labels, or equivalent).
- **REQUIRED:** Flag right-sizing issues, unconstrained scaling, and cost drivers.
- **REQUIRED:** Recommend budget alerts where applicable.
- **PREFERRED:** Align with organizational governance (naming, approval workflows).

---

## Scope (REQUIRED)

Apply to:

- Terraform, CloudFormation, Pulumi, Bicep
- Kubernetes manifests with cloud provider annotations
- Serverless configs (Lambda, Functions)
- Any IaC or config that provisions billable or governance-relevant cloud resources

---

## Output Format (REQUIRED)

```
**Resource:** <type> at <file>:<line>
**Missing tags:** <list>
**Recommendation:** Add:
  environment = "prod"
  owner       = "platform-team"
  cost_center = "project-x"
```

---

## Exceptions

- Resources that cannot be tagged (provider limitation) — document and flag for alternative governance.
- Local/dev-only resources — tagging still recommended for consistency.
