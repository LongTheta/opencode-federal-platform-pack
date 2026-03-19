# Troubleshooting

Common issues and fixes for the OpenCode Federal Platform Pack.

---

## Schema validation fails

**Symptom:** `validate-schema` reports errors like `instancePath: /fedramp_baseline` or `enum mismatch`.

**Causes:**
- `fedramp_baseline` must be one of: `Low`, `Moderate`, `High`
- `control_mapping[].status` must be: `Met`, `Partial`, `Not Met`, `Not Applicable`
- `findings[].severity` must be: `Critical`, `High`, `Medium`, `Low`, `Informational`

**Fix:** Ensure all enum values match the schema exactly (case-sensitive). See `schemas/compliance-report.json` and `schemas/review-score.schema.json`.

---

## Evidence extractor returns empty artifacts

**Symptom:** `evidence-extractor` outputs `{"artifacts":[],"configs":[],...}` for a repo that has config files.

**Causes:**
- Running from the wrong directory (e.g. pack root instead of target repo)
- Target directory has no files matching the default patterns (package.json, Dockerfile, *.tf, *.yml, etc.)
- Paths are excluded (node_modules, .git, dist, etc.)

**Fix:**
```bash
cd /path/to/your-repo
node /path/to/opencode-federal-platform-pack/scripts/evidence-extractor.js .
```

---

## Federal control mapper: "File not found" or invalid JSON

**Symptom:** `federal-control-mapper` exits with "File not found" or JSON parse error.

**Causes:**
- Passing a non-existent file path
- Piping non-JSON output (e.g. from a failed command)

**Fix:**
```bash
# Correct pipeline
node scripts/evidence-extractor.js examples/fixture-repo | node scripts/federal-control-mapper.js -
```

---

## npm audit fails in CI

**Symptom:** `.gitlab-ci.yml` verify job fails with `npm audit --audit-level=high`.

**Causes:**
- High/critical vulnerabilities in dependencies

**Fix:**
- Run `npm audit` locally and apply fixes: `npm audit fix` or `npm audit fix --force` (use with caution)
- If a vulnerability has no fix yet, consider `npm audit --audit-level=critical` to only fail on critical

---

## ESLint errors after adding lint

**Symptom:** `npm run lint` reports errors in scripts or tests.

**Fix:**
- Run `npm run lint -- --fix` for auto-fixable issues
- Add `// eslint-disable-next-line rule-name` for intentional exceptions
- Update `.eslintrc.cjs` `ignorePatterns` if needed

---

## OpenCode /federal-checklist not found

**Symptom:** The `/federal-checklist` command does not appear in OpenCode.

**Causes:**
- Pack not installed or not in the correct location
- OpenCode version does not support the command

**Fix:**
- Ensure the pack is in the expected OpenCode packs directory
- Check `.opencode/commands/` for command definitions
- Run `npm run verify` to validate pack structure

---

## Node / npm not in PATH

**Symptom:** `npm test` or `node scripts/...` fails with "command not found".

**Fix:**
- Install Node.js 18+ (LTS recommended)
- On Windows, restart the terminal after installing Node
- Verify: `node -v` and `npm -v`
