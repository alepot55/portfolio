## The Problem

Your agent passes Monday, fails Wednesday. Same prompt, same model. LLMs show up to **72% variance** across runs even at `temperature=0`.

**agentrial** runs your agent N times and gives you **statistics, not luck**.

## Quick Start

```bash
pip install agentrial
agentrial init
agentrial run
```

## How It Works

Define your tests in YAML or Python, and agentrial handles the rest:

```yaml
# agentrial.yaml
suite: booking-agent
trials: 50
model: gpt-4o

tests:
  - name: simple_booking
    input: "Book a table for 2 at 7pm"
    assert:
      - type: contains
        value: "confirmed"
```

Or use the fluent Python API:

```python
from agentrial import Suite

suite = Suite("booking-agent", trials=50)
suite.add_test(
    name="simple_booking",
    input="Book a table for 2 at 7pm",
    assertions=[{"type": "contains", "value": "confirmed"}]
)
results = suite.run()
```

## Core Capabilities

### Statistical Evaluation
- **Wilson Confidence Intervals** for pass rates — not just "it worked 8/10 times"
- **Fisher Exact Test** for step-level failure attribution — pinpoints *where* your agent breaks
- **Agent Reliability Score (ARS)** — composite 0-100 metric combining success rate, latency, cost, and consistency

### Production Monitoring
- **CUSUM Detector** — catches gradual drift in agent performance
- **Page-Hinkley Test** — detects sudden mean shifts
- **KS Detector** — identifies distribution changes in response patterns
- **Real-time dashboard** for monitoring agent health

### Cost Intelligence
- Real cost tracking across **45+ models** (GPT-4o, Claude, Gemini, Llama, Mistral, etc.)
- Per-test and per-suite cost breakdowns
- Pareto frontier analysis: find the best cost-quality tradeoff

### Framework Adapters
Works with your existing stack:

| Framework | Status |
|-----------|--------|
| LangGraph | Supported |
| CrewAI | Supported |
| AutoGen | Supported |
| Pydantic AI | Supported |
| OpenAI Agents SDK | Supported |
| smolagents | Supported |
| OTel | Supported |
| Custom | Supported |

## CLI Reference

```bash
agentrial run              # Run test suite
agentrial compare          # Compare two runs
agentrial baseline         # Set performance baseline
agentrial snapshot         # Save current state
agentrial security         # MCP security scan
agentrial pareto           # Cost-quality frontier
agentrial prompt           # Prompt version control
agentrial monitor          # Production monitoring
agentrial ars              # Agent Reliability Score
agentrial publish          # Publish results
agentrial verify           # Verify reproducibility
agentrial dashboard        # Launch dashboard
```

## Architecture

The framework is designed to be **local-first** with no SaaS dependency or telemetry:

- YAML-based test definitions with fluent Python API
- Pluggable framework adapters for any agent framework
- CI/CD integration with GitHub Actions
- VS Code extension for inline results

## Testing

The project has a comprehensive test suite with **450 tests** covering all features.
