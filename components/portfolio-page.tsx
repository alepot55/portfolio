"use client"

import { useState } from "react"
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import { ProjectCard } from "./project-card"
import { ExperienceItem } from "./experience-item"
import { EducationItem } from "./education-item"
import { AchievementItem } from "./achievement-item"
import { SkillsChart } from "./skills-chart"
import { CATEGORY_LABELS } from "@/lib/constants"
import type { Project } from "@/data/projects"
import type { Experience, Education, Achievement } from "@/lib/constants"

interface PortfolioPageProps {
  projects: Project[]
  experiences: Experience[]
  education: Education[]
  achievements: Achievement[]
  skills: Record<string, string[]>
  projectContentMap: Record<string, boolean>
  experienceContentMap: Record<string, boolean>
  educationContentMap: Record<string, boolean>
}

function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-8 flex items-center gap-3"
    >
      <span className="h-px w-6 bg-gray-300 dark:bg-gray-700" aria-hidden="true" />
      {children}
    </h2>
  )
}

const FILTER_OPTIONS = [
  { key: "all", label: "All" },
  { key: "ai-ml", label: CATEGORY_LABELS["ai-ml"] },
  { key: "systems", label: CATEGORY_LABELS["systems"] },
  { key: "web", label: CATEGORY_LABELS["web"] },
  { key: "research", label: CATEGORY_LABELS["research"] },
]

export function PortfolioPage({
  projects,
  experiences,
  education,
  achievements,
  skills,
  projectContentMap,
  experienceContentMap,
  educationContentMap,
}: PortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState("all")

  const featuredProjects = projects.filter((p) => p.featured)
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Fixed Header */}
      <header className="fixed top-0 right-0 left-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-900">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center" aria-label="Main navigation">
          <a href="#" className="text-sm font-bold text-gray-900 dark:text-gray-100 tracking-tight hover:opacity-80 transition-opacity">
            AP
          </a>
          <div className="flex items-center gap-1 sm:gap-3">
            <a
              href="https://github.com/alepot55"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              aria-label="GitHub profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/alepot55"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:ap.alessandro.potenza@gmail.com"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              aria-label="Send email"
            >
              <Mail size={18} />
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-balance">
              Alessandro Potenza
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-10">
              Computer Engineering student at{" "}
              <span className="text-gray-800 dark:text-gray-200 font-medium">Politecnico di Milano</span>,
              building high-performance AI systems, GPU kernels, and open-source tools.
            </p>
          </motion.div>
        </section>

        {/* Featured Projects */}
        <section className="pb-16 sm:pb-24" aria-labelledby="featured-projects">
          <SectionHeading id="featured-projects">Featured Projects</SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                hasContent={projectContentMap[project.id] || false}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* All Projects */}
        <section className="pb-16 sm:pb-24" aria-labelledby="all-projects">
          <SectionHeading id="all-projects">All Projects</SectionHeading>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter projects by category">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.key}
                role="tab"
                aria-selected={activeFilter === option.key}
                onClick={() => setActiveFilter(option.key)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  activeFilter === option.key
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" role="tabpanel">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                hasContent={projectContentMap[project.id] || false}
                index={index}
              />
            ))}
            {filteredProjects.length === 0 && (
              <p className="text-sm text-gray-400 dark:text-gray-500 col-span-full py-8 text-center">
                No projects in this category yet.
              </p>
            )}
          </div>
        </section>

        {/* Skills */}
        <section className="pb-16 sm:pb-24" aria-labelledby="skills">
          <SectionHeading id="skills">Skills</SectionHeading>
          <div className="max-w-3xl">
            <SkillsChart skills={skills} />
          </div>
        </section>

        {/* Experience + Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16 sm:pb-24">
          <section aria-labelledby="experience">
            <SectionHeading id="experience">Experience</SectionHeading>
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <ExperienceItem key={experience.id} experience={experience} index={index} hasContent={experienceContentMap[experience.id] || false} />
              ))}
            </div>
          </section>

          <section aria-labelledby="education">
            <SectionHeading id="education">Education</SectionHeading>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <EducationItem key={edu.id} education={edu} index={index} hasContent={educationContentMap[edu.id] || false} />
              ))}
            </div>
          </section>
        </div>

        {/* Achievements */}
        <section className="pb-16 sm:pb-24" aria-labelledby="achievements">
          <SectionHeading id="achievements">Achievements</SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {achievements.map((achievement, index) => (
              <AchievementItem key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Alessandro Potenza
            </p>
            <div className="flex gap-6">
              <a
                href="mailto:ap.alessandro.potenza@gmail.com"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-1.5"
              >
                Email <ArrowUpRight size={12} />
              </a>
              <a
                href="https://github.com/alepot55"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-1.5"
              >
                GitHub <ArrowUpRight size={12} />
              </a>
              <a
                href="https://linkedin.com/in/alepot55"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-1.5"
              >
                LinkedIn <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
