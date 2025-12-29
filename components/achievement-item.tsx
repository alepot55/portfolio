import Link from "next/link"
import { hasContentFile } from "@/lib/content-utils"
import { BookOpen, Award, Trophy, Book, Globe } from "lucide-react"

interface Achievement {
    id: string
    title: string
    organization: string
    date: string
    description: string
    icon?: string
}

interface AchievementItemProps {
    achievement: Achievement
}

const IconMap: { [key: string]: React.ElementType } = {
    "BookOpen": BookOpen,
    "Book": Book,
    "Globe": Globe,
    "Award": Award,
    "Trophy": Trophy,
}

export function AchievementItem({ achievement }: AchievementItemProps) {
    const hasContent = hasContentFile('achievements', achievement.id)
    const Icon = achievement.icon ? IconMap[achievement.icon] : null

    const content = (
        <div className="hover:bg-gray-50 dark:hover:bg-gray-900/50 p-3 sm:p-4 -m-3 sm:-m-4 transition-colors rounded-lg">
            <div className="flex gap-4">
                {/* Icon Column */}
                <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {Icon ? <Icon className="w-5 h-5" /> : <div className="w-5 h-5" />}
                    </div>
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                        <h3 className={`text-sm sm:text-base font-light text-gray-900 dark:text-gray-100 transition-colors ${hasContent ? 'group-hover:text-gray-600 dark:group-hover:text-gray-400' : ''
                            }`}>
                            {achievement.title}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-500 flex-shrink-0 pt-1">{achievement.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{achievement.organization}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{achievement.description}</p>
                </div>
            </div>
        </div>
    )

    if (hasContent) {
        return (
            <Link href={`/achievements/${achievement.id}`} className="group block">
                {content}
            </Link>
        )
    }

    return <div className="block">{content}</div>
}
