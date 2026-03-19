---
description: Pre-merge quality gate — evidence, security, docs, supply chain, Well-Architected
agent: repo-auditor
---

# Quality Gate

**Purpose:** Run pre-merge quality gate. Check: evidence-based recommendations, no security shortcuts, docs updated with code changes, supply-chain controls for build/deploy, Well-Architected requirements. Report pass/fail with blocking findings. Think like a senior engineer enforcing merge readiness.

**When to use:** Before push or merge; as a gate in PR review; before release.

**Required inputs:** Repository context (current workspace); recent or staged changes if available.

**Optional inputs:** Stricter mode (fail on Medium findings); federal context (add compliance checks).

**Workflow:**
1. Review recent or staged changes (build, deploy, config, dependencies).
2. Check evidence: recommendations cite specific files/configs.
3. Check security: no plaintext secrets, no disabled TLS, no overly permissive IAM, no `:latest` in production.
4. Check docs: README, runbooks, architecture docs updated with code changes.
5. Check supply chain: pinned deps, SBOM/provenance where applicable, no floating tags.
6. Check Well-Architected: observability, access control, deployment safety, documentation, recovery strategy.
7. Produce pass/fail verdict with blocking findings.

**Expected output format:** Use schemas/quality-gate.schema.json. Verdict: pass | pass_with_warnings | fail. See docs/quality-gate-workflow.md for check categories.

**Guardrails:**
- FAIL if: no observability, no access control model, no deployment safety, no documentation for major components, no recovery strategy.
- WARN if: cost visibility missing, scaling unclear, tagging missing.
- Fail on any High-severity finding that affects merge readiness.
- Security before convenience; no shortcuts.
- Supply-chain review required for build/deploy changes.

**Definition of done:** Clear pass/fail verdict; all blocking findings listed with required actions; checklist completed.
