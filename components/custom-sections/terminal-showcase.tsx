"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion-wrapper"
import type { Project } from "@/data/projects"

type LineType = "command" | "pass" | "fail" | "warn" | "highlight" | "info" | "dim" | "blank"

interface TerminalLine {
  text: string
  type: LineType
}

const LINE_COLORS: Record<LineType, string> = {
  command: "text-white font-bold",
  pass: "text-green-400",
  fail: "text-red-400",
  warn: "text-yellow-400",
  highlight: "text-cyan-400",
  info: "text-gray-300",
  dim: "text-gray-600",
  blank: "",
}

const terminalLines: TerminalLine[] = [
  { text: "$ agentrial run booking_agent --trials 50 --parallel 8", type: "command" },
  { text: "", type: "blank" },
  { text: "agentrial v0.5.2 \u2014 Statistical Agent Testing Framework", type: "highlight" },
  { text: "Running 50 trials with 8 parallel workers...", type: "info" },
  { text: "", type: "blank" },
  { text: "  \u2713 Trial  1/50  PASS  (3.2s, $0.012)", type: "pass" },
  { text: "  \u2713 Trial  2/50  PASS  (2.8s, $0.011)", type: "pass" },
  { text: "  \u2717 Trial  3/50  FAIL  step: parse_dates (4.1s, $0.015)", type: "fail" },
  { text: "  \u2713 Trial  4/50  PASS  (3.0s, $0.012)", type: "pass" },
  { text: "  ...", type: "dim" },
  { text: "  \u2713 Trial 50/50  PASS  (2.9s, $0.011)", type: "pass" },
  { text: "", type: "blank" },
  { text: "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501", type: "dim" },
  { text: "  Results: 47/50 passed", type: "highlight" },
  { text: "  Success Rate: 94.0% [83.5% \u2014 98.7%] (Wilson CI)", type: "highlight" },
  { text: "  Agent Reliability Score: 87/100", type: "highlight" },
  { text: "", type: "blank" },
  { text: "  Step Failure Attribution (Fisher exact test):", type: "info" },
  { text: "    parse_dates     p=0.003  \u2605\u2605\u2605  2/3 failures", type: "fail" },
  { text: "    validate_input  p=0.142       1/3 failures", type: "warn" },
  { text: "", type: "blank" },
  { text: "  Cost: $0.61 total ($0.012/trial avg)", type: "info" },
  { text: "  Duration: 18.4s (parallel), est. 156s serial", type: "info" },
  { text: "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501", type: "dim" },
]

export function TerminalShowcase({ project }: { project: Project }) {
  void project

  return (
    <FadeIn delay={0.2}>
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-sm font-mono text-gray-600 dark:text-gray-400">
            agentrial
          </span>
        </div>

        {/* Terminal body */}
        <div className="bg-gray-950 p-4 sm:p-6 overflow-x-auto font-mono text-sm leading-relaxed">
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              className={LINE_COLORS[line.type]}
            >
              {line.type === "blank" ? "\u00A0" : (
                <pre className="whitespace-pre">{line.text}</pre>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
