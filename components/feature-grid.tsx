"use client"

import { motion } from "framer-motion"
import type { ProjectFeature } from "@/data/projects"

interface FeatureGridProps {
  features: ProjectFeature[]
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
          className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
        >
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5">
            {feature.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
