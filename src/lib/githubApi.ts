import { Octokit } from 'octokit'

// Initialize Octokit with optional authentication
// In production, set GITHUB_TOKEN environment variable to avoid rate limits
const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN || undefined,
})

export interface GitHubUserData {
  username: string
  avatar: string
  name: string
}

export async function fetchGitHubUser(username: string): Promise<GitHubUserData | null> {
  // Validate username format
  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    console.error('Invalid username provided')
    return null
  }

  // Basic GitHub username validation
  // Rules: 1-39 characters, alphanumeric + hyphens, must start/end with alphanumeric
  const trimmedUsername = username.trim()
  if (trimmedUsername.length > 39 || !/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(trimmedUsername)) {
    console.error(`Invalid GitHub username format: ${username}`)
    return null
  }

  try {
    const response = await octokit.request('GET /users/{username}', {
      username: trimmedUsername,
    })

    return {
      username: response.data.login,
      avatar: response.data.avatar_url,
      name: response.data.name || response.data.login,
    }
  } catch (error) {
    // Log only essential error information
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error(`Failed to fetch GitHub user ${username}: ${message}`)
    return null
  }
}
