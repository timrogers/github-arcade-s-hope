import { motion } from 'framer-motion'
import { User } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import type { GitHubUser } from '@/lib/types'

interface PlayerCardProps {
  user: GitHubUser
  playerSide: 'player1' | 'player2'
}

export function PlayerCard({ user, playerSide }: PlayerCardProps) {
  const borderColor =
    playerSide === 'player1' ? 'border-primary' : 'border-secondary'
  const glowColor =
    playerSide === 'player1'
      ? 'shadow-[0_0_30px_rgba(99,102,241,0.4)]'
      : 'shadow-[0_0_30px_rgba(236,72,153,0.4)]'
  const ringColor = playerSide === 'player1' ? 'ring-primary' : 'ring-secondary'

  return (
    <motion.div
      initial={{ x: playerSide === 'player1' ? -100 : 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <Card
        className={`p-6 ${borderColor} border-2 ${glowColor} transition-shadow hover:${glowColor.replace('0.4', '0.6')}`}
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.4, duration: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`relative ring-4 ${ringColor} rounded-full`}
          >
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 20px ${playerSide === 'player1' ? 'rgba(99,102,241,0.3)' : 'rgba(236,72,153,0.3)'}`,
                  `0 0 40px ${playerSide === 'player1' ? 'rgba(99,102,241,0.6)' : 'rgba(236,72,153,0.6)'}`,
                  `0 0 20px ${playerSide === 'player1' ? 'rgba(99,102,241,0.3)' : 'rgba(236,72,153,0.3)'}`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-full"
            >
              <Avatar className="w-24 h-24 md:w-32 md:h-32">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>
                  <User weight="fill" className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </motion.div>

          <div className="text-center space-y-1">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="text-xl md:text-2xl font-bold tracking-wide"
            >
              {user.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="text-muted-foreground font-medium"
            >
              @{user.username}
            </motion.p>
          </div>

          <motion.div
            initial={{ scale: 0, rotateX: -90 }}
            animate={{ scale: 1, rotateX: 0 }}
            transition={{ type: 'spring', delay: 0.8, stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider ${
              playerSide === 'player1'
                ? 'bg-primary/20 text-primary border border-primary/50'
                : 'bg-secondary/20 text-secondary border border-secondary/50'
            }`}
          >
            {playerSide === 'player1' ? 'Player 1' : 'Player 2'}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
