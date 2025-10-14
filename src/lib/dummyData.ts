import type { GitHubUser, ContributionDay, GitHubStats } from './types'

const avatarColors = [
  'e91e63',
  '9c27b0',
  '673ab7',
  '3f51b5',
  '2196f3',
  '00bcd4',
  '009688',
  '4caf50',
  'ff9800',
  'ff5722',
]

function getRandomAvatar(username: string): string {
  const colorIndex = username.length % avatarColors.length
  const color = avatarColors[colorIndex]
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=${color}`
}

function generateContributions(): ContributionDay[] {
  const contributions: ContributionDay[] = []
  const today = new Date()

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    let count = 0
    const random = Math.random()

    if (random > 0.3) {
      if (isWeekend) {
        count = Math.floor(Math.random() * 8)
      } else {
        count = Math.floor(Math.random() * 25)
      }
    }

    contributions.push({
      date: date.toISOString().split('T')[0],
      count,
    })
  }

  return contributions
}

function calculateStats(contributions: ContributionDay[]): GitHubStats {
  const totalContributions = contributions.reduce(
    (sum, day) => sum + day.count,
    0,
  )

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0

  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) {
      tempStreak++
      if (i === contributions.length - 1 || currentStreak === 0) {
        currentStreak = tempStreak
      }
    } else {
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak
      }
      if (currentStreak > 0 && i === contributions.length - 1) {
        currentStreak = 0
      }
      tempStreak = 0
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak, currentStreak)

  const bestDay = contributions.reduce((best, day) => {
    return day.count > best.count ? day : best
  }, contributions[0])

  return {
    totalContributions,
    longestStreak,
    currentStreak,
    bestDay: {
      date: bestDay.date,
      count: bestDay.count,
    },
  }
}

export function generateDummyUserData(username: string): GitHubUser {
  const contributions = generateContributions()
  const stats = calculateStats(contributions)

  return {
    username,
    avatar: getRandomAvatar(username),
    name: username.charAt(0).toUpperCase() + username.slice(1),
    contributions,
    stats,
  }
}
