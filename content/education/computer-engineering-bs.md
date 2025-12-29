# B.S. Computer Engineering

## Program Overview
This comprehensive program provided a strong foundation in computer engineering principles with specialized focus on artificial intelligence, machine learning, and GPU computing.

### Core Curriculum

#### Fundamental Courses
- **Computer Architecture**: Deep dive into processor design, memory systems, and parallel computing
- **Data Structures and Algorithms**: Advanced algorithmic thinking and optimization techniques
- **Software Engineering**: Large-scale software development methodologies and practices
- **Database Systems**: Relational and NoSQL database design and optimization

#### Specialization Courses
- **Machine Learning**: Statistical learning theory, neural networks, and deep learning
- **GPU Computing**: CUDA programming, parallel algorithms, and high-performance computing
- **Computer Vision**: Image processing, feature detection, and object recognition
- **Natural Language Processing**: Text analysis, language models, and semantic understanding

### Major Projects

#### Senior Capstone: Distributed ML Training System

**Technical Implementation:**
\`\`\`yaml
# Kubernetes deployment for distributed training
apiVersion: batch/v1
kind: Job
metadata:
  name: distributed-training-job
spec:
  parallelism: 4
  template:
    spec:
      containers:
      - name: pytorch-trainer
        image: alessandro/pytorch-distributed:latest
        resources:
          requests:
            nvidia.com/gpu: 1
          limits:
            nvidia.com/gpu: 1
        env:
        - name: MASTER_ADDR
          value: "pytorch-master-service"
        - name: WORLD_SIZE
          value: "4"
        command: ["python", "train_distributed.py"]
\`\`\`

**Results:**
- 60% reduction in training time for large models
- Automatic fault tolerance and recovery
- Dynamic resource scaling based on workload

### Academic Achievements
- **GPA**: 3.8/4.0
- **Dean's List**: Multiple semesters
- **Research Assistant**: AI/ML lab for 2 years
- **Teaching Assistant**: Computer Architecture and Parallel Computing courses


### Key Achievements
- ✅ 3.8/4.0 GPA with Dean's List recognition
- ✅ 2 research publications with more in progress
- ✅ Strong foundation in AI/ML and systems programming
- ✅ Leadership experience in student organizations

### Awards & Honors
- 🏆 **Best Capstone Project Award** — Recognized for outstanding senior project in distributed machine learning (2025)
- 🏅 **AI/ML Research Grant Recipient** — Awarded competitive grant for research in neural network optimization (2024)
- 🥇 **First Place, HackAI Competition** — Led team to victory in national AI hackathon (2023)

---

**Transcript**: [Available upon request]  
**Portfolio**: [alessandro.dev](https://alessandro.dev)
