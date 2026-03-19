# Command Matrix — "I want to…" → Command

Quick reference for choosing the right command.

| I want to… | Command | Output |
|------------|---------|--------|
| Assess repo readiness for production | `/repo-assess` | review-score (categories, findings, letter grade) |
| Check FedRAMP/FISMA/NIST alignment | `/federal-checklist` | review-score + compliance-report |
| Audit GitOps, CI/CD, IaC maturity | `/gitops-audit` | review-score (7 capability areas) |
| Verify before push (secrets, docs, supply chain) | `/quality-gate` | pass / pass_with_warnings / fail |
| Discover requirements and constraints | `/solution-discovery` | Discovery summary |
| Design platform architecture | `/platform-design` | Architecture options with tradeoffs |
| Plan multi-step workflow | `/orchestrate` | Ordered plan with dependencies |
| Create implementation plan | `/plan` | Plan with risk assessment |
| Enforce TDD (80%+ coverage) | `/tdd` | Tests first, then code |
| Review code quality and security | `/code-review` | Review with findings |
| Run security review | `/security` | Security findings and remediation |
| Fix build/TypeScript errors | `/build-fix` | Minimal fixes |
| Generate E2E tests (Playwright) | `/e2e` | Test file + run |
| Remove dead code | `/refactor-clean` | Cleaned codebase |
| Update docs for recent changes | `/update-docs` | Updated documentation |
| Go-specific review / TDD / build | `/go-review`, `/go-test`, `/go-build` | Go-focused output |
| Quick verification | `/verify` | Quality-gate verdict |
| Session handoff | `/checkpoint` | Checkpoint markdown |

## Common Workflows

| Goal | Suggested sequence |
|------|--------------------|
| Pre-ATO readiness | `/repo-assess` → `/federal-checklist` → fix gaps → `/quality-gate` |
| New project setup | `/solution-discovery` → `/platform-design` → `/orchestrate` |
| Before merge | `/quality-gate` (or `/verify`) |
| Federal customer prep | `/orchestrate Prepare for federal deployment` → follow plan |
