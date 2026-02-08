"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion-wrapper"
import { ExternalLink, Package, Terminal } from "lucide-react"
import type { Project } from "@/data/projects"

type LineType = "command" | "pass" | "fail" | "warn" | "highlight" | "info" | "dim" | "blank" | "header" | "success"

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
  header: "text-cyan-300 font-bold",
  success: "text-green-300 font-bold",
}

const terminalLines: TerminalLine[] = [
  { text: "$ pip install agentrial", type: "command" },
  { text: "Successfully installed agentrial-0.5.2", type: "pass" },
  { text: "", type: "blank" },
  { text: "$ agentrial run booking_agent --trials 50 --parallel 8", type: "command" },
  { text: "", type: "blank" },
  { text: "agentrial v0.5.2 \u2014 Statistical Agent Testing Framework", type: "highlight" },
  { text: "Running 50 trials with 8 parallel workers...", type: "info" },
  { text: "", type: "blank" },
  { text: "  \u2713 Trial  1/50  PASS  (3.2s, $0.012)  gpt-4o", type: "pass" },
  { text: "  \u2713 Trial  2/50  PASS  (2.8s, $0.011)  gpt-4o", type: "pass" },
  { text: "  \u2717 Trial  3/50  FAIL  step: parse_dates       (4.1s, $0.015)", type: "fail" },
  { text: "  \u2713 Trial  4/50  PASS  (3.0s, $0.012)  gpt-4o", type: "pass" },
  { text: "  \u2713 Trial  5/50  PASS  (2.5s, $0.010)  gpt-4o", type: "pass" },
  { text: "  \u2717 Trial  6/50  FAIL  step: validate_input    (3.8s, $0.014)", type: "fail" },
  { text: "  \u2713 Trial  7/50  PASS  (2.9s, $0.011)  gpt-4o", type: "pass" },
  { text: "  \u2713 Trial  8/50  PASS  (3.1s, $0.012)  gpt-4o", type: "pass" },
  { text: "  ...", type: "dim" },
  { text: "  \u2713 Trial 50/50  PASS  (2.9s, $0.011)  gpt-4o", type: "pass" },
  { text: "", type: "blank" },
  { text: "\u2501\u2501\u2501 Results \u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501", type: "header" },
  { text: "", type: "blank" },
  { text: "  Passed:  47/50", type: "success" },
  { text: "  Success Rate:  94.0%  [83.5% \u2014 98.7%]  (Wilson CI)", type: "highlight" },
  { text: "  Agent Reliability Score:  87/100", type: "highlight" },
  { text: "", type: "blank" },
  { text: "\u2501\u2501\u2501 Step Failure Attribution \u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501", type: "header" },
  { text: "", type: "blank" },
  { text: "  Step              Failures    p-value     Sig", type: "info" },
  { text: "  parse_dates       2/3         p=0.003     \u2605\u2605\u2605", type: "fail" },
  { text: "  validate_input    1/3         p=0.142     -", type: "warn" },
  { text: "  submit_booking    0/3         p=1.000     -", type: "info" },
  { text: "", type: "blank" },
  { text: "\u2501\u2501\u2501 Drift Detection \u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501", type: "header" },
  { text: "", type: "blank" },
  { text: "  CUSUM:             No drift detected", type: "pass" },
  { text: "  Page-Hinkley:      No drift detected", type: "pass" },
  { text: "  Kolmogorov-Smirnov: p=0.847  (stable)", type: "pass" },
  { text: "", type: "blank" },
  { text: "\u2501\u2501\u2501 Cost Summary \u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501", type: "header" },
  { text: "", type: "blank" },
  { text: "  Total:     $0.61  (50 trials)", type: "info" },
  { text: "  Average:   $0.012/trial", type: "info" },
  { text: "  Duration:  18.4s (parallel) \u2014 est. 156s serial", type: "info" },
  { text: "  Model:     gpt-4o (45+ models supported)", type: "info" },
  { text: "", type: "blank" },
  { text: "  \u2713 Report saved to ./reports/booking_agent_2026-02-08.html", type: "pass" },
]

const ECOSYSTEM_LINKS = [
  {
    title: "PyPI Package",
    subtitle: "pip install agentrial",
    href: "https://pypi.org/project/agentrial/",
    icon: Package,
  },
  {
    title: "VS Code Extension",
    subtitle: "Run trials from your editor",
    href: "https://marketplace.visualstudio.com/items?itemName=alepot55.agentrial-vscode",
    image: "https://alepot55.gallerycdn.vsassets.io/extensions/alepot55/agentrial-vscode/0.1.1/1770392406757/Microsoft.VisualStudio.Services.Icons.Default",
  },
  {
    title: "Product Hunt",
    subtitle: "Discover & upvote",
    href: "https://www.producthunt.com/products/github-268",
    icon: ExternalLink,
  },
]

export function TerminalShowcase({ project }: { project: Project }) {
  void project

  return (
    <FadeIn delay={0.2}>
      <div className="space-y-6">
        {/* Ecosystem links */}
        <div className="grid gap-4 sm:grid-cols-3">
          {ECOSYSTEM_LINKS.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-4 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all"
            >
              <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shrink-0">
                {link.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={link.image} alt={link.title} width={20} height={20} className="rounded" />
                ) : link.icon ? (
                  <link.icon size={20} className="text-gray-500 dark:text-gray-400" />
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {link.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {link.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Terminal */}
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <Terminal size={14} className="ml-2 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
              agentrial
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-gray-950 p-4 sm:p-6 overflow-x-auto font-mono text-[13px] leading-relaxed">
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.035 }}
                className={LINE_COLORS[line.type]}
              >
                {line.type === "blank" ? "\u00A0" : (
                  <pre className="whitespace-pre">{line.text}</pre>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
