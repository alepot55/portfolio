import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectCard } from "@/components/project-card"
import { ExperienceItem } from "@/components/experience-item"
import { EducationItem } from "@/components/education-item"
import { AchievementItem } from "@/components/achievement-item"
import { projects } from "@/data/projects"
import { experiences } from "@/data/experiences"
import { education } from "@/data/education"
import { achievements } from "@/data/achievements"
import { skills } from "@/data/skills"
import { Mail, Github, Linkedin, Download } from "lucide-react"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header with Theme Toggle */}
      <header className="fixed top-0 right-0 p-4 sm:p-6 z-10">
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
            <div className="lg:col-span-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 tracking-tight">Alessandro Potenza</h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Computer Engineering student specializing in AI/ML and GPU Computing
              </p>
            </div>
            <div className="flex flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-4 lg:items-end flex-wrap">
              {/* <a
                href="/cv.pdf"
                download="Alessandro_CV.pdf"
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors text-sm font-medium rounded whitespace-nowrap"
              >
                <Download size={16} />
                <span>Download CV</span>
              </a> */}
              <a
                href="mailto:ap.alessandro.potenza@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Mail size={18} />
                <span className="text-sm">Email</span>
              </a>
              <a
                href="https://github.com/alepot55"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Github size={18} />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/alepot55"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Linkedin size={18} />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-xl sm:text-2xl font-light mb-8 sm:mb-10 text-gray-900 dark:text-gray-100">Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 mb-16 sm:mb-20">
          {/* Experience Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-light mb-8 sm:mb-10 text-gray-900 dark:text-gray-100">
              Experience
            </h2>
            <div className="space-y-6 sm:space-y-8">
              {experiences.map((experience, index) => (
                <ExperienceItem key={index} experience={experience} />
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-light mb-8 sm:mb-10 text-gray-900 dark:text-gray-100">Education</h2>
            <div className="space-y-6 sm:space-y-8">
              {education.map((edu, index) => (
                <EducationItem key={index} education={edu} />
              ))}
            </div>
          </section>
        </div>

        {/* Achievements Section */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-xl sm:text-2xl font-light mb-8 sm:mb-10 text-gray-900 dark:text-gray-100">Achievements</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {achievements.map((achievement, index) => (
              <AchievementItem key={index} achievement={achievement} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-xl sm:text-2xl font-light mb-8 sm:mb-10 text-gray-900 dark:text-gray-100">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="text-base sm:text-lg font-light mb-2 sm:mb-3 text-gray-700 dark:text-gray-300">
                  {category}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{skillList.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 sm:pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="flex gap-6 sm:gap-8 justify-center flex-wrap">
            <a
              href="mailto:alessandro@example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
            >
              Email
            </a>
            <a
              href="https://github.com/alessandro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/alessandro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
