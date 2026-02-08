import { PortfolioPage } from "@/components/portfolio-page"
import { projects } from "@/data/projects"
import { experiences } from "@/data/experiences"
import { education } from "@/data/education"
import { achievements } from "@/data/achievements"
import { skills } from "@/data/skills"
import { hasContentFile } from "@/lib/content-utils"

export default function Home() {
  const projectContentMap: Record<string, boolean> = {}
  for (const project of projects) {
    projectContentMap[project.id] = hasContentFile("projects", project.id)
  }

  return (
    <PortfolioPage
      projects={projects}
      experiences={experiences}
      education={education}
      achievements={achievements}
      skills={skills}
      projectContentMap={projectContentMap}
    />
  )
}
