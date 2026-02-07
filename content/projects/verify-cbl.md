## Overview

**Verify-CBL** is a neuro-symbolic formal verification engine designed to mathematically prove that modernized code behaves identically to legacy code.

Traditional testing can miss subtle numerical discrepancies — what we call **"penny drift"** — where rounding differences accumulate over thousands of transactions. Verify-CBL catches these by construction.

## The Problem

When organizations modernize legacy codebases (e.g., COBOL to Python), they need guarantees that the new code produces **exactly** the same outputs. Traditional approaches rely on:

- **Unit tests**: Only cover known scenarios
- **Integration tests**: Miss edge cases in numerical computation
- **Manual review**: Doesn't scale and is error-prone

Penny drift is particularly insidious: a rounding difference of $0.01 per transaction might seem harmless, but across millions of transactions it becomes a significant financial discrepancy that no test suite would catch.

## The Solution

Verify-CBL combines two powerful techniques:

### 1. Z3 SMT Solver
The engine translates both the legacy and modern code into **SMT (Satisfiability Modulo Theories)** formulas, then uses Microsoft's Z3 theorem prover to check if there exists *any* input where the outputs differ.

If Z3 finds no such input, the equivalence is **mathematically proven** — not just tested.

### 2. LLM-Powered Code Translation
For complex legacy constructs that are difficult to translate to SMT directly, an LLM performs the initial code translation, and the formal verifier validates the result. This hybrid approach combines:

- **LLM flexibility** for understanding diverse legacy codebases
- **Formal rigor** for mathematical guarantees

### 3. Monte Carlo Fallback
For cases where symbolic verification times out (e.g., deeply nested loops), the engine falls back to statistical verification using Monte Carlo sampling with configurable confidence levels.

## Results

| Metric | Value |
|--------|-------|
| Benchmark cases | 42 |
| Accuracy | **100%** |
| Verification approach | Hybrid Z3 + Monte Carlo |

All 42 benchmark cases were correctly verified, including several cases with known penny drift that traditional test suites had missed.

## Architecture

```
verify-cbl/
├── translator/     # LLM-powered legacy → modern code translation
├── smt/            # Code → Z3 formula translation
├── verifier/       # Equivalence checking engine
├── montecarlo/     # Statistical fallback verification
└── benchmarks/     # 42 verification benchmark cases
```
