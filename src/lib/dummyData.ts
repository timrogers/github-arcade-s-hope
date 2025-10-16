import type { GitHubUser, ContributionDay, GitHubStats } from './types'

async function fetchGitHubAvatar(username: string): Promise<string> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (response.ok) {
      const data = await response.json()
      return data.avatar_url
    }
  } catch (error) {
    console.error(`Failed to fetch avatar for ${username}:`, error)
  }
  
  // Fallback to a default avatar if fetch fails
  return `https://github.com/identicons/${username}.png`
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
      count
    })
  }
  
  return contributions
}

function calculateStats(contributions: ContributionDay[]): GitHubStats {
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0)
  
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
      count: bestDay.count
    }
  }
}

export async function generateDummyUserData(username: string): Promise<GitHubUser> {
  const contributions = generateContributions()
  const stats = calculateStats(contributions)
  const avatar = await fetchGitHubAvatar(username)
  
  return {
    username,
    avatar,
    name: username.charAt(0).toUpperCase() + username.slice(1),
    contributions,
    stats
  }
}
