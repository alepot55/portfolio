import { notFound } from "next/navigation"
import { MarkdownPage } from "@/components/markdown-page"
import { projects } from "@/data/projects"

// Fallback content for when markdown files don't exist
const FILE_NOT_FOUND_CONTENT = "Page not found"

async function getProjectContent(id: string) {
  const project = projects.find((p) => p.id === id)
  if (!project) return null

  try {
    // Try to read from file system first (for local development)
    const fs = await import("fs")
    const path = await import("path")
    const filePath = path.join(process.cwd(), "content/projects", `${id}.md`)
    const content = fs.readFileSync(filePath, "utf8")
    return { ...project, content }
  } catch (error) {
    // If file doesn't exist, use default content
    console.log(`Using default content for project: ${id}`)
    const content = FILE_NOT_FOUND_CONTENT
    return { ...project, content }
  }
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectContent(params.id)

  if (!project) {
    notFound()
  }

  return (
    <MarkdownPage
      title={project.title}
      subtitle={`${project.period}`}
      content={project.content}
      backHref="/"
      backLabel="Back to Portfolio"
      github={project.github}
      technologies={project.technologies}
    />
  )
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}
