## Abstract

This project provides a comprehensive comparative evaluation of Triton and CUDA for GPU acceleration of Finite State Automata (FSA) and related computational workloads. The research explores whether Triton, OpenAI's high-level GPU programming language, can simplify development while maintaining competitive performance compared to CUDA for non-conventional GPU workloads beyond deep learning.

The project features containerized implementations of FSA execution engines, matrix operations, and multi-layer perceptron (MLP) networks in both CUDA C++ and Triton Python. Through systematic benchmarking and performance analysis, we evaluate trade-offs between development complexity and computational efficiency, providing insights for GPU programming language selection in specialized computational domains.

**Environment:** CUDA 12.6.2 | PyTorch 2.5.1+cu124 | Triton 2.3.1 | Python 3.10 | Docker-based development

## Research Question

**Primary Research Question:** To what extent can Triton simplify GPU kernel development while maintaining competitive performance compared to CUDA for structured and irregular computational workloads, specifically in the context of finite state automata execution?

**Secondary Research Questions:**
- How do development complexity and code maintainability compare between Triton and CUDA implementations?
- What are the performance trade-offs for different types of GPU workloads (structured vs. irregular)?
- How does memory management and optimization differ between the two approaches?

## Key Findings

Our comprehensive evaluation across multiple computational domains revealed important insights:

### Performance Characteristics
- **Structured Workloads:** CUDA demonstrates significant performance advantages (>200x speedup) for highly optimized implementations like ngAP (next-generation Aho-Corasick pattern matching)
- **Standard Operations:** Triton achieves competitive performance for matrix operations and vector addition, often within 10-20% of CUDA performance
- **Irregular Workloads:** CUDA maintains superiority for complex FSA patterns with irregular memory access patterns
- **Memory Efficiency:** CUDA implementations generally use 20-30% less GPU memory than equivalent Triton implementations

### Development Complexity
- **Code Volume:** Triton implementations require ~40-60% fewer lines of code compared to CUDA
- **Learning Curve:** Significantly reduced barrier to entry for Python developers (estimated 70% reduction in onboarding time)
- **Debugging:** Triton provides better error messages and integration with Python debugging tools
- **Optimization:** CUDA requires extensive manual optimization while Triton provides automatic kernel tuning

### Practical Implications
- **Triton Strengths:** Ideal for rapid prototyping, research environments, and standard operations
- **CUDA Strengths:** Essential for production systems requiring maximum performance and fine-grained control
- **Hybrid Approach:** Optimal strategy combines both technologies based on specific workload characteristics

## Quick Start (Docker Recommended)

The fastest way to get started is using our automated Docker setup:

```bash
# Clone the repository
git clone https://github.com/alepot55/triton_vs_cuda_fsm.git
cd triton_vs_cuda_fsm

# Complete automated setup (builds Docker image, compiles bindings, runs tests)
./scripts/docker.sh setup

# Verify everything is working
./scripts/docker.sh test-gpu

# Run quick tests to see implementations in action  
./scripts/docker.sh test all true

# Start interactive development environment
./scripts/docker.sh shell
```

**Expected Output:** 70/70 tests passing across FSA (30), Matrix (28), and MLP (12) operations, with both CUDA and Triton implementations fully functional.

## Repository Structure

The project is organized for containerized development with Docker as the primary deployment method:

