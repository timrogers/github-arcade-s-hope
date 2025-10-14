import { motion } from 'framer-motion'
import { Fire, CalendarBlank, TrendUp, ChartBar } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import type { GitHubUser } from '@/lib/types'

interface StatsComparisonProps {
  player1: GitHubUser
  player2: GitHubUser
}

interface StatItemProps {
  icon: React.ReactNode
  label: string
  value1: number | string
  value2: number | string
  winner: 'player1' | 'player2' | 'tie'
}

function StatItem({ icon, label, value1, value2, winner }: StatItemProps) {
  return (
    <div className="relative">
      <Card className="p-6 border-2">
        <div className="flex flex-col items-center gap-4">
          <div className="text-accent">
            {icon}
          </div>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center">
            {label}
          </h4>
          
          <div className="w-full grid grid-cols-2 gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className={`text-center p-3 rounded-lg transition-all ${
                winner === 'player1' 
                  ? 'bg-primary/20 border-2 border-primary ring-2 ring-primary/50' 
                  : 'bg-card'
              }`}
            >
              <div className={`text-2xl md:text-3xl font-bold font-[Orbitron] ${
                winner === 'player1' ? 'text-primary' : 'text-foreground'
              }`}>
                {value1}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className={`text-center p-3 rounded-lg transition-all ${
                winner === 'player2' 
                  ? 'bg-secondary/20 border-2 border-secondary ring-2 ring-secondary/50' 
                  : 'bg-card'
              }`}
            >
              <div className={`text-2xl md:text-3xl font-bold font-[Orbitron] ${
                winner === 'player2' ? 'text-secondary' : 'text-foreground'
              }`}>
                {value2}
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function StatsComparison({ player1, player2 }: StatsComparisonProps) {
  const getWinner = (val1: number, val2: number): 'player1' | 'player2' | 'tie' => {
    if (val1 > val2) return 'player1'
    if (val2 > val1) return 'player2'
    return 'tie'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-center mb-8 tracking-wide"
      >
        BATTLE STATISTICS
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatItem
          icon={<ChartBar weight="fill" className="w-8 h-8" />}
          label="Total Contributions"
          value1={player1.stats.totalContributions}
          value2={player2.stats.totalContributions}
          winner={getWinner(player1.stats.totalContributions, player2.stats.totalContributions)}
        />
        
        <StatItem
          icon={<Fire weight="fill" className="w-8 h-8" />}
          label="Longest Streak"
          value1={`${player1.stats.longestStreak}d`}
          value2={`${player2.stats.longestStreak}d`}
          winner={getWinner(player1.stats.longestStreak, player2.stats.longestStreak)}
        />
        
        <StatItem
          icon={<TrendUp weight="fill" className="w-8 h-8" />}
          label="Current Streak"
          value1={`${player1.stats.currentStreak}d`}
          value2={`${player2.stats.currentStreak}d`}
          winner={getWinner(player1.stats.currentStreak, player2.stats.currentStreak)}
        />
        
        <StatItem
          icon={<CalendarBlank weight="fill" className="w-8 h-8" />}
          label="Best Day"
          value1={`${player1.stats.bestDay.count} (${formatDate(player1.stats.bestDay.date)})`}
          value2={`${player2.stats.bestDay.count} (${formatDate(player2.stats.bestDay.date)})`}
          winner={getWinner(player1.stats.bestDay.count, player2.stats.bestDay.count)}
        />
      </div>
    </div>
  )
}
