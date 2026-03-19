# Repository Review Context

Use this context when performing a full repository review.

## Checklist

- [ ] Identify tech stack (language, framework, runtime)
- [ ] Map directory structure and entry points
- [ ] Locate build and deploy configs
- [ ] Check for README, CONTRIBUTING, architecture docs
- [ ] Identify dependency management (lock files, versions)
- [ ] Locate CI/CD configs (.github, .gitlab, Jenkinsfile)
- [ ] Check for secrets, .env, or credential handling
- [ ] Identify observability (metrics, logs, tracing)
- [ ] Check IaC (Terraform, CloudFormation, Pulumi)
- [ ] Identify cloud provider(s) and key services

## Key Paths to Inspect

- `README.md`, `CONTRIBUTING.md`, `docs/`
- `package.json`, `go.mod`, `requirements.txt`, `Cargo.toml`
- `Dockerfile`, `docker-compose*.yml`
- `.github/workflows/`, `.gitlab-ci.yml`
- `terraform/`, `infra/`, `deploy/`
- `*.yaml`, `*.yml` (Kubernetes, Helm, Kustomize)
