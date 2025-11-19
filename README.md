# GitHub Battle Arena

An arcade-styled battle arena where two GitHub users face off by comparing their contribution graphs in a visually exciting, game-like interface.

## 🚀 What's Inside?
- A clean, minimal Spark environment
- Pre-configured for local development
- Ready to scale with your ideas
- **Comprehensive Cypress integration tests**

## 🎮 Features

- **User Selection**: Input fields for two GitHub usernames with avatars and profile info
- **Contribution Visualization**: Side-by-side heatmap-style contribution calendars
- **Stats Comparison**: Key metrics comparison (total contributions, longest streak, current streak)
- **Winner Declaration**: Algorithm determines overall winner with celebratory animations
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🧪 Testing with Cypress

This project includes comprehensive end-to-end (E2E) tests using Cypress to ensure all features work correctly.

### Test Coverage

The test suite covers:

1. **User Selection Flow** (`user-selection.cy.ts`)
   - Initial screen display
   - Input field validation
   - Button state management
   - Loading states

2. **Battle Display** (`battle-display.cy.ts`)
   - Player cards rendering
   - VS divider display
   - Contribution graphs
   - Responsive layouts

3. **Stats & Winner** (`stats-and-winner.cy.ts`)
   - Statistics calculation and display
   - Winner determination logic
   - Tie scenarios

4. **Reset Functionality** (`reset-functionality.cy.ts`)
   - New battle flow
   - State clearing
   - Error reset

5. **Error Handling** (`error-handling.cy.ts`)
   - API failure scenarios
   - Network timeouts
   - Invalid responses
   - Retry mechanisms

6. **Responsive Design** (`responsive-design.cy.ts`)
   - Desktop layout (1280x720)
   - Tablet layout (768x1024)
   - Mobile layout (375x667)
   - Viewport transitions

### Running Tests

#### Open Cypress Test Runner (Interactive)
```bash
npm run cypress
# or with dev server
npm run test:e2e:ui
```

#### Run Tests in Headless Mode (CI)
```bash
npm run cypress:headless
# or with dev server
npm run test:e2e
```

#### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/user-selection.cy.ts"
```

#### Run Tests in Specific Browser
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

### Custom Cypress Commands

The project includes custom Cypress commands to simplify testing:

- `cy.startBattle(username1, username2)` - Enter usernames and start a battle
- `cy.waitForBattle()` - Wait for the battle screen to load

Example usage:
```javascript
cy.startBattle('octocat', 'torvalds')
cy.waitForBattle()
cy.contains('Test User One').should('be.visible')
```

### Test Fixtures

Mock API response data is available in `cypress/fixtures/`:
- `contributions-player1.json` - Sample contribution data for player 1
- `contributions-player2.json` - Sample contribution data for player 2
- `user-profile1.json` - Sample GitHub user profile for player 1
- `user-profile2.json` - Sample GitHub user profile for player 2

### CI/CD Integration

Tests automatically run on every push and pull request via GitHub Actions. See `.github/workflows/cypress-tests.yml` for configuration.

The workflow:
1. Checks out the code
2. Installs dependencies
3. Builds the application
4. Runs Cypress tests
5. Uploads screenshots (on failure) and videos (always) as artifacts

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🧹 Just Exploring?
No problem! If you were just checking things out and don't need to keep this code:

- Simply delete your Spark.
- Everything will be cleaned up — no traces left behind.

## 📄 License For Spark Template Resources 

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
