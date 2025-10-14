import { motion } from 'framer-motion'
import { Trophy, Confetti } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import type { GitHubUser } from '@/lib/types'

interface WinnerBannerProps {
  winner: 'player1' | 'player2' | 'tie'
  player1: GitHubUser
  player2: GitHubUser
}

export function WinnerBanner({ winner, player1, player2 }: WinnerBannerProps) {
  if (winner === 'tie') {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 1, duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-8 md:p-12 text-center border-2 border-accent bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 shadow-[0_0_60px_rgba(190,242,100,0.3)]">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{ 
              duration: 0.5,
              delay: 1.3,
              repeat: 2
            }}
          >
            <Confetti weight="fill" className="w-20 h-20 mx-auto mb-6 text-accent" />
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-wider text-accent">
            IT'S A TIE!
          </h2>
          <p className="text-lg md:text-xl text-foreground/80">
            Both warriors are equally matched in this epic battle!
          </p>
        </Card>
      </motion.div>
    )
  }

  const winnerUser = winner === 'player1' ? player1 : player2
  const winnerColor = winner === 'player1' ? 'primary' : 'secondary'
  const winnerBg = winner === 'player1' 
    ? 'from-primary/10 via-primary/5 to-primary/10' 
    : 'from-secondary/10 via-secondary/5 to-secondary/10'
  const winnerBorder = winner === 'player1' ? 'border-primary' : 'border-secondary'
  const winnerText = winner === 'player1' ? 'text-primary' : 'text-secondary'
  const winnerShadow = winner === 'player1'
    ? 'shadow-[0_0_60px_rgba(99,102,241,0.4)]'
    : 'shadow-[0_0_60px_rgba(236,72,153,0.4)]'

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", delay: 1, duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <Card className={`p-8 md:p-12 text-center border-2 ${winnerBorder} bg-gradient-to-r ${winnerBg} ${winnerShadow}`}>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 0.6,
            delay: 1.3,
            repeat: 3
          }}
        >
          <Trophy weight="fill" className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 ${winnerText}`} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 tracking-wider ${winnerText}`}>
            VICTORY!
          </h2>
          <p className="text-lg md:text-2xl text-foreground/90 mb-2">
            <span className="font-bold">{winnerUser.name}</span> wins the battle!
          </p>
          <p className="text-md md:text-lg text-muted-foreground">
            @{winnerUser.username} has proven superior in the contribution arena
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 1.8 }}
          className="mt-8 inline-block"
        >
          <div className={`px-6 py-3 rounded-full font-bold text-lg uppercase tracking-wider ${
            winner === 'player1' 
              ? 'bg-primary/20 text-primary border-2 border-primary' 
              : 'bg-secondary/20 text-secondary border-2 border-secondary'
          }`}>
            🏆 Champion 🏆
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}
