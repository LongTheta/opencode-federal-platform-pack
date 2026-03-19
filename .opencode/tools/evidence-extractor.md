# evidence-extractor Tool

## Purpose

Extract file paths, configs, manifests, and structural artifacts from repo for evidence-based review.

---

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `directory` | string | No | Repo root; default current |
| `patterns` | array | No | Glob patterns to include; default: common config, IaC, CI, docs |
| `exclude` | array | No | Paths to exclude (e.g., node_modules, .git) |

---

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `artifacts` | array | { path, type, size, excerpt } |
| `structure` | object | Directory tree; entry points; tech stack hints |
| `configs` | array | Config files (package.json, Dockerfile, *.tf, etc.) |
| `manifests` | array | K8s, Helm, Kustomize, ArgoCD, Flux manifests |
| `ci_cd` | array | CI/CD config (GitHub Actions, GitLab CI, etc.) |

---

## When Commands Call It

- `/repo-assess` — First step; gather artifacts for evidence
- `/federal-checklist` — Extract artifacts for control mapping
- `/evidence-extractor` — Standalone if exposed as command

---

## Failure Cases

| Case | Behavior |
|------|----------|
| Directory not found | Return empty; error |
| Permission denied | Return partial; log error |
| No matching artifacts | Return empty arrays; not failure |

---

## Schema Reference

No dedicated schema. Output feeds into `review-score.schema.json` and `compliance-report.json` as evidence_found / missing_evidence.

---

## Example Usage

```json
{
  "directory": ".",
  "patterns": ["*.tf", "Dockerfile", "package.json", ".github/**"]
}
```

```json
{
  "artifacts": [
    { "path": "Dockerfile", "type": "container", "excerpt": "FROM python:3.12" },
    { "path": "terraform/main.tf", "type": "iac", "excerpt": "resource \"aws_\"..." }
  ],
  "configs": ["package.json", "Dockerfile", "terraform/main.tf"],
  "manifests": [],
  "ci_cd": [".github/workflows/deploy.yml"]
}
```
