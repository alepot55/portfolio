import { notFound } from "next/navigation"
import { MarkdownPage } from "@/components/markdown-page"
import { education } from "@/data/education"

// Fallback content for when markdown files don't exist
const FILE_NOT_FOUND_CONTENT = "Page not found"

async function getEducationContent(id: string) {
  const edu = education.find((e) => e.id === id)
  if (!edu) return null

  try {
    // Try to read from file system first (for local development)
    const fs = await import("fs")
    const path = await import("path")
    const filePath = path.join(process.cwd(), "content/education", `${id}.md`)
    const content = fs.readFileSync(filePath, "utf8")
    return { ...edu, content }
  } catch (error) {
    // If file doesn't exist, use default content
    console.log(`Using default content for education: ${id}`)
    const content = FILE_NOT_FOUND_CONTENT
    return { ...edu, content }
  }
}

export default async function EducationPage({ params }: { params: { id: string } }) {
  const edu = await getEducationContent(params.id)

  if (!edu) {
    notFound()
  }

  return (
    <MarkdownPage
      title={edu.degree}
      subtitle={`${edu.institution} • ${edu.period}`}
      content={edu.content}
      backHref="/"
      backLabel="Back to Portfolio"
    />
  )
}

export async function generateStaticParams() {
  return education.map((edu) => ({
    id: edu.id,
  }))
}
