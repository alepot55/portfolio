import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"
import { MarkdownPage } from "@/components/markdown-page"
import { experiences } from "@/data/experiences"

// Fallback content for when markdown files don't exist
const FILE_NOT_FOUND_CONTENT = "Page not found"

async function getExperienceContent(id: string) {
  const experience = experiences.find((e) => e.id === id)
  if (!experience) return null

  try {
    const filePath = path.join(process.cwd(), "content/experiences", `${id}.md`)
    const content = fs.readFileSync(filePath, "utf8")
    return { ...experience, content }
  } catch (error) {
    console.log(`Using default content for experience: ${id}`)
    const content = FILE_NOT_FOUND_CONTENT
    return { ...experience, content }
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
      subtitle={`${experience.company} • ${experience.period}`}
      content={experience.content}
      backHref="/"
      backLabel="Back to Portfolio"
    />
  )
}

export async function generateStaticParams() {
  return experiences.map((experience) => ({
    id: experience.id,
  }))
}
