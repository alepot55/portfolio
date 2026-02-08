"use client"

import { motion } from "framer-motion"
import { Play, GraduationCap, ExternalLink } from "lucide-react"
import type { Project } from "@/data/projects"

const DEMOS = [
  {
    title: "Room Scene",
    description: "Dense 3D reconstruction of an indoor room from monocular RGB video",
    color: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10",
  },
  {
    title: "Kitchen Scene",
    description: "Real-time mapping of a complex kitchen environment with fine details",
    color: "from-teal-500/10 to-teal-600/5 dark:from-teal-500/20 dark:to-teal-600/10",
  },
  {
    title: "Living Room",
    description: "Large-scale generalization to open environments with varying complexity",
    color: "from-purple-500/10 to-purple-600/5 dark:from-purple-500/20 dark:to-purple-600/10",
  },
]

const PIPELINE_STEPS = [
  { label: "RGB Frame", description: "Standard monocular camera input" },
  { label: "Tracking", description: "Camera pose estimation via photometric alignment" },
  { label: "Mapping", description: "Keyframe selection and Gaussian optimization" },
  { label: "Rendering", description: "Photo-realistic novel view synthesis" },
]

export function SplatSLAMShowcase({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Pipeline visualization */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-5">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
          Real-time Pipeline
        </h4>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center text-center px-3 sm:px-4">
                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                  {step.label}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 max-w-[120px]">
                  {step.description}
                </span>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <span className="hidden sm:block text-gray-300 dark:text-gray-700 mx-1">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Demo scenes */}
      <div className="grid gap-4 sm:grid-cols-3">
        {DEMOS.map((demo, i) => (
          <motion.div
            key={demo.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            className={`rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br ${demo.color} p-5`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/60 dark:bg-gray-800/60 shrink-0">
                <Play size={16} className="text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {demo.title}
                </h5>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  {demo.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View demos link */}
      <a
        href="https://github.com/alepot55/SplatSLAM#demo-results"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      >
        Watch demo videos on GitHub
        <ExternalLink
          size={14}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </a>

      {/* Thesis card */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/30 p-5">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-white dark:bg-gray-800 shrink-0">
            <GraduationCap
              size={20}
              className="text-gray-500 dark:text-gray-400"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Bachelor&apos;s Thesis
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              This project formed the foundation of my thesis at Sapienza
              University of Rome
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
