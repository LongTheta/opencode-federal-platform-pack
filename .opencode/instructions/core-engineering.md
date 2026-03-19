# Core Engineering Instructions

These instructions apply to all agents and commands. **Enforce them; do not treat as advisory.**

**Well-Architected default:** If a system would fail a Well-Architected review (security, reliability, performance, cost, operations), it MUST be flagged. See `instructions/aws-derived-principles.md` for universal principles.

**Detailed standards:** See `repo-review-standards.md`, `architecture-review-standards.md`, `federal-review-standards.md`, `documentation-rules.md`, `cloud-governance-rules.md`, `gitops-governance-rules.md` for domain-specific rules.

## Evidence

- **REQUIRED:** Every recommendation, finding, or claim MUST cite observable evidence (file path, line range, config, or manifest).
- **REQUIRED:** If evidence is missing, output: `[EVIDENCE MISSING] <description>. Recommend: <verification step>.`
- **FORBIDDEN:** Generic advice ("you should consider X") without repo-specific evidence.
- **PREFERRED:** "Observed X in `path/to/file` lines N–M" over "typically X is done."

## Security and Supply Chain

- **REQUIRED:** When proposing or reviewing changes to CI/CD, containers, dependencies, or IaC:
  1. Check for plaintext secrets, `:latest` tags, unpinned dependencies.
  2. Recommend SBOM, provenance, or attestation where applicable.
  3. Do not approve push/merge readiness without supply-chain review for build/deploy changes.
- **FORBIDDEN:** Recommending disabled TLS, hardcoded secrets, or overly permissive IAM without flagging as High severity.

## Documentation

- **REQUIRED:** When proposing code, architecture, or deployment changes, include corresponding documentation updates (README, runbooks, architecture docs, inline comments).
- **REQUIRED:** Documentation must reflect current state, not aspirational state.
- **FORBIDDEN:** Recommending code changes without specifying which docs to update.

## Cloud Resources

- **REQUIRED:** When reviewing or proposing IaC or cloud config, check for tagging (environment, owner, cost center).
- **REQUIRED:** Flag untagged or inconsistently tagged resources.
- **PREFERRED:** Align with organizational governance (naming, approval workflows).

## Architecture

- **REQUIRED:** Before proposing architectural changes, search the codebase for existing patterns.
- **REQUIRED:** Align recommendations with current technology choices unless there is a documented reason to diverge.
- **FORBIDDEN:** Proposing architecture without referencing observed constraints.

## Well-Architected Alignment

- **REQUIRED:** All recommendations must align to: security, reliability, performance, cost awareness, operational excellence.
- **REQUIRED:** Require observability, auditability, scalability, failure handling, documentation for all systems.
- **REQUIRED:** Flag systems that lack: observability, access control model, deployment safety, documentation for major components, recovery strategy.

## Federal Reviews

- **REQUIRED:** When performing federal-aligned review, reference NIST 800-53 control families (AC, AU, IA, SC, SI, etc.) or assurance themes.
- **FORBIDDEN:** Claiming compliance or certification. Use: "gap," "partial," "recommend verification."
- **REQUIRED:** Every control mapping must cite evidence or state "Evidence not found."
