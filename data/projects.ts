export interface ProjectMetric {
  label: string
  value: string
  description?: string
}

export interface ProjectFeature {
  title: string
  description: string
}

export interface ChartDataPoint {
  name: string
  value: number
  baseline?: number
  unit?: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  period: string
  github?: string
  featured?: boolean
  category: "ai-ml" | "systems" | "web" | "research"
  metrics?: ProjectMetric[]
  features?: ProjectFeature[]
  chartData?: ChartDataPoint[]
  chartLabel?: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: "agentrial",
    title: "agentrial",
    description:
      "The pytest for AI agents. Run your agent 100 times, get confidence intervals instead of anecdotes. Published open-source framework with Wilson confidence intervals, step-level failure attribution via Fisher exact test, and real cost tracking across 45+ models.",
    technologies: [
      "Python",
      "Statistics",
      "LLM APIs",
      "FastAPI",
      "VS Code Extension",
      "CI/CD",
      "PyPI",
    ],
    period: "2026",
    github: "https://github.com/alepot55/agentrial",
    featured: true,
    category: "ai-ml",
    metrics: [
      { label: "Tests Passing", value: "450", description: "Full test suite" },
      { label: "Framework Adapters", value: "6", description: "LangGraph, CrewAI, AutoGen, Pydantic AI, OpenAI Agents SDK, smolagents" },
      { label: "Models Tracked", value: "45+", description: "Real cost tracking" },
      { label: "License", value: "MIT", description: "Open source" },
    ],
    features: [
      { title: "Statistical Rigor", description: "Wilson confidence intervals and Fisher exact test for step-level failure attribution" },
      { title: "Production Monitoring", description: "CUSUM, Page-Hinkley, and KS drift detectors for real-time regression detection" },
      { title: "Agent Reliability Score", description: "Composite 0-100 score with Pareto frontier analysis and prompt version control" },
      { title: "MCP Security Scanner", description: "Built-in security scanning for Model Context Protocol integrations" },
    ],
  },
  {
    id: "flash-reasoning",
    title: "Flash-Reasoning",
    description:
      "Tree-Aware KV-Cache Attention for Reasoning LLMs. Custom Fused GQA Triton kernels exploit physical prefix sharing to exceed HBM bandwidth limits, enabling efficient inference for System 2 Reasoning models like DeepSeek-R1.",
    technologies: [
      "OpenAI Triton",
      "CUDA",
      "PyTorch",
      "Python",
      "LLM Inference",
    ],
    period: "2026",
    github: "https://github.com/alepot55/flash-reasoning",
    featured: true,
    category: "systems",
    metrics: [
      { label: "Speedup", value: "2.54x", description: "vs standard attention" },
      { label: "VRAM Reduction", value: "96.6%", description: "Physical memory deduplication" },
      { label: "Effective BW", value: "1194 GB/s", description: "Exceeds 900 GB/s HBM limit via L2 cache" },
      { label: "Tests", value: "9", description: "Correctness tests passing" },
    ],
    features: [
      { title: "Physical Prefix Sharing", description: "Reference-counted KV blocks eliminate O(n×b) memory waste from shared prefixes" },
      { title: "Fused GQA Kernel", description: "Single Triton kernel fusing gather + GQA expansion + scaled dot-product attention" },
      { title: "Online Softmax", description: "FlashAttention-style numerically stable softmax without materialization" },
      { title: "Triton Autotuning", description: "Automatic kernel parameter optimization for A100/H100/RTX architectures" },
    ],
    chartData: [
      { name: "Standard Attn", value: 470, unit: "GB/s" },
      { name: "Flash-Reasoning", value: 1194, unit: "GB/s" },
      { name: "HBM Limit", value: 900, unit: "GB/s" },
    ],
    chartLabel: "Effective Bandwidth (GB/s)",
  },
  {
    id: "flash-sae",
    title: "Flash-SAE",
    description:
      "High-Performance Triton Kernels for Sparse Autoencoders. 13.6x speedup and 97% memory reduction via sparse kernel fusion. Drop-in PyTorch replacement with full autograd support for Mechanistic Interpretability research.",
    technologies: [
      "OpenAI Triton",
      "CUDA",
      "PyTorch",
      "Python",
      "Mechanistic Interpretability",
    ],
    period: "2026",
    github: "https://github.com/alepot55/flash-sae",
    featured: true,
    category: "systems",
    metrics: [
      { label: "Decoder Speedup", value: "13.6x", description: "Sparse gather operations" },
      { label: "Memory Saved", value: "97%", description: "Never materializes dense activations" },
      { label: "Full Forward", value: "1.78x", description: "End-to-end speedup" },
      { label: "Tests", value: "19/19", description: "All tests passing" },
    ],
    features: [
      { title: "Sparse Kernel Fusion", description: "Fused top-k selection + sparse gather eliminates dense intermediate tensors" },
      { title: "Ghost Gradients", description: "Novel dead latent recovery mechanism for training stability" },
      { title: "FP8 Quantization", description: "Ada Lovelace+ GPU support for further memory reduction" },
      { title: "Drop-in Replacement", description: "Full autograd compatibility — swap one import and get 13x speedup" },
    ],
    chartData: [
      { name: "Encoder", value: 1.06, baseline: 1.0 },
      { name: "Decoder", value: 13.6, baseline: 1.0 },
      { name: "Full Forward", value: 1.78, baseline: 1.0 },
    ],
    chartLabel: "Speedup vs PyTorch (×)",
  },
  {
    id: "verify-cbl",
    title: "Verify-CBL",
    description:
      "Neuro-Symbolic Formal Verification Engine combining Z3 SMT solver with LLM-powered code translation. Mathematically proves behavioral equivalence between legacy and modernized code, detecting 'penny drift' that testing misses.",
    technologies: [
      "Python",
      "Z3 SMT Solver",
      "LLM Integration",
      "Formal Methods",
      "Neuro-Symbolic AI",
    ],
    period: "2026",
    github: "https://github.com/alepot55/verify-cbl",
    category: "ai-ml",
    metrics: [
      { label: "Accuracy", value: "100%", description: "42 benchmark cases" },
      { label: "Approach", value: "Hybrid", description: "Z3 + Monte Carlo verification" },
    ],
    features: [
      { title: "SMT Solving", description: "Z3 theorem prover for mathematical equivalence proofs" },
      { title: "LLM Translation", description: "AI-powered code translation between legacy and modern languages" },
      { title: "Penny Drift Detection", description: "Catches rounding discrepancies that traditional testing misses" },
    ],
  },
  {
    id: "gpu-performance-analysis",
    title: "GPU Performance Analysis: Triton vs. CUDA",
    description:
      "Research paper quantifying the performance gap between high-level GPU programming models (Triton) and hand-optimized CUDA kernels, with a focus on irregular workloads like finite state machines.",
    technologies: ["Python", "C++", "CUDA", "Triton", "PyTorch"],
    period: "2025",
    category: "research",
    metrics: [
      { label: "CUDA Advantage", value: "220x", description: "For irregular workloads" },
    ],
    features: [
      { title: "Comprehensive Benchmarking", description: "Systematic comparison across regular and irregular GPU workloads" },
      { title: "FSM Analysis", description: "Deep dive into finite state machine kernel performance characteristics" },
    ],
    chartData: [
      { name: "Regular Workload", value: 1.2, baseline: 1.0 },
      { name: "Irregular (FSM)", value: 220, baseline: 1.0 },
    ],
    chartLabel: "CUDA Speedup vs Triton (×)",
  },
  {
    id: "slam-gaussian-splatting",
    title: "SplatSLAM",
    description:
      "Real-time 3D mapping and SLAM from monocular RGB video using 3D Gaussian Splatting. Photo-realistic dense reconstruction without depth sensors, built as a Nerfstudio extension.",
    technologies: [
      "Python",
      "PyTorch",
      "Computer Vision",
      "3D Reconstruction",
      "CUDA",
      "Nerfstudio",
    ],
    period: "2024",
    github: "https://github.com/alepot55/SplatSLAM",
    category: "research",
    features: [
      { title: "RGB-Only Operation", description: "No depth sensors required — works with standard monocular video" },
      { title: "Real-time SLAM", description: "Simultaneous tracking and photorealistic 3D mapping" },
      { title: "Gaussian Splatting", description: "State-of-the-art neural rendering for high-fidelity reconstruction" },
      { title: "Nerfstudio Integration", description: "Built as extension to the open-source Nerfstudio project" },
    ],
  },
  {
    id: "concepthub-ai",
    title: "ConceptHub",
    description:
      "AI-Powered full-stack learning platform integrating Google's Gemini API. Automates generation of book summaries and conceptual mind maps from text, with user authentication and persistent storage.",
    technologies: [
      "React",
      "TypeScript",
      "PostgreSQL",
      "Python",
      "GCP",
      "Docker",
      "Gemini API",
    ],
    period: "2024",
    liveUrl: "https://concepthub-chi.vercel.app/",
    category: "web",
    features: [
      { title: "AI Summarization", description: "Gemini-powered book summaries and concept extraction" },
      { title: "Mind Map Generation", description: "Automatic conceptual mind maps from text content" },
      { title: "Full-Stack Architecture", description: "React frontend, Python backend, PostgreSQL database on GCP" },
    ],
  },
  {
    id: "music-genre-classification",
    title: "Music Genre Classification",
    description:
      "End-to-end reproducible pipeline achieving SOTA 83.5% accuracy on GTZAN with a U-Net inspired model. Leak-free methodology with track-level splits, cross-validation, and transfer learning.",
    technologies: ["Python", "PyTorch", "Scikit-learn", "Jupyter", "Mel-Spectrograms"],
    period: "2024",
    github: "https://github.com/alepot55/MGC-GTZAN",
    category: "ai-ml",
    metrics: [
      { label: "Test Accuracy", value: "83.5%", description: "SOTA on GTZAN" },
      { label: "CV Mean", value: "~90%", description: "Cross-validation" },
    ],
    features: [
      { title: "Leak-Free Pipeline", description: "Track-level 60/20/20 split before audio slicing prevents data leakage" },
      { title: "U-Net Architecture", description: "Custom U-Net encoder achieving state-of-the-art classification" },
      { title: "Transfer Learning", description: "Strong generalization to Indian Classical Music and Tabla Taala datasets" },
    ],
  },
  {
    id: "chessboard-js",
    title: "Chessboard.js",
    description:
      "Modern, dependency-free JavaScript library and NPM package for building interactive chess experiences. Rich API for programmatic control, drag-and-drop, animations, and legal move enforcement.",
    technologies: ["JavaScript", "TypeScript", "NPM", "Node.js"],
    period: "2023",
    github: "https://github.com/alepot55/Chessboard.js",
    liveUrl: "https://sites.google.com/view/chessboard-js/home",
    category: "web",
    features: [
      { title: "Zero Dependencies", description: "Lightweight, dependency-free library" },
      { title: "Rich API", description: "Position management, move control, FEN support, game history" },
      { title: "Interactive", description: "Drag-and-drop, click-to-move, animations, legal move enforcement" },
      { title: "NPM Package", description: "Published as @alepot55/chessboardjs on npm" },
    ],
  },
];
