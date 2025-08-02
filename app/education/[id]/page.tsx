import { notFound } from "next/navigation"
import { MarkdownPage } from "@/components/markdown-page"
import { education } from "@/data/education"

// Fallback content for when markdown files don't exist
const getDefaultEducationContent = (id: string) => {
  const contentMap: Record<string, string> = {
    "computer-engineering-bs": `# B.S. Computer Engineering

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

#### Computer Vision: Real-time Object Detection

Developed an optimized object detection pipeline using:
- **YOLOv8** for detection accuracy
- **TensorRT** for inference optimization  
- **NVIDIA Jetson** for edge deployment

**Performance Metrics:**
| Model | Device | FPS | mAP@0.5 | Latency |
|-------|--------|-----|---------|---------|
| YOLOv8n | RTX 3080 | 245 | 0.89 | 4.1ms |
| YOLOv8s | RTX 3080 | 180 | 0.92 | 5.6ms |
| YOLOv8n-TRT | Jetson AGX | 60 | 0.87 | 16.7ms |

### Research Experience

#### Undergraduate Research Assistant (2023-Present)

**Lab**: High-Performance Computing Lab  
**Supervisor**: Prof. Maria Rodriguez

**Current Project**: "Optimizing Memory Access Patterns in GPU-Accelerated Deep Learning"

**Research Contributions:**
- Analyzed memory coalescing patterns in popular DL frameworks
- Developed custom CUDA kernels with 30% performance improvement
- Co-authored 2 papers (1 accepted, 1 under review)

**Publications:**
1. **"Memory-Efficient Training of Large Neural Networks on GPU Clusters"**  
   A. Silva, M. Rodriguez, et al.  
   *IEEE International Conference on High Performance Computing*, 2024

2. **"Adaptive Memory Management for Dynamic Neural Networks"**  
   A. Silva, J. Chen, M. Rodriguez  
   *Under review at ICML 2025*

### Teaching Experience

#### Teaching Assistant - Computer Architecture (Fall 2023, Spring 2024)

**Responsibilities:**
- Lead weekly lab sessions for 40+ students
- Grade assignments and provide detailed feedback
- Hold office hours for individual student support
- Assist with curriculum development and lab exercises

**Student Feedback Score**: 4.8/5.0

### Academic Achievements
- **GPA**: 3.8/4.0
- **Dean's List**: Multiple semesters
- **Research Assistant**: AI/ML lab for 2 years
- **Teaching Assistant**: Computer Architecture and Parallel Computing courses

### Skills Developed Through Coursework

#### Technical Skills
- **Systems Programming**: Memory management, concurrency, performance optimization
- **Algorithm Design**: Dynamic programming, graph algorithms, optimization techniques
- **Machine Learning**: Deep learning, computer vision, natural language processing
- **Parallel Computing**: CUDA programming, distributed systems, high-performance computing

#### Soft Skills
- **Research Methodology**: Literature review, experimental design, statistical analysis
- **Technical Communication**: Research papers, presentations, documentation
- **Leadership**: Team projects, teaching assistance, club management
- **Project Management**: Timeline planning, resource allocation, deliverable tracking

### Key Achievements
- ✅ 3.8/4.0 GPA with Dean's List recognition
- ✅ 2 research publications with more in progress
- ✅ Strong foundation in AI/ML and systems programming
- ✅ Leadership experience in student organizations

---

**Transcript**: [Available upon request]  
**Portfolio**: [alessandro.dev](https://alessandro.dev)`,

    "exchange-program": `# Exchange Program

## Program Overview
Semester abroad at Technical University of Munich focusing on advanced coursework in distributed systems and parallel computing architectures.

### Academic Experience

#### Advanced Coursework
- **Distributed Systems Architecture**: Large-scale system design and fault tolerance
- **Parallel Computing Paradigms**: Advanced parallel algorithms and optimization
- **High-Performance Computing**: Supercomputing and cluster computing
- **European Software Engineering Practices**: Agile methodologies and team collaboration

#### Research Project: European Grid Computing

**Objective**: Analyze performance characteristics of European research computing infrastructure

\`\`\`python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Performance analysis of European HPC centers
def analyze_hpc_performance():
    # Data from major European HPC centers
    centers = ['HLRS Stuttgart', 'BSC Barcelona', 'CINECA Bologna', 'CSC Finland']
    peak_performance = [26.8, 13.9, 3.2, 2.8]  # PetaFLOPS
    energy_efficiency = [15.3, 12.1, 8.9, 11.2]  # GFLOPS/Watt
    
    # Create performance comparison
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
    
    ax1.bar(centers, peak_performance, color='skyblue')
    ax1.set_title('Peak Performance (PetaFLOPS)')
    ax1.set_ylabel('PetaFLOPS')
    plt.setp(ax1.get_xticklabels(), rotation=45)
    
    ax2.bar(centers, energy_efficiency, color='lightgreen')
    ax2.set_title('Energy Efficiency (GFLOPS/Watt)')
    ax2.set_ylabel('GFLOPS/Watt')
    plt.setp(ax2.get_xticklabels(), rotation=45)
    
    plt.tight_layout()
    plt.savefig('european_hpc_analysis.png', dpi=300, bbox_inches='tight')
    plt.show()

analyze_hpc_performance()
\`\`\`

### Cultural and Professional Development

#### International Collaboration
- Worked with students from 15+ countries
- Participated in multinational software development projects
- Gained experience with European business practices and work culture

#### Language Skills
- Improved German language proficiency (B2 level achieved)
- Technical German vocabulary for engineering contexts
- Cross-cultural communication in academic and professional settings

### Key Projects

#### Distributed Hash Table Implementation

\`\`\`cpp
#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
#include <functional>

class DistributedHashTable {
private:
    struct Node {
        std::string id;
        std::string address;
        std::unordered_map<std::string, std::string> data;
    };
    
    std::vector<Node> nodes;
    int num_nodes;
    
    size_t hash_function(const std::string& key) {
        return std::hash<std::string>{}(key) % num_nodes;
    }
    
public:
    DistributedHashTable(int n) : num_nodes(n) {
        nodes.resize(n);
        for (int i = 0; i < n; i++) {
            nodes[i].id = "node_" + std::to_string(i);
            nodes[i].address = "192.168.1." + std::to_string(i + 100);
        }
    }
    
    void put(const std::string& key, const std::string& value) {
        size_t node_index = hash_function(key);
        nodes[node_index].data[key] = value;
        std::cout << "Stored " << key << " -> " << value 
                  << " on " << nodes[node_index].id << std::endl;
    }
    
    std::string get(const std::string& key) {
        size_t node_index = hash_function(key);
        auto& node_data = nodes[node_index].data;
        
        if (node_data.find(key) != node_data.end()) {
            return node_data[key];
        }
        return "Key not found";
    }
    
    void print_distribution() {
        for (const auto& node : nodes) {
            std::cout << node.id << " (" << node.address << "): " 
                      << node.data.size() << " keys" << std::endl;
        }
    }
};
\`\`\`

### Academic Achievements

- **Final Grade**: 1.3 (German grading system, equivalent to A-)
- **Research Paper**: "Performance Analysis of European HPC Infrastructure"
- **Presentation**: "Distributed Computing in Academic Research"
- **Cultural Integration Award**: Recognition for outstanding international engagement

### Professional Network

#### Industry Connections
- **BMW Group**: Guest lecture on automotive software systems
- **SAP**: Workshop on enterprise distributed systems
- **Siemens**: Industrial IoT and edge computing seminar

#### Academic Collaborations
- Joint research project with TUM Computer Science Department
- Collaboration with international students on distributed systems project
- Participation in European Student Computing Conference

### Key Learnings

#### Technical Skills
- Advanced understanding of European computing infrastructure
- Experience with different software development methodologies
- Exposure to cutting-edge research in distributed systems

#### Cultural Competency
- Ability to work effectively in multicultural teams
- Understanding of European business and academic practices
- Enhanced global perspective on technology and innovation

#### Personal Growth
- Independence and adaptability in new environments
- Improved problem-solving skills through diverse perspectives
- Enhanced communication skills in international contexts

### Impact on Career Development

This exchange program significantly broadened my technical knowledge and cultural understanding, providing:

- **Global Perspective**: Understanding of international approaches to computing and engineering
- **Technical Depth**: Advanced coursework not available at home institution
- **Professional Network**: Connections with European academia and industry
- **Personal Growth**: Increased confidence and adaptability

### Key Achievements
- ✅ 1.3 final grade (equivalent to A-)
- ✅ Research paper on European HPC infrastructure
- ✅ Cultural Integration Award
- ✅ Strong professional network in European tech industry

---

**Institution**: [Technical University of Munich](https://www.tum.de)  
**Program Coordinator**: Prof. Dr. Hans Mueller  
**Research Paper**: [European HPC Performance Analysis](https://alessandro.dev/papers/european-hpc-analysis.pdf)`,
  }

  return (
    contentMap[id] ||
    `# ${id}

## Education Overview

This educational experience provided comprehensive knowledge and practical skills in the field.

## Core Curriculum

- Course 1: Fundamental concepts and principles
- Course 2: Advanced topics and applications
- Course 3: Practical implementation and projects

## Key Projects

Major projects and assignments completed during this program.

## Academic Achievements

- Academic honors and recognition
- Research contributions
- Leadership roles

---

**Institution**: [Institution Website](https://institution.edu)  
**Transcript**: [Available upon request]`
  )
}

async function getEducationContent(id: string) {
  const edu = education.find((e) => e.id === id)
  if (!edu) return null

  try {
    // Try to read from file system first (for local development)
    const fs = await import("fs")
    const path = await import("path")
    const filePath = path.join(process.cwd(), "content/education", `${id}.md`)
    const content = fs.readFileSync(filePath, "utf8")
    return { ...edu, content }
  } catch (error) {
    // If file doesn't exist, use default content
    console.log(`Using default content for education: ${id}`)
    const content = getDefaultEducationContent(id)
    return { ...edu, content }
  }
}

export default async function EducationPage({ params }: { params: { id: string } }) {
  const edu = await getEducationContent(params.id)

  if (!edu) {
    notFound()
  }

  return (
    <MarkdownPage
      title={edu.degree}
      subtitle={`${edu.institution} • ${edu.period}`}
      content={edu.content}
      backHref="/"
      backLabel="Back to Portfolio"
    />
  )
}

export async function generateStaticParams() {
  return education.map((edu) => ({
    id: edu.id,
  }))
}
