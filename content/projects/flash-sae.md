## The Problem

Sparse Autoencoders (SAEs) are a key tool in **Mechanistic Interpretability** — the field of understanding what neural networks actually learn. But training SAEs on large language models is painfully slow because:

- Standard PyTorch operations **materialize dense activations** even when only a few latents are active
- The decoder step requires a full matrix multiply despite >99% sparsity
- Ghost gradient computation for dead latent recovery adds further overhead

## The Solution

**Flash-SAE** provides drop-in replacement Triton kernels that exploit the inherent sparsity:

```python
# Before: standard PyTorch SAE
from sae import SparseAutoencoder
model = SparseAutoencoder(d_model=4096, n_features=65536, k=64)

# After: just change the import
from flash_sae import SparseAutoencoder
model = SparseAutoencoder(d_model=4096, n_features=65536, k=64)
```

## Benchmarks

All benchmarks on RTX 4070, batch=1024, d_model=4096, n_features=65536, k=64, bfloat16:

| Operation | PyTorch | Flash-SAE | Speedup | Memory Saved |
|-----------|---------|-----------|---------|--------------|
| Encoder | 1.00x | 1.06x | **1.06x** | **20%** |
| Decoder | 1.00x | 13.60x | **13.6x** | **97%** |
| Full Forward | 1.00x | 1.78x | **1.78x** | **25%** |

The **13.6x decoder speedup** comes from never materializing the full dense activation matrix. Instead, the kernel directly gathers and scatters only the active latent columns.

## How It Works

### Sparse Encoder Kernel

The encoder performs top-k selection fused with the forward pass:

1. Compute `z = W_enc @ x + b_enc`
2. Select top-k activations in a single fused kernel
3. Return sparse indices and values without materializing the full hidden state

### Sparse Decoder Kernel

The decoder is where the biggest gains come from:

```
# PyTorch (dense): y = topk_values @ W_dec[topk_indices]  → materializes [batch, n_features]
# Flash-SAE (sparse): scatter-gather directly on active columns → O(batch × k × d_model)
```

Since k=64 and n_features=65536, this avoids materializing a matrix that is **1024x larger** than needed.

### Ghost Gradients

Dead latents (features that never activate) are a critical problem in SAE training. Flash-SAE implements **Ghost Gradients** — a technique that:

1. Detects latents with zero activation over a window
2. Injects small gradient signals to "revive" dead features
3. Runs entirely within the fused kernel with no additional memory cost

### FP8 Quantization

On Ada Lovelace+ GPUs (RTX 40xx, H100), Flash-SAE supports FP8 quantization for the encoder and decoder weights, providing further memory reduction with minimal accuracy loss.

## Project Structure

```
flash-sae/
├── flash_sae/
│   ├── sae.py                    # Main SAE module (drop-in replacement)
│   └── kernels/
│       ├── encoder.py            # Fused top-k encoder kernel
│       ├── decoder.py            # Sparse scatter-gather decoder
│       ├── topk.py               # Fused top-k selection
│       └── ghost_grads.py        # Dead latent recovery
├── examples/
│   └── train_gpt2_demo.py        # Full training example on GPT-2
├── benchmarks/
│   └── benchmark.py              # Reproducible benchmarking script
└── tests/
    └── test_sae.py               # 19 tests covering all operations
```

## References

- Anthropic, *Scaling Monosemanticity* (2024)
- Anthropic, *Towards Monosemanticity* (2023)