```text
triton_vs_cuda_fsm/
├── scripts/
│   ├── docker.sh                 # Primary interface - automated setup and management
│   ├── setup_env.sh              # Environment configuration
│   └── build.sh                  # Build automation
├── src/
│   ├── bindings/                 # C++/CUDA bindings for Python integration
│   │   ├── CMakeLists.txt        # Build configuration
│   │   └── src/                  # pybind11 binding implementations
│   ├── cuda/                     # CUDA C++ implementations
│   │   ├── include/              # CUDA header files
│   │   └── src/                  # CUDA source code (FSA engines, matrix ops, kernels)
│   └── python/
│       └── triton_kernels/       # Triton Python implementations
│           ├── fsa/              # FSA execution engines
│           ├── matrix/           # Matrix operation kernels
│           └── mlp/              # Multi-layer perceptron implementations
├── tests/
│   ├── run_tests.py              # Unified test framework CLI
│   ├── core/                     # Test framework infrastructure
│   ├── fixtures/                 # Test data and configurations
│   ├── runners/                  # Implementation-specific test runners
│   └── unit/                     # Unit test suites
├── results/                      # Benchmark results and analysis data
│   ├── fsa/                      # FSA benchmark results (CSV)
│   ├── matrix/                   # Matrix operation results
│   └── mlp/                      # MLP benchmark data
├── libs/
│   └── anml/                     # Automata Markup Language library
├── notebook/                     # Jupyter analysis notebooks
├── environment.yml               # Conda environment specification
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml            # Docker Compose services
└── README.md                     # This documentation
```

**Key Components:**
- **`scripts/docker.sh`** - Main interface providing setup, testing, and development commands
- **Unified Test Framework** - Single entry point for testing all implementations
- **Multi-stage Docker Build** - Optimized containerization with CUDA 12.6.2 support
- **Benchmark Infrastructure** - Automated performance measurement and analysis
- **Cross-implementation Testing** - Validates correctness across CUDA and Triton versions

## Prerequisites

### Hardware Requirements
- **GPU:** NVIDIA GPU with CUDA Compute Capability 7.0+ (tested on RTX 4070)
- **GPU Memory:** Minimum 8GB VRAM (12GB recommended for full benchmark suite)
- **CPU:** Multi-core processor (4+ cores recommended)
- **System Memory:** 8GB RAM minimum (16GB recommended)

### Software Requirements
- **Docker:** Version 20.10+ with NVIDIA Container Toolkit
- **NVIDIA Driver:** Version 535.54.03+ (compatible with CUDA 12.6.2)
- **Git:** For repository cloning and version control
- **Optional:** NVIDIA Container Toolkit for GPU support verification

**Supported Platforms:**
- Ubuntu 20.04 LTS+ (primary testing environment)
- Ubuntu 22.04 LTS (recommended)
- Other Linux distributions (may require adjustments)

## Installation Methods

### Method 1: Docker (Recommended)

The Docker approach provides a fully automated, reproducible environment with all dependencies pre-configured.

#### Step 1: Install Prerequisites
```bash
# Install Docker (if not already installed)
curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh

# Install NVIDIA Container Toolkit
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker

# Verify GPU access
docker run --gpus all --rm nvidia/cuda:12.6.2-base-ubuntu22.04 nvidia-smi
```

#### Step 2: Clone and Setup
```bash
# Clone repository
git clone https://github.com/alepot55/triton_vs_cuda_fsm.git
cd triton_vs_cuda_fsm

# Complete automated setup (builds Docker image, compiles bindings, runs tests)
./scripts/docker.sh setup

# Verify installation
./scripts/docker.sh test-gpu
```

**Setup Process:** The automated setup will:
1. Build Docker image with CUDA 12.6.2 and PyTorch 2.5.1+cu124
2. Compile CUDA bindings for Python 3.10 compatibility
3. Verify GPU functionality and implementation detection
4. Run validation tests to ensure all 70 tests pass

### Method 2: Manual Installation

For users preferring direct system installation without Docker:

```bash
# Install CUDA Toolkit 12.6.2
wget https://developer.download.nvidia.com/compute/cuda/12.6.2/local_installers/cuda_12.6.2_560.35.03_linux.run
sudo sh cuda_12.6.2_560.35.03_linux.run

# Create and activate Conda environment
conda env create -f environment.yml
conda activate triton_vs_cuda_fsa

# Install additional dependencies
pip install torch==2.5.1+cu124 torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
pip install triton==2.3.1

# Build CUDA bindings
cd src/bindings
mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release -DENABLE_CUDA=ON -DBUILD_PYTHON_BINDINGS=ON ..
make -j$(nproc)

# Verify installation
python tests/run_tests.py --all --quick
```

