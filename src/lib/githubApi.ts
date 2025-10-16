import { Octokit } from 'octokit'

// Using anonymous authentication for simplicity.
// GitHub API rate limit: 60 requests/hour for unauthenticated requests.
// For production, consider adding a personal access token to increase limit to 5,000/hour.
const octokit = new Octokit()

export interface GitHubUserData {
  username: string
  avatar: string
  name: string
}

export async function fetchGitHubUser(username: string): Promise<GitHubUserData | null> {
  try {
    const response = await octokit.rest.users.getByUsername({
      username
    })
    
    return {
      username: response.data.login,
      avatar: response.data.avatar_url,
      name: response.data.name || response.data.login
    }
  } catch (error) {
    console.error(`Failed to fetch GitHub user ${username}:`, error)
    return null
  }
}
