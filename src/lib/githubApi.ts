import { Octokit } from 'octokit'

const octokit = new Octokit()

export interface GitHubUserData {
  username: string
  avatar: string
  name: string
}

export async function fetchGitHubUser(username: string): Promise<GitHubUserData | null> {
  try {
    const response = await octokit.request('GET /users/{username}', {
      username,
    })

    return {
      username: response.data.login,
      avatar: response.data.avatar_url,
      name: response.data.name || response.data.login,
    }
  } catch (error) {
    console.error(`Failed to fetch GitHub user ${username}:`, error)
    return null
  }
}
