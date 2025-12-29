import fs from 'fs'
import path from 'path'

export function hasContentFile(type: 'education' | 'experiences' | 'projects' | 'achievements', id: string): boolean {
  try {
    const filePath = path.join(process.cwd(), 'content', type, `${id}.md`)
    return fs.existsSync(filePath)
  } catch {
    return false
  }
}
