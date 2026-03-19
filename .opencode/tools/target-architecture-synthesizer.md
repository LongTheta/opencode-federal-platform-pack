# target-architecture-synthesizer Tool

## Purpose

Synthesize reference architecture options from discovery constraints, scale, compliance, and cost.

---

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `constraints` | object | Yes | Scale, compliance, budget, timeline |
| `discovery_summary` | string | No | From solution-discovery |
| `options_count` | number | No | 1–3; default 2 |
| `cloud_provider` | string | No | aws | azure | gcp | multi; default infer from context |

---

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `options` | array | { name, description, pros, cons, score, risks } |
| `decision_log` | array | Key decisions and tradeoffs |
| `architecture_score` | object | Per-pillar 0–10 |
| `key_risks` | array | Risks per option |
| `evidence_missing` | array | What could not be verified |

---

## When Commands Call It

- `/platform-design` — After discovery; primary use

---

## Failure Cases

| Case | Behavior |
|------|----------|
| No constraints | Return generic options; flag missing context |
| Conflicting constraints | Return options with tradeoffs; note conflict |
| Unsupported cloud | Return cloud-agnostic; recommend provider-specific review |

---

## Schema Reference

No dedicated schema. Output aligns with platform-design expected format: Executive Summary, Architecture Score, Key Risks, Evidence/Missing Evidence.

---

## Example Usage

```json
{
  "constraints": {
    "scale": "10k req/sec",
    "compliance": "FedRAMP",
    "budget": "moderate"
  },
  "options_count": 2
}
```

```json
{
  "options": [
    { "name": "Event-driven API", "pros": ["Scalable", "Decoupled"], "cons": ["Complexity"], "score": 8 },
    { "name": "Monolith with queue", "pros": ["Simpler"], "cons": ["Scaling limits"], "score": 6 }
  ],
  "architecture_score": { "security": 8, "reliability": 7, "performance": 8, "cost": 7, "operations": 7 },
  "key_risks": ["Eventual consistency", "Single-region"]
}
```
