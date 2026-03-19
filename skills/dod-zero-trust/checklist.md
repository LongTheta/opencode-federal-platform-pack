# DoD Zero Trust 7-Pillar Checklist

Use when assessing DoD Zero Trust alignment. Assess all 7 pillars.

---

## Pillar 1: User

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 1.1 | Identity verification | IAM, IdP, SSO config |
| 1.2 | MFA | MFA enforcement in IdP or app |
| 1.3 | Least privilege | RBAC, scoped IAM policies |
| 1.4 | User posture | Conditional access (if in repo) |

---

## Pillar 2: Device

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 2.1 | Device posture | MDM, device attestation (if applicable) |
| 2.2 | Trusted devices | Device compliance checks |

---

## Pillar 3: Network and Environment

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 3.1 | Micro-segmentation | VPC, subnets, security groups |
| 3.2 | Deny by default | NetworkPolicy, NACLs |
| 3.3 | Network isolation | Private subnets, no 0.0.0.0/0 in prod |

---

## Pillar 4: Data

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 4.1 | Encryption at rest | KMS, encrypted storage |
| 4.2 | Encryption in transit | TLS, mTLS |
| 4.3 | Access controls | IAM, RBAC on data stores |
| 4.4 | Data classification | Tags, labels (if in repo) |

---

## Pillar 5: Application and Workload

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 5.1 | App-level auth | OAuth, OIDC, JWT |
| 5.2 | Workload identity | OIDC for pipelines; K8s service accounts |
| 5.3 | Container security | See container-security skill |

---

## Pillar 6: Visibility and Analytics

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 6.1 | Logging | Centralized logs; retention |
| 6.2 | Metrics | Prometheus, CloudWatch, etc. |
| 6.3 | Tracing | Distributed tracing |
| 6.4 | Alerting | Alerts on anomalies, failures |
| 6.5 | Dashboards | Observability dashboards |

---

## Pillar 7: Automation and Orchestration

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 7.1 | Pipeline automation | CI/CD; security gates |
| 7.2 | Policy-as-code | OPA, Checkov, Conftest |
| 7.3 | Runbooks | Documented procedures |
| 7.4 | IR automation | Automated response (if present) |
| 7.5 | CI/CD security gates | Scan, lint, test in pipeline |