## Usage

### Basic Commands

The `docker.sh` script provides a unified interface for all project operations:

```bash
# Setup and verification
./scripts/docker.sh setup          # Complete automated setup
./scripts/docker.sh test-gpu       # Verify GPU functionality  
./scripts/docker.sh build          # Build Docker image only

# Testing and benchmarking
./scripts/docker.sh test all       # Run all tests (FSA + Matrix + MLP)
./scripts/docker.sh test fsa true  # Run FSA tests with quick mode
./scripts/docker.sh test matrix    # Run matrix operation tests only
./scripts/docker.sh test mlp       # Run MLP tests only

# Development environment
./scripts/docker.sh shell          # Interactive shell with GPU access
./scripts/docker.sh dev            # Development environment  

# Utility commands
./scripts/docker.sh status         # Show system and GPU status
./scripts/docker.sh cleanup        # Clean up Docker resources
./scripts/docker.sh help           # Show all available commands
```

### Advanced Usage

#### Running Specific Test Suites
```bash
# FSA tests with different implementations
python tests/run_tests.py --fsa --implementation cuda
python tests/run_tests.py --fsa --implementation triton
python tests/run_tests.py --fsa --implementation both

# Performance benchmarking
python tests/run_tests.py --all --performance --verbose

# Quick validation tests
python tests/run_tests.py --all --quick
```

#### Accessing Results
```bash
# View benchmark results
ls results/fsa/         # FSA benchmark CSVs
ls results/matrix/      # Matrix operation results  
ls results/mlp/         # MLP benchmark data

# Start Jupyter for analysis
./scripts/docker.sh jupyter
# Then navigate to http://localhost:8888
```

#### Development Workflow
```bash
# Start development shell
./scripts/docker.sh shell

# Inside container:
cd /workspace
python tests/run_tests.py --fsa --quick     # Test changes
python -c "import triton_cuda_fsm_bindings; print('CUDA bindings OK')"
python -c "from triton_kernels.fsa import triton_fsa_engine; print('Triton kernels OK')"
```

## Methodology

### Implementation Strategy
Our comparative evaluation follows a systematic approach:

**1. Multi-Domain Implementation**
- **FSA Engines:** Complex state machine processing with irregular memory patterns
- **Matrix Operations:** Standard GPU workloads (MatMul, VecAdd) for baseline comparison  
- **MLP Networks:** Neural network computations representing structured workloads

**2. Performance Measurement Framework**
- **Execution Time:** Kernel execution and total processing time
- **Memory Usage:** GPU memory consumption and transfer overhead
- **Throughput:** Operations per second for comparative analysis
- **Scalability:** Performance across different input sizes

**3. Development Complexity Analysis**
- **Lines of Code:** Quantitative comparison of implementation size
- **Development Time:** Measured from specification to working implementation
- **Debugging Complexity:** Error handling and troubleshooting effort
- **Optimization Requirements:** Manual vs. automatic performance tuning

**4. Reproducibility and Validation**
- **Containerized Environment:** Docker ensures consistent execution environment
- **Automated Testing:** 70 test cases validate correctness across implementations
- **Cross-Implementation Verification:** Results validated between CUDA and Triton
- **Statistical Analysis:** Multiple runs with confidence intervals

### Benchmarking Protocol
```bash
# Standard benchmark execution
./scripts/docker.sh test all --performance

# Extended benchmarking with multiple runs
for i in {1..10}; do
    python tests/run_tests.py --all --performance --output results/run_$i.csv
done
```

## Performance Analysis

### Benchmark Results Overview

Our comprehensive evaluation across 70 test cases reveals distinct performance patterns:

#### FSA (Finite State Automata) Results
- **CUDA ngAP_v2:** Highly optimized implementation achieving >200x speedup over sequential approaches
- **CUDA Basic/CSR:** Competitive performance for standard FSA patterns  
- **Triton Implementations:** 5-15x slower than optimized CUDA for complex state machines
- **Memory Usage:** CUDA uses 20-30% less memory than Triton equivalents

