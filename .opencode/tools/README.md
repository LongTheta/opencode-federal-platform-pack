# Native Tool Designs

Specifications for OpenCode native tools. These are **contracts** for future implementation. Commands may invoke these tools when runtime code is available.

---

## Tool Catalog

| Tool | Purpose | Commands That Use It |
|------|---------|----------------------|
| `review-score` | Compute weighted category scores; produce final score and letter grade | /repo-assess, /gitops-audit, /federal-checklist, /verify |
| `quality-gate-check` | Run quality-gate checks; return verdict and findings | /quality-gate, /verify |
| `evidence-extractor` | Extract file paths, configs, manifests from repo for evidence | /repo-assess, /federal-checklist |
| `federal-control-mapper` | Map repo artifacts to NIST 800-53 control families | /federal-checklist |
| `target-architecture-synthesizer` | Synthesize reference architecture from constraints | /platform-design |

---

## Status

| Tool | Status |
|------|--------|
| review-score | Implemented (`scripts/review-score.js`) |
| quality-gate-check | Implemented (`scripts/quality-gate-check.js`) |
| evidence-extractor | Implemented (`scripts/evidence-extractor.js`) |
| federal-control-mapper | Implemented (`scripts/federal-control-mapper.js`) |
| target-architecture-synthesizer | Implemented (`scripts/target-architecture-synthesizer.js`) |

---

## Spec Format

Each tool spec includes:

- Purpose
- Inputs
- Outputs
- When commands should call it
- Failure cases
- Schema references
- Example usage
