export const projects = [
  {
    id: "verify-cbl",
    title: "Verify-CBL: Neuro-Symbolic Formal Verification Engine",
    description:
      "Built a formal verification engine combining Z3 SMT solver with LLM-powered code translation. Mathematically proves behavioral equivalence between legacy and modernized code, detecting 'penny drift' (rounding discrepancies) that testing misses. Achieved 100% accuracy on 42 benchmark cases with hybrid Z3/Monte Carlo verification.",
    technologies: [
      "Python",
      "Z3 SMT Solver",
      "LLM Integration",
      "Formal Methods",
      "Neuro-Symbolic AI",
    ],
    period: "2026",
    github: "https://github.com/alepot55/verify-cbl",
  },
  {
    id: "agentrial",
    title: "agentrial: Statistical Evaluation Framework for AI Agents",
    description:
      "Created and published an open-source framework that brings statistical rigor to AI agent evaluation. Runs agents N times with Wilson confidence intervals, step-level failure attribution via Fisher exact test, and real cost tracking across 45+ models. Includes CI/CD integration, production drift detection (CUSUM/Page-Hinkley), LLM-as-Judge with Krippendorff's alpha calibration, and a VS Code extension. 450 tests, 6 framework adapters.",
    technologies: [
      "Python",
      "Statistics",
      "LLM APIs",
      "FastAPI",
      "VS Code Extension",
      "CI/CD",
    ],
    period: "2026",
    github: "https://github.com/alepot55/agentrial",
  },
  {
    id: "flash-reasoning",
    title: "Flash-Reasoning: Memory-Efficient Tree Attention",
    description:
      "Engineered a high-performance inference engine for System 2 Reasoning models (e.g., DeepSeek-R1). Implemented 'Tree-Aware Attention' with custom Fused GQA Triton kernels, achieving 1.33x physical HBM bandwidth (1194 GB/s) and a 96.6% VRAM reduction via physical memory deduplication.",
    technologies: [
      "OpenAI Triton",
      "CUDA",
      "PyTorch",
      "Python",
      "LLM Inference",
    ],
    period: "2026",
    github: "https://github.com/alepot55/flash-reasoning",
  },
  {
    id: "flash-sae",
    title: "Flash-SAE: High-Performance Sparse Autoencoders",
    description:
      "Engineered a highly optimized OpenAI Triton library for training Sparse Autoencoders, achieving a 13.6x speedup and 97% memory reduction over PyTorch. Implements custom fused kernels and 'Ghost Gradients' to accelerate Mechanistic Interpretability research.",
    technologies: [
      "OpenAI Triton",
      "CUDA",
      "PyTorch",
      "Python",
      "Mechanistic Interpretability",
    ],
    period: "2026",
    github: "https://github.com/alepot55/flash-sae",
  },
  {
    id: "gpu-performance-analysis",
    title: "GPU Performance Analysis: Triton vs. CUDA",
    description:
      "Authored a research paper analyzing GPU programming models, quantifying that hand-optimized CUDA kernels achieved a 220x performance increase over Triton for irregular workloads.",
    technologies: ["Python", "C++", "CUDA", "Triton", "PyTorch"],
    period: "2025",
  },
  {
    id: "slam-gaussian-splatting",
    title: "SplatSLAM: Real-time 3D Mapping from RGB Video",
    description:
      "Engineered a novel SLAM system for dense 3D reconstruction from monocular video, contributing the core adaptation module back to the open-source Nerfstudio project.",
    technologies: [
      "Python",
      "PyTorch",
      "Computer Vision",
      "3D Reconstruction",
      "Algorithms",
    ],
    period: "2024",
    github: "https://github.com/alepot55/SplatSLAM",
  },
  {
    id: "concepthub-ai",
    title: "ConceptHub: AI-Powered Learning Platform",
    description:
      "Developed a full-stack web application integrating Google's Gemini API to automate the generation of book summaries and conceptual mind maps from text.",
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
  },
  {
    id: "music-genre-classification",
    title: "State-of-the-Art Music Genre Classification",
    description:
      "Designed a reproducible pipeline for Music Genre Classification on the GTZAN dataset, achieving a State-of-the-Art (SOTA) of 83.5% test accuracy with a U-Net inspired model.",
    technologies: ["Python", "TensorFlow", "Keras", "Scikit-learn", "Jupyter"],
    period: "2024",
    github: "https://github.com/alepot55/MGC-GTZAN",
  },
  {
    id: "chessboard-js",
    title: "Chessboard.js: Interactive Chessboard Library",
    description:
      "Published a lightweight and versatile NPM package for integrating interactive and customizable chessboards into web applications, featuring a rich API for programmatic control.",
    technologies: ["JavaScript", "TypeScript", "NPM", "Node.js"],
    period: "2023",
    github: "https://github.com/alepot55/Chessboard.js",
  },
];
