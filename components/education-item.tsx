"use client"

import { motion } from "framer-motion"
import type { Education } from "@/lib/constants"

interface EducationItemProps {
  education: Education
  index?: number
}

export function EducationItem({ education, index = 0 }: EducationItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
    >
      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600" aria-hidden="true" />
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{education.period}</span>
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-1">
        {education.degree}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1.5">{education.institution}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{education.description}</p>
    </motion.article>
  )
}
