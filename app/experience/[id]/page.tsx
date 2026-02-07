import { notFound } from "next/navigation"
import { MarkdownPage } from "@/components/markdown-page"
import { experiences } from "@/data/experiences"

async function getExperienceContent(id: string) {
  const experience = experiences.find((e) => e.id === id)
  if (!experience) return null

  try {
    const fs = await import("fs")
    const path = await import("path")
    const filePath = path.join(process.cwd(), "content/experiences", `${id}.md`)
    const content = fs.readFileSync(filePath, "utf8")
    return { ...experience, content }
  } catch {
    return null
  }
}

export default async function ExperiencePage({ params }: { params: { id: string } }) {
  const experience = await getExperienceContent(params.id)

  if (!experience) {
    notFound()
  }

  return (
    <MarkdownPage
      title={experience.title}
      subtitle={`${experience.company} · ${experience.period}`}
      content={experience.content}
      backHref="/"
      backLabel="Portfolio"
    />
  )
}

export async function generateStaticParams() {
  return experiences.map((experience) => ({
    id: experience.id,
  }))
}