#### Matrix Operations Results  
- **Small Matrices (512x512):** Triton within 10-15% of CUDA performance
- **Large Matrices (2048x2048):** CUDA maintains 20-40% performance advantage
- **Vector Addition:** Triton achieves near-parity with CUDA (within 5%)
- **Compilation Overhead:** Triton exhibits higher first-run latency

#### MLP Network Results
- **Simple Networks:** Triton competitive for basic forward passes
- **Complex Architectures:** CUDA advantage increases with model complexity
- **Memory Efficiency:** CUDA implementations show superior memory utilization

### Key Performance Insights

**1. Workload Characteristics Matter**
```
Structured Workloads (Matrix Ops):    Triton competitive
Irregular Workloads (Complex FSA):    CUDA significant advantage  
Standard Patterns (Vector Add):       Near parity
```

**2. Development vs. Performance Trade-off**
- **Triton:** 40-60% less code, significantly faster development
- **CUDA:** Maximum performance, requires extensive optimization expertise
- **Sweet Spot:** Use Triton for prototyping, CUDA for production optimization

**3. Memory Management**
- **CUDA:** Fine-grained control, efficient memory usage
- **Triton:** Automatic management with higher overhead
- **Impact:** 20-30% memory difference in favor of CUDA

### Accessing Detailed Results

```bash
# View benchmark data
cat results/fsa/fsa_benchmark_results.csv
cat results/matrix/cuda_matmul_benchmark.csv  
cat results/mlp/cuda_mlp_benchmark.csv

# Generate analysis plots
./scripts/docker.sh jupyter
# Open notebook/analysis.ipynb for visualizations
```

## Development

### Project Architecture

The codebase is designed for easy extension and comparison:

**CUDA Implementation (`src/cuda/`)**
- Kernel implementations in `src/fsa/kernels/`
- Optimized memory management and data structures
- Multiple algorithm variants (basic, CSR, ngAP v0/v1/v2)

**Triton Implementation (`src/python/triton_kernels/`)**  
- Python-based kernel definitions
- Automatic kernel tuning and optimization
- Simplified memory management abstractions

**Unified Testing Framework (`tests/`)**
- Cross-implementation validation
- Performance benchmarking infrastructure  
- Correctness verification across all variants

### Adding New Implementations

To add a new CUDA kernel:
```cpp
// src/cuda/src/fsa/kernels/my_new_kernel.cu
__global__ void my_new_fsa_kernel(/* parameters */) {
    // Implementation
}
```

To add a new Triton kernel:
```python
# src/python/triton_kernels/fsa/my_new_kernel.py
@triton.jit
def my_new_fsa_kernel(/* parameters */):
    # Implementation
```

### Testing New Implementations

```bash
# Add test case to tests/fixtures/
# Run validation
python tests/run_tests.py --fsa --implementation cuda --verbose
python tests/run_tests.py --fsa --implementation triton --verbose
```

## Contributing

### Development Setup
```bash
# Start development environment
./scripts/docker.sh shell

# Make changes to source code
# Test changes
python tests/run_tests.py --all --quick

# Run full test suite before submitting
python tests/run_tests.py --all --performance
```

### Contribution Guidelines
1. **Code Quality:** Follow existing patterns and documentation standards
2. **Testing:** Ensure all tests pass and add tests for new functionality
3. **Performance:** Benchmark new implementations against existing baselines
4. **Documentation:** Update README and inline documentation for changes

### Repository Information
- **License:** MIT License
- **Language:** C++/CUDA, Python, Docker
- **Platforms:** Linux (Ubuntu 20.04+, tested on 22.04)
- **GPU Support:** NVIDIA CUDA 12.6.2, RTX 4070 tested
- **Contact:** Submit issues through GitHub issue tracker

---

**Research Impact:** This project provides practical insights for GPU programming language selection, demonstrating quantitative trade-offs between development efficiency and computational performance across different workload characteristics.

**Citation:** If you use this work in your research, please cite the associated paper and reference this repository.