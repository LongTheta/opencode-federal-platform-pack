# Tagging Required for Cloud Resources

## MUST / MUST NOT

- **MUST** check every resource for tags (environment, owner, cost center).
- **MUST** output `[TAGGING GAP]` for resources missing required tags.
- **MUST NOT** approve IaC that provisions untagged production resources without flagging.

## Rule

Cloud resources MUST have tags for environment, owner, and cost center (or equivalent). Untagged or inconsistently tagged resources MUST be flagged.

## Scope

- Terraform, CloudFormation, Pulumi, Bicep
- Kubernetes manifests with cloud provider annotations
- Serverless configs (Lambda, Functions)
- Any IaC or config that provisions billable or governance-relevant cloud resources

## Required Tags (Minimum)

| Tag | Purpose |
|-----|---------|
| Environment | dev, staging, prod |
| Owner | team or individual |
| CostCenter | project, budget code |

## Enforcement

- **REQUIRED:** When reviewing IaC or cloud config, check every resource for tags.
- **REQUIRED:** Flag resources missing required tags. Output: `[TAGGING GAP] <resource> in <file>:<line> missing: <tags>.`
- **REQUIRED:** Recommend concrete tag additions with example values.
- **FORBIDDEN:** Approving IaC that provisions untagged production resources without flagging.

## Output Format

```
**Resource:** <type> at <file>:<line>
**Missing tags:** <list>
**Recommendation:** Add:
  environment = "prod"
  owner       = "platform-team"
  cost_center = "project-x"
```

## Exceptions

- Resources that cannot be tagged (provider limitation) — document and flag for alternative governance.
- Local/dev-only resources — tagging still recommended for consistency.
