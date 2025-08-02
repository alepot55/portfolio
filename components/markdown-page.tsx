import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { MarkdownRenderer } from "./markdown-renderer"

interface MarkdownPageProps {
  title: string
  subtitle?: string
  content: string
  backHref: string
  backLabel: string
}

export function MarkdownPage({ title, subtitle, content, backHref, backLabel }: MarkdownPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link
            href={backHref}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">{backLabel}</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-3 sm:mb-4 tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{subtitle}</p>
          )}
        </div>

        <article className="overflow-hidden">
          <MarkdownRenderer content={content} />
        </article>
      </main>
    </div>
  )
}
