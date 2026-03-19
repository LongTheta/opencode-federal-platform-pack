# Observability Review Checklist

Use when assessing observability. Align to DoD Play 9, NIST AU.

---

## 1. Logging

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 1.1 | Centralized logging | Log aggregation (CloudWatch, Loki, ELK) |
| 1.2 | Structured format | JSON logs; consistent fields |
| 1.3 | Retention policy | Retention config; compliance alignment |
| 1.4 | Audit trail | Audit logs for sensitive operations |

---

## 2. Metrics

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 2.1 | Application metrics | Latency, errors, throughput |
| 2.2 | Infrastructure metrics | CPU, memory, disk, network |
| 2.3 | Retention | Metric retention config |
| 2.4 | SLO/SLI visibility | Dashboards for SLOs |

---

## 3. Tracing

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 3.1 | Distributed tracing | OpenTelemetry, X-Ray, Jaeger |
| 3.2 | Correlation IDs | Trace IDs across services |
| 3.3 | Sampling (if high volume) | Sampling config |

---

## 4. Alerting

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 4.1 | Alerts on errors | Error rate, 5xx alerts |
| 4.2 | Alerts on latency | p95, p99 latency |
| 4.3 | Alerts on availability | Uptime, health checks |
| 4.4 | On-call / escalation | PagerDuty, Opsgenie, runbooks |

---

## 5. Dashboards

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 5.1 | Operational dashboards | Grafana, CloudWatch |
| 5.2 | Key metrics visible | Latency, errors, throughput |
| 5.3 | Dashboard as code | Dashboards in repo (if GitOps) |

---

## 6. Runbooks

| # | Criterion | Evidence to Look For |
|---|-----------|----------------------|
| 6.1 | Documented procedures | docs/runbooks/, README |
| 6.2 | Incident response | IR playbooks |
| 6.3 | Common operations | Deploy, rollback, scale |
