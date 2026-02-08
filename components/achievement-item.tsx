"use client"

import { motion } from "framer-motion"
import { Award, Trophy, Globe } from "lucide-react"
import type { Achievement } from "@/lib/constants"

interface AchievementItemProps {
  achievement: Achievement
  index?: number
}

const IconMap: Record<string, React.ElementType> = {
  Award,
  Trophy,
  Globe,
}

export function AchievementItem({ achievement, index = 0 }: AchievementItemProps) {
  const Icon = achievement.icon ? IconMap[achievement.icon] : Award

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
    >
      <div className="shrink-0 mt-0.5">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400" aria-hidden="true">
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {achievement.title}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">{achievement.date}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{achievement.organization}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{achievement.description}</p>
      </div>
    </motion.article>
  )
}
