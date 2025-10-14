import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Lightning, ArrowsClockwise } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { PlayerCard } from '@/components/PlayerCard'
import { StatsComparison } from '@/components/StatsComparison'
import { ContributionGraph } from '@/components/ContributionGraph'
import { WinnerBanner } from '@/components/WinnerBanner'
import { generateDummyUserData } from '@/lib/dummyData'
import type { GitHubUser } from '@/lib/types'

function App() {
  const [player1, setPlayer1] = useState<GitHubUser | null>(null)
  const [player2, setPlayer2] = useState<GitHubUser | null>(null)
  const [showBattle, setShowBattle] = useState(false)

  const handleStartBattle = (username1: string, username2: string) => {
    const user1 = generateDummyUserData(username1)
    const user2 = generateDummyUserData(username2)
    setPlayer1(user1)
    setPlayer2(user2)
    setShowBattle(true)
  }

  const handleReset = () => {
    setPlayer1(null)
    setPlayer2(null)
    setShowBattle(false)
  }

  const determineWinner = (): 'player1' | 'player2' | 'tie' => {
    if (!player1 || !player2) return 'tie'
    
    const score1 = 
      player1.stats.totalContributions * 1 +
      player1.stats.longestStreak * 10 +
      player1.stats.currentStreak * 5
    
    const score2 = 
      player2.stats.totalContributions * 1 +
      player2.stats.longestStreak * 10 +
      player2.stats.currentStreak * 5
    
    if (score1 > score2) return 'player1'
    if (score2 > score1) return 'player2'
    return 'tie'
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none" />
      
      <div className="relative">
        <header className="py-8 px-4 md:px-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-wider mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              GITHUB BATTLE ARENA
            </h1>
            <p className="text-muted-foreground font-medium">
              Face off in the ultimate contribution showdown
            </p>
          </motion.div>
        </header>

        <main className="px-4 md:px-8 pb-16">
          <AnimatePresence mode="wait">
            {!showBattle ? (
              <SelectionScreen key="selection" onStartBattle={handleStartBattle} />
            ) : (
              <motion.div
                key="battle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="flex justify-center mb-8">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="gap-2"
                  >
                    <ArrowsClockwise className="w-5 h-5" />
                    New Battle
                  </Button>
                </div>

                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start max-w-7xl mx-auto">
                  <PlayerCard user={player1!} playerSide="player1" />
                  
                  <div className="flex items-center justify-center md:pt-20">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.8 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
                      <Lightning 
                        weight="fill" 
                        className="w-16 h-16 md:w-20 md:h-20 text-accent relative z-10 drop-shadow-[0_0_20px_rgba(190,242,100,0.6)]" 
                      />
                    </motion.div>
                  </div>
                  
                  <PlayerCard user={player2!} playerSide="player2" />
                </div>

                <StatsComparison player1={player1!} player2={player2!} />

                <div className="max-w-7xl mx-auto space-y-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-center tracking-wide">
                    CONTRIBUTION GRAPHS
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <ContributionGraph 
                      contributions={player1!.contributions} 
                      playerSide="player1"
                      username={player1!.username}
                    />
                    <ContributionGraph 
                      contributions={player2!.contributions} 
                      playerSide="player2"
                      username={player2!.username}
                    />
                  </div>
                </div>

                <WinnerBanner winner={determineWinner()} player1={player1!} player2={player2!} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function SelectionScreen({ onStartBattle }: { onStartBattle: (u1: string, u2: string) => void }) {
  const [username1, setUsername1] = useState('')
  const [username2, setUsername2] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username1.trim() && username2.trim()) {
      onStartBattle(username1.trim(), username2.trim())
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-card border-2 border-border rounded-lg p-8 md:p-12 shadow-[0_0_50px_rgba(99,102,241,0.15)]">
        <div className="text-center mb-8">
          <Trophy weight="fill" className="w-20 h-20 mx-auto mb-4 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-wide">
            CHOOSE YOUR FIGHTERS
          </h2>
          <p className="text-muted-foreground">Enter two GitHub usernames to begin the battle</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary uppercase tracking-wider">
                Player 1
              </label>
              <input
                type="text"
                value={username1}
                onChange={(e) => setUsername1(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 bg-background border-2 border-primary/40 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary uppercase tracking-wider">
                Player 2
              </label>
              <input
                type="text"
                value={username2}
                onChange={(e) => setUsername2(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 bg-background border-2 border-secondary/40 rounded-lg focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!username1.trim() || !username2.trim()}
            className="w-full py-6 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(190,242,100,0.3)] hover:shadow-[0_0_50px_rgba(190,242,100,0.5)] transition-all"
          >
            START BATTLE
          </Button>
        </form>
      </div>
    </motion.div>
  )
}

export default App
