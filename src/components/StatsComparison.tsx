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
  delay?: number
}

function StatItem({ icon, label, value1, value2, winner }: StatItemProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="text-accent"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {icon}
          </motion.div>
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center">
            {label}
          </h4>

          <div className="w-full grid grid-cols-2 gap-4">
            <motion.div
              initial={{ scale: 0, x: -20 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ type: 'spring', delay: 0.3, stiffness: 200 }}
              whileHover={{ scale: 1.1 }}
              className={`text-center p-3 rounded-lg transition-all ${
                winner === 'player1'
                  ? 'bg-primary/20 border-2 border-primary ring-2 ring-primary/50'
                  : 'bg-card'
              }`}
            >
              <motion.div
                className={`text-2xl md:text-3xl font-bold font-[Orbitron] ${
                  winner === 'player1' ? 'text-primary' : 'text-foreground'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {value1}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, x: 20 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ type: 'spring', delay: 0.3, stiffness: 200 }}
              whileHover={{ scale: 1.1 }}
              className={`text-center p-3 rounded-lg transition-all ${
                winner === 'player2'
                  ? 'bg-secondary/20 border-2 border-secondary ring-2 ring-secondary/50'
                  : 'bg-card'
              }`}
            >
              <motion.div
                className={`text-2xl md:text-3xl font-bold font-[Orbitron] ${
                  winner === 'player2' ? 'text-secondary' : 'text-foreground'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {value2}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Card>

      {winner !== 'tie' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
          className={`absolute -top-2 ${winner === 'player1' ? '-left-2' : '-right-2'} text-2xl`}
        >
          ⭐
        </motion.div>
      )}
    </motion.div>
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
        transition={{ type: 'spring', stiffness: 100 }}
        className="text-2xl md:text-3xl font-bold text-center mb-8 tracking-wide"
      >
        BATTLE STATISTICS
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <ChartBar weight="fill" className="w-8 h-8" />,
            label: 'Total Contributions',
            value1: player1.stats.totalContributions,
            value2: player2.stats.totalContributions,
            winner: getWinner(player1.stats.totalContributions, player2.stats.totalContributions),
            delay: 0,
          },
          {
            icon: <Fire weight="fill" className="w-8 h-8" />,
            label: 'Longest Streak',
            value1: `${player1.stats.longestStreak}d`,
            value2: `${player2.stats.longestStreak}d`,
            winner: getWinner(player1.stats.longestStreak, player2.stats.longestStreak),
            delay: 0.1,
          },
          {
            icon: <TrendUp weight="fill" className="w-8 h-8" />,
            label: 'Current Streak',
            value1: `${player1.stats.currentStreak}d`,
            value2: `${player2.stats.currentStreak}d`,
            winner: getWinner(player1.stats.currentStreak, player2.stats.currentStreak),
            delay: 0.2,
          },
          {
            icon: <CalendarBlank weight="fill" className="w-8 h-8" />,
            label: 'Best Day',
            value1: `${player1.stats.bestDay.count} (${formatDate(player1.stats.bestDay.date)})`,
            value2: `${player2.stats.bestDay.count} (${formatDate(player2.stats.bestDay.date)})`,
            winner: getWinner(player1.stats.bestDay.count, player2.stats.bestDay.count),
            delay: 0.3,
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: stat.delay }}
          >
            <StatItem {...stat} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
