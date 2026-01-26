"use client"

import Link from "next/link"
import { Github } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  period: string
  github?: string
}

interface ProjectCardProps {
  project: Project
  hasContent?: boolean
}

export function ProjectCard({ project, hasContent = false }: ProjectCardProps) {
  const TitleWrapper = hasContent ? Link : "div"
  const titleProps = hasContent ? { href: `/projects/${project.id}` } : {}

  return (
    <div className={`group relative flex flex-col h-full p-4 sm:p-6 border border-gray-200 dark:border-gray-800 transition-colors rounded-lg ${hasContent ? "hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer" : ""}`}>
      <div className="flex justify-between items-start mb-3 gap-3">
        <TitleWrapper {...titleProps} className="flex-1 min-w-0">
          <h3 className={`text-base sm:text-lg font-light text-gray-900 dark:text-gray-100 transition-colors line-clamp-2 ${hasContent ? "group-hover:text-gray-600 dark:group-hover:text-gray-400" : ""}`}>
            {project.title}
          </h3>
        </TitleWrapper>
        <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap pt-1">{project.period}</span>
      </div>

      {hasContent ? (
        <Link href={`/projects/${project.id}`} className="block flex-1 pb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs text-gray-500 dark:text-gray-500">+{project.technologies.length - 4} more</span>
            )}
          </div>
        </Link>
      ) : (
        <div className="block flex-1 pb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs text-gray-500 dark:text-gray-500">+{project.technologies.length - 4} more</span>
            )}
          </div>
        </div>
      )}

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100 transition-colors bg-white dark:bg-gray-950 p-1 rounded-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={20} />
        </a>
      )}
    </div>
  )
}
