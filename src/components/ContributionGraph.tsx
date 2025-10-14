import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ContributionDay } from '@/lib/types'

interface ContributionGraphProps {
  contributions: ContributionDay[]
  playerSide: 'player1' | 'player2'
  username: string
}

export function ContributionGraph({ contributions, playerSide, username }: ContributionGraphProps) {
  const borderColor = playerSide === 'player1' ? 'border-primary/50' : 'border-secondary/50'
  const baseColor = playerSide === 'player1' ? 'bg-primary' : 'bg-secondary'

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-muted/20'
    if (count <= 5) return `${baseColor}/30`
    if (count <= 10) return `${baseColor}/50`
    if (count <= 15) return `${baseColor}/70`
    return `${baseColor}`
  }

  const weeks: ContributionDay[][] = []
  let currentWeek: ContributionDay[] = []
  
  contributions.forEach((day, index) => {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className={`p-6 border-2 ${borderColor}`}>
        <div className="mb-4">
          <h3 className="font-bold text-lg tracking-wide">@{username}</h3>
        </div>
        
        <TooltipProvider delayDuration={0}>
          <div className="overflow-x-auto pb-2">
            <div className="inline-flex gap-1 min-w-full">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <Tooltip key={`${weekIndex}-${dayIndex}`}>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ 
                            delay: (weekIndex * 7 + dayIndex) * 0.001,
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                          whileHover={{ scale: 1.3 }}
                          className={`w-3 h-3 rounded-sm cursor-pointer transition-all ${getIntensityClass(day.count)}`}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs">
                          <div className="font-semibold">{day.count} contributions</div>
                          <div className="text-muted-foreground">{formatDate(day.date)}</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </TooltipProvider>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-muted/20" />
            <div className={`w-3 h-3 rounded-sm ${baseColor}/30`} />
            <div className={`w-3 h-3 rounded-sm ${baseColor}/50`} />
            <div className={`w-3 h-3 rounded-sm ${baseColor}/70`} />
            <div className={`w-3 h-3 rounded-sm ${baseColor}`} />
          </div>
          <span>More</span>
        </div>
      </Card>
    </motion.div>
  )
}
