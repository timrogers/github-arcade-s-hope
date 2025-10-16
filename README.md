# ✨ Welcome to Your Spark Template!
You've just launched your brand-new Spark Template Codespace — everything’s fired up and ready for you to explore, build, and create with Spark!

This template is your blank canvas. It comes with a minimal setup to help you get started quickly with Spark development.

🚀 What's Inside?
- A clean, minimal Spark environment
- Pre-configured for local development
- Ready to scale with your ideas
- GitHub API integration for real user avatars
  
🧠 What Can You Do?

Right now, this is just a starting point — the perfect place to begin building and testing your Spark applications.

## Configuration

### GitHub API Token (Optional)

The application fetches real user avatars from the GitHub API. Without authentication, you're limited to 60 requests per hour. To increase this to 5,000 requests per hour:

1. Generate a personal access token at https://github.com/settings/tokens (no scopes required for public data)
2. Create a `.env` file based on `.env.example`
3. Add your token: `VITE_GITHUB_TOKEN=your_token_here`

The app will gracefully fall back to placeholder avatars if the API is unavailable or rate limits are exceeded.

🧹 Just Exploring?
No problem! If you were just checking things out and don’t need to keep this code:

- Simply delete your Spark.
- Everything will be cleaned up — no traces left behind.

📄 License For Spark Template Resources 

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
