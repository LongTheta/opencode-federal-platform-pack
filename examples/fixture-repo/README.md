# Fixture Repo

Minimal repo for demos: `/federal-checklist`, `/gitops-audit`, `evidence-extractor`, `federal-control-mapper`.

**Known gaps (for before/after demos):**
- Dockerfile uses `:latest` (quality-gate warning)
- No SBOM, no lock file
- No observability config
- Terraform is minimal (no provider)

Run from pack root:
```bash
node scripts/evidence-extractor.js examples/fixture-repo
node scripts/evidence-extractor.js examples/fixture-repo | node scripts/federal-control-mapper.js -
```
