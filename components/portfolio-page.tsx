"use client"

import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import { ProjectCard } from "./project-card"
import { ExperienceItem } from "./experience-item"
import { EducationItem } from "./education-item"
import { AchievementItem } from "./achievement-item"
import { SkillsChart } from "./skills-chart"
import type { Project } from "@/data/projects"

interface PortfolioPageProps {
  projects: Project[]
  experiences: any[]
  education: any[]
  achievements: any[]
  skills: Record<string, string[]>
  projectContentMap: Record<string, boolean>
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8">
      {children}
    </h2>
  )
}

export function PortfolioPage({
  projects,
  experiences,
  education,
  achievements,
  skills,
  projectContentMap,
}: PortfolioPageProps) {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Fixed Header */}
      <header className="fixed top-0 right-0 left-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 border-b border-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
            AP
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/alepot55"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/alepot55"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:ap.alessandro.potenza@gmail.com"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <Mail size={18} />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-5">
              Alessandro Potenza
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-8">
              Computer Engineering student at{" "}
              <span className="text-gray-700 dark:text-gray-300">Politecnico di Milano</span>,
              building high-performance AI systems, GPU kernels, and open-source tools.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-8 sm:gap-12"
          >
            {[
              { value: "9", label: "Projects" },
              { value: "800+", label: "Hours Mentoring" },
              { value: "110/110", label: "cum Laude" },
              { value: "Top 1.5%", label: "AI Challenge" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Featured Projects */}
        <section className="pb-16 sm:pb-24">
          <SectionHeading>Featured Projects</SectionHeading>
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
        <section className="pb-16 sm:pb-24">
          <SectionHeading>All Projects</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                hasContent={projectContentMap[project.id] || false}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="pb-16 sm:pb-24">
          <SectionHeading>Skills</SectionHeading>
          <div className="max-w-3xl">
            <SkillsChart skills={skills} />
          </div>
        </section>

        {/* Experience + Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16 sm:pb-24">
          <section>
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <ExperienceItem key={experience.id} experience={experience} index={index} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <EducationItem key={edu.id} education={edu} index={index} />
              ))}
            </div>
          </section>
        </div>

        {/* Achievements */}
        <section className="pb-16 sm:pb-24">
          <SectionHeading>Achievements</SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {achievements.map((achievement, index) => (
              <AchievementItem key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Alessandro Potenza
            </p>
            <div className="flex gap-6">
              <a
                href="mailto:ap.alessandro.potenza@gmail.com"
                className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-1"
              >
                Email <ArrowUpRight size={12} />
              </a>
              <a
                href="https://github.com/alepot55"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-1"
              >
                GitHub <ArrowUpRight size={12} />
              </a>
              <a
                href="https://linkedin.com/in/alepot55"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-1"
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
