"use client"

import { motion } from "framer-motion"

interface MetricCardProps {
  label: string
  value: string
  description?: string
  index?: number
}

export function MetricCard({ label, value, description, index = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-5"
    >
      <div className="relative z-10">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
          {label}
        </p>
        <p className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight">
          {value}
        </p>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {description}
          </p>
        )}
      </div>
      <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-gray-200/50 dark:bg-gray-700/20" />
    </motion.div>
  )
}
