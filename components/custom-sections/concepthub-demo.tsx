"use client"

import { motion } from "framer-motion"
import { ExternalLink, Globe } from "lucide-react"
import type { Project } from "@/data/projects"

export function ConceptHubDemo({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <a
        href="https://concepthub-chi.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0">
            <Globe size={24} className="text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
              Try ConceptHub Live
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              AI-powered summaries and mind maps — deployed on Vercel
            </p>
          </div>
          <ExternalLink
            size={16}
            className="text-gray-300 dark:text-gray-700 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors shrink-0"
          />
        </div>
      </a>
    </motion.div>
  )
}
