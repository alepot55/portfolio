export const projects = [
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
    title: "Music Genre Classification to a New SOTA",
    description:
      "Designed a reproducible pipeline for Music Genre Classification on the GTZAN dataset, achieving a new State-of-the-Art (SOTA) of 83.5% test accuracy with a U-Net inspired model.",
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
  // {
  //   id: "predicting-obesity",
  //   title: "Predicting Obesity with Multi-Output Classification",
  //   description: "Built and evaluated multiple classification models (from Logistic Regression to LightGBM) to predict obesity levels based on lifestyle and health data, achieving over 90% accuracy.",
  //   technologies: ["Python", "Scikit-learn", "Pandas", "XGBoost", "LightGBM"],
  //   period: "2024",
  // },
  {
    id: "freego-ai-concept",
    title: "FreeGo: Award-Winning AI Concept for Food Waste",
    description:
      "Conceived and developed an award-winning AI mobile app concept to reduce food waste. Won 1st place in the local Huawei Tech4Good competition and advanced to become a Global Finalist.",
    technologies: ["AI/ML Concept", "Prototyping", "UI/UX Design"],
    period: "2023 - 2024",
    github: "https://github.com/alepot55/freego.github.io",
  },
];
