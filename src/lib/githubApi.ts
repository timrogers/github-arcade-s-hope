interface GitHubUserResponse {
  login: string
  avatar_url: string
  name: string | null
}

/**
 * Fetches user data from GitHub API
 * @param username - GitHub username
 * @returns User data including avatar URL and name
 */
export async function fetchGitHubUser(username: string): Promise<GitHubUserResponse> {
  const response = await fetch(`https://api.github.com/users/${username}`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`)
  }
  
  return response.json()
}

/**
 * Gets the avatar URL for a GitHub user
 * @param username - GitHub username
 * @returns Avatar URL from GitHub, or null if fetch fails
 */
export async function getGitHubAvatar(username: string): Promise<string | null> {
  try {
    const user = await fetchGitHubUser(username)
    return user.avatar_url
  } catch (error) {
    console.error(`Failed to fetch GitHub avatar for ${username}:`, error)
    return null
  }
}

/**
 * Gets the real name for a GitHub user
 * @param username - GitHub username
 * @returns Real name from GitHub, or null if not available or fetch fails
 */
export async function getGitHubName(username: string): Promise<string | null> {
  try {
    const user = await fetchGitHubUser(username)
    return user.name
  } catch (error) {
    console.error(`Failed to fetch GitHub name for ${username}:`, error)
    return null
  }
}
