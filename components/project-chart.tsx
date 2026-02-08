"use client"

import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts"
import type { ChartDataPoint } from "@/data/projects"

interface ProjectChartProps {
  data: ChartDataPoint[]
  label: string
}

const COLORS = [
  "hsl(220, 70%, 55%)",
  "hsl(160, 70%, 45%)",
  "hsl(280, 60%, 55%)",
  "hsl(30, 80%, 55%)",
  "hsl(350, 65%, 55%)",
]

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload as ChartDataPoint
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 shadow-lg">
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{data.name}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {data.value.toLocaleString()}{data.unit ? ` ${data.unit}` : "x"}
      </p>
    </div>
  )
}

export function ProjectChart({ data, label }: ProjectChartProps) {
  const hasHBMLine = data.some(d => d.name === "HBM Limit")
  const hbmValue = data.find(d => d.name === "HBM Limit")?.value
  const hasBaseline = data.some(d => d.baseline !== undefined)
  const baselineValue = data.find(d => d.baseline !== undefined)?.baseline
  const chartData = hasHBMLine ? data.filter(d => d.name !== "HBM Limit") : data

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-5"
    >
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
        {label}
      </h3>
      <div className="h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(0, 0%, 50%)", fontSize: 12 }}
              axisLine={{ stroke: "hsl(0, 0%, 80%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(0, 0%, 50%)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(0, 0%, 90%, 0.1)" }} />
            {hasHBMLine && hbmValue && (
              <ReferenceLine
                y={hbmValue}
                stroke="hsl(350, 65%, 55%)"
                strokeDasharray="5 5"
                label={{
                  value: `HBM Limit (${hbmValue} GB/s)`,
                  position: "insideTopRight",
                  fill: "hsl(350, 65%, 55%)",
                  fontSize: 11,
                }}
              />
            )}
            {hasBaseline && baselineValue !== undefined && (
              <ReferenceLine
                y={baselineValue}
                stroke="hsl(0, 0%, 60%)"
                strokeDasharray="4 4"
                label={{
                  value: `Parity (${baselineValue}×)`,
                  position: "insideTopLeft",
                  fill: "hsl(0, 0%, 55%)",
                  fontSize: 11,
                }}
              />
            )}
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60} animationDuration={800}>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
