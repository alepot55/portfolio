export const CATEGORY_COLORS: Record<string, string> = {
  "ai-ml": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  systems: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  web: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  research: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
}

export const CATEGORY_LABELS: Record<string, string> = {
  "ai-ml": "AI/ML",
  systems: "Systems",
  web: "Web",
  research: "Research",
}

export const CATEGORY_LABELS_FULL: Record<string, string> = {
  "ai-ml": "AI / Machine Learning",
  systems: "Systems / GPU",
  web: "Web Development",
  research: "Research",
}

export const SKILL_CATEGORY_COLORS: Record<string, string> = {
  Programming: "bg-blue-500/80",
  "AI/ML": "bg-purple-500/80",
  Systems: "bg-emerald-500/80",
  Databases: "bg-amber-500/80",
  Web: "bg-rose-500/80",
  Tools: "bg-gray-500/80",
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  period: string
  description: string
}

export interface Achievement {
  id: string
  title: string
  organization: string
  date: string
  description: string
  icon?: string
}
