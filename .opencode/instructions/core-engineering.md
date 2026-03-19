# Core Engineering Instructions

These instructions apply to all agents and commands. Enforce them; do not treat as advisory.

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

## Federal Reviews

- **REQUIRED:** When performing federal-aligned review, reference NIST 800-53 control families (AC, AU, IA, SC, SI, etc.) or assurance themes.
- **FORBIDDEN:** Claiming compliance or certification. Use: "gap," "partial," "recommend verification."
- **REQUIRED:** Every control mapping must cite evidence or state "Evidence not found."
