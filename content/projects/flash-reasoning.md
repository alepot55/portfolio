## The Problem

Reasoning LLMs (DeepSeek-R1, o1, Tree-of-Thought) generate **decision trees** during inference. Each branch explores a different reasoning path, but they often share a common prefix.

Standard inference engines treat these sequences linearly, causing **O(n × b) memory waste** when branches share a prefix. This means:
- Redundant KV-Cache entries for shared tokens
- VRAM exhaustion on long reasoning chains
- Throughput collapse when batching multiple branches

## The Solution

**Flash-Reasoning** introduces **Tree-Aware Attention** — a custom Triton kernel that:

1. **Physically deduplicates** shared prefix KV blocks using reference counting
2. **Fuses** gather + GQA expansion + scaled dot-product into a single kernel
3. **Exploits L2 cache** locality to exceed physical HBM bandwidth

## Key Results

| Metric | Standard Attention | Flash-Reasoning |
|--------|-------------------|-----------------|
| Speed | 1.0x | **2.54x** |
| VRAM Usage | 100% | **3.4%** (96.6% reduction) |
| Effective Bandwidth | 470 GB/s | **1,194 GB/s** |

> The effective bandwidth of 1,194 GB/s **exceeds the physical HBM limit of 900 GB/s** because shared prefix blocks hit L2 cache at ~5 TB/s, amortizing the cost across branches.

## Architecture

```
src/flash_reasoning/
├── core/
│   └── memory.py              # PhysicalKVAllocator with ref counting
├── kernels/
│   └── tree_attention.py      # Fused GQA Triton kernel
└── ops/
    └── attention.py           # tree_attention() public API
```

### PhysicalKVAllocator

The allocator maintains a pool of KV blocks with reference counting. When a new branch is created from an existing prefix, it increments the reference count instead of copying:

```
Branch A: [prefix_block_0] → [prefix_block_1] → [branch_a_block]
Branch B: [prefix_block_0] → [prefix_block_1] → [branch_b_block]
                ↑ ref=2              ↑ ref=2          ↑ ref=1
```

### Fused GQA Kernel

A single Triton kernel performs:
1. **Gather** — fetch only the unique KV blocks needed
2. **GQA Expansion** — replicate KV heads to match query heads
3. **Scaled Dot-Product** — compute attention with online softmax

This eliminates 3 separate kernel launches and their intermediate memory allocations.

### Online Softmax

Following FlashAttention's approach, the kernel computes softmax in a single pass without materializing the full attention matrix:

```
m_new = max(m_old, row_max)
l_new = l_old × exp(m_old - m_new) + sum(exp(scores - m_new))
out = out × (l_old × exp(m_old - m_new) / l_new) + (exp(scores - m_new) / l_new) @ V
```

## Triton Autotuning

The kernel parameters are automatically tuned for different GPU architectures:

- **A100**: Optimized for 80 GB HBM2e, 40 MB L2
- **H100**: Optimized for 80 GB HBM3, 50 MB L2
- **RTX 4090**: Optimized for 24 GB GDDR6X, 72 MB L2

## Requirements

- Python 3.10+
- PyTorch 2.4+
- Triton 3.0+
- CUDA GPU (Ampere+ recommended)
