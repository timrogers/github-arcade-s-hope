export interface ContributionDay {
  date: string
  count: number
}

export interface GitHubStats {
  totalContributions: number
  longestStreak: number
  currentStreak: number
  bestDay: {
    date: string
    count: number
  }
}

export interface GitHubUser {
  username: string
  avatar: string
  name: string
  contributions: ContributionDay[]
  stats: GitHubStats
}
