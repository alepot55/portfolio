"use client"

import { motion } from "framer-motion"

interface SkillsChartProps {
  skills: Record<string, string[]>
}

const CATEGORY_COLORS: Record<string, string> = {
  Programming: "bg-blue-500/80",
  "AI/ML": "bg-purple-500/80",
  Systems: "bg-emerald-500/80",
  Databases: "bg-amber-500/80",
  Web: "bg-rose-500/80",
  Tools: "bg-gray-500/80",
}

export function SkillsChart({ skills }: SkillsChartProps) {
  const maxSkills = Math.max(...Object.values(skills).map((s) => s.length))

  return (
    <div className="space-y-5">
      {Object.entries(skills).map(([category, skillList], catIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: catIndex * 0.08 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24 shrink-0">
              {category}
            </span>
            <div className="flex-1 relative h-7 bg-gray-100 dark:bg-gray-800/80 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(skillList.length / maxSkills) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                className={`absolute inset-y-0 left-0 rounded-full ${CATEGORY_COLORS[category] || "bg-gray-500/80"}`}
              />
              <div className="absolute inset-0 flex items-center px-3">
                <span className="text-xs text-gray-700 dark:text-gray-300 font-medium truncate relative z-10">
                  {skillList.join(" · ")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
