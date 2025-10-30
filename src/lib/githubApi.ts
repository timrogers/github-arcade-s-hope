import axios from 'axios'
import type { GitHubUser, ContributionDay, GitHubStats } from './types'

interface GitHubContribData {
  weeks: Array<{
    contribution_days: Array<{
      date: string
      count: number
    }>
  }>
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

export async function fetchGitHubUserData(username: string): Promise<GitHubUser> {
  try {
    const response = await axios.get<GitHubContribData>(`https://contributions-api.me-5bd.workers.dev/?username=${username}`)
    
    const data = response.data
    
    // Flatten the contribution data
    const contributions: ContributionDay[] = data.weeks.flatMap(week => 
      week.contribution_days.map(day => ({
        date: day.date,
        count: day.count
      }))
    )
    
    const stats = calculateStats(contributions)
    
    // Fetch user profile for avatar and name
    const profileResponse = await axios.get(`https://api.github.com/users/${username}`)
    const profileData = profileResponse.data
    
    return {
      username,
      avatar: profileData.avatar_url || `https://github.com/${username}.png`,
      name: profileData.name || username,
      contributions,
      stats
    }
  } catch (error) {
    console.error(`Error fetching GitHub data for ${username}:`, error)
    throw error
  }
}
