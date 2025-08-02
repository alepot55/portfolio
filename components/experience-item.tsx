import Link from "next/link"
import { hasContentFile } from "@/lib/content-utils"

interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
}

interface ExperienceItemProps {
  experience: Experience
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const hasContent = hasContentFile('experiences', experience.id)
  
  const content = (
    <div className="hover:bg-gray-50 dark:hover:bg-gray-900/50 p-3 sm:p-4 -m-3 sm:-m-4 transition-colors rounded-lg">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
        <h3 className={`text-sm sm:text-base font-light text-gray-900 dark:text-gray-100 transition-colors ${
          hasContent ? 'group-hover:text-gray-600 dark:group-hover:text-gray-400' : ''
        }`}>
          {experience.title}
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-500 flex-shrink-0">{experience.period}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{experience.company}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{experience.description}</p>
    </div>
  )

  if (hasContent) {
    return (
      <Link href={`/experience/${experience.id}`} className="group block">
        {content}
      </Link>
    )
  }

  return <div className="block">{content}</div>
}
