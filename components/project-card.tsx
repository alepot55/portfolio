"use client"

import Link from "next/link"
import { Github, ExternalLink, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
  hasContent?: boolean
  index?: number
}

const CATEGORY_COLORS: Record<string, string> = {
  "ai-ml": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  systems: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  web: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  research: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
}

const CATEGORY_LABELS: Record<string, string> = {
  "ai-ml": "AI/ML",
  systems: "Systems",
  web: "Web",
  research: "Research",
}

export function ProjectCard({ project, hasContent = false, index = 0 }: ProjectCardProps) {
  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${CATEGORY_COLORS[project.category]}`}>
            {CATEGORY_LABELS[project.category]}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">{project.period}</span>
        </div>
        {hasContent && (
          <ArrowUpRight size={16} className="text-gray-400 dark:text-gray-600 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors shrink-0" />
        )}
      </div>

      <h3 className={`text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors ${hasContent ? "group-hover:text-gray-600 dark:group-hover:text-gray-300" : ""}`}>
        {project.title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {project.metrics && project.metrics.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
          {project.metrics.slice(0, 3).map((metric) => (
            <div key={metric.label}>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{metric.value}</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-500 uppercase tracking-wide ml-1">{metric.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end justify-between gap-3 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[11px] text-gray-400 dark:text-gray-600 self-center">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        <div className="flex gap-2 shrink-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </>
  )

  const className = `group relative flex flex-col h-full p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-200 ${
    hasContent
      ? "hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm cursor-pointer"
      : ""
  }`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      {hasContent ? (
        <Link href={`/projects/${project.id}`} className={className}>
          {cardContent}
        </Link>
      ) : (
        <div className={className}>
          {cardContent}
        </div>
      )}
    </motion.div>
  )
}
