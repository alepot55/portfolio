import Link from "next/link"

interface Education {
  id: string
  degree: string
  institution: string
  period: string
  description: string
}

interface EducationItemProps {
  education: Education
}

export function EducationItem({ education }: EducationItemProps) {
  return (
    <Link href={`/education/${education.id}`} className="group block">
      <div className="hover:bg-gray-50 dark:hover:bg-gray-900/50 p-3 sm:p-4 -m-3 sm:-m-4 transition-colors rounded-lg">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
          <h3 className="text-sm sm:text-base font-light text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
            {education.degree}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-500 flex-shrink-0">{education.period}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{education.institution}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{education.description}</p>
      </div>
    </Link>
  )
}
