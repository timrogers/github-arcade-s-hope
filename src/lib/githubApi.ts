interface GitHubUserResponse {
  login: string
  avatar_url: string
  name: string | null
}

interface GitHubUserData {
  avatarUrl: string | null
  name: string | null
}

/**
 * Validates a GitHub username
 * GitHub usernames can only contain alphanumeric characters and hyphens,
 * cannot start with a hyphen, and must be 1-39 characters long
 */
function isValidGitHubUsername(username: string): boolean {
  const githubUsernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,38})?$/
  return githubUsernameRegex.test(username)
}

/**
 * Fetches user data from GitHub API
 * @param username - GitHub username
 * @returns User data including avatar URL and name
 */
export async function fetchGitHubUser(username: string): Promise<GitHubUserResponse> {
  if (!isValidGitHubUsername(username)) {
    throw new Error(`Invalid GitHub username format: ${username}`)
  }
  
  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.')
    }
    throw new Error(`Failed to fetch user: ${response.statusText}`)
  }
  
  return response.json()
}

/**
 * Fetches both avatar URL and name for a GitHub user in a single API call
 * @param username - GitHub username
 * @returns Object containing avatar URL and name, or null values if fetch fails
 */
export async function getGitHubUserData(username: string): Promise<GitHubUserData> {
  try {
    const user = await fetchGitHubUser(username)
    return {
      avatarUrl: user.avatar_url,
      name: user.name
    }
  } catch (error) {
    console.error(`Failed to fetch GitHub user data for ${username}:`, error)
    return {
      avatarUrl: null,
      name: null
    }
  }
}

/**
 * Gets the avatar URL for a GitHub user
 * @param username - GitHub username
 * @returns Avatar URL from GitHub, or null if fetch fails
 */
export async function getGitHubAvatar(username: string): Promise<string | null> {
  const data = await getGitHubUserData(username)
  return data.avatarUrl
}

/**
 * Gets the real name for a GitHub user
 * @param username - GitHub username
 * @returns Real name from GitHub, or null if not available or fetch fails
 */
export async function getGitHubName(username: string): Promise<string | null> {
  const data = await getGitHubUserData(username)
  return data.name
}
