import { Octokit } from 'octokit'

const octokit = new Octokit()

export interface GitHubUserData {
  username: string
  avatar: string
  name: string
}

export async function fetchGitHubUser(username: string): Promise<GitHubUserData> {
  try {
    const { data } = await octokit.rest.users.getByUsername({
      username,
    })

    return {
      username: data.login,
      avatar: data.avatar_url,
      name: data.name || data.login,
    }
  } catch (error) {
    console.error(`Failed to fetch GitHub user ${username}:`, error)
    // Fallback to placeholder if API fails
    return {
      username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      name: username.charAt(0).toUpperCase() + username.slice(1),
    }
  }
}
