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
        transition={{ type: 'spring', delay: 1, duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-8 md:p-12 text-center border-2 border-accent bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 shadow-[0_0_60px_rgba(190,242,100,0.3)]">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              delay: 1.3,
              repeat: 2,
            }}
          >
            <Confetti
              weight="fill"
              className="w-20 h-20 mx-auto mb-6 text-accent"
            />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4 tracking-wider text-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            IT'S A TIE!
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-foreground/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            Both warriors are equally matched in this epic battle!
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: 'spring' }}
            className="mt-6 flex justify-center gap-4"
          >
            {['🎉', '🤝', '🎊'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 2.2 + i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="text-4xl"
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </Card>
      </motion.div>
    )
  }

  const winnerUser = winner === 'player1' ? player1 : player2
  const winnerColor = winner === 'player1' ? 'primary' : 'secondary'
  const winnerBg =
    winner === 'player1'
      ? 'from-primary/10 via-primary/5 to-primary/10'
      : 'from-secondary/10 via-secondary/5 to-secondary/10'
  const winnerBorder =
    winner === 'player1' ? 'border-primary' : 'border-secondary'
  const winnerText = winner === 'player1' ? 'text-primary' : 'text-secondary'
  const winnerShadow =
    winner === 'player1'
      ? 'shadow-[0_0_60px_rgba(99,102,241,0.4)]'
      : 'shadow-[0_0_60px_rgba(236,72,153,0.4)]'

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', delay: 1, duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <Card
        className={`p-8 md:p-12 text-center border-2 ${winnerBorder} bg-gradient-to-r ${winnerBg} ${winnerShadow} overflow-hidden relative`}
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 10, -10, 10, -10, 0],
          }}
          transition={{
            duration: 1,
            delay: 1.3,
            repeat: 2,
          }}
        >
          <Trophy
            weight="fill"
            className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 ${winnerText}`}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.h2
            className={`text-4xl md:text-6xl font-bold mb-4 tracking-wider ${winnerText}`}
            animate={{
              textShadow: [
                '0 0 20px rgba(255,255,255,0)',
                '0 0 40px rgba(255,255,255,0.5)',
                '0 0 20px rgba(255,255,255,0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            VICTORY!
          </motion.h2>
          <p className="text-lg md:text-2xl text-foreground/90 mb-2">
            <span className="font-bold">{winnerUser.name}</span> wins the
            battle!
          </p>
          <p className="text-md md:text-lg text-muted-foreground">
            @{winnerUser.username} has proven superior in the contribution arena
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 1.8 }}
          className="mt-8 inline-block"
        >
          <motion.div
            className={`px-6 py-3 rounded-full font-bold text-lg uppercase tracking-wider ${
              winner === 'player1'
                ? 'bg-primary/20 text-primary border-2 border-primary'
                : 'bg-secondary/20 text-secondary border-2 border-secondary'
            }`}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            🏆 Champion 🏆
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute text-2xl`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -50, -100],
              }}
              transition={{
                duration: 2,
                delay: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
              }}
            >
              {['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </motion.div>
      </Card>
    </motion.div>
  )
}
