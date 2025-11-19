# Cypress End-to-End Tests

This directory contains end-to-end tests for the GitHub Arcade Battle Arena application using Cypress.

## Test Coverage

The test suite includes four main test files covering all critical user flows:

### 1. User Selection Flow (`user-selection.cy.ts`)
Tests the initial user selection screen and input validation:
- ✅ Display of the initial selection screen
- ✅ Submit button disabled state when inputs are empty
- ✅ Submit button enabled when both usernames are entered
- ✅ Submit button remains disabled with only one username
- ✅ Successfully starting a battle with valid usernames
- ✅ Loading state while fetching data
- ✅ Graceful error handling for invalid users

### 2. Battle Comparison Screen (`battle-comparison.cy.ts`)
Tests the battle comparison view after users are selected:
- ✅ Display of both player cards
- ✅ VS lightning bolt separator visibility
- ✅ Stats comparison display
- ✅ Contribution graphs for both players
- ✅ Winner banner display
- ✅ New Battle button functionality

### 3. Reset Functionality (`reset-functionality.cy.ts`)
Tests the ability to reset and start a new battle:
- ✅ Return to selection screen when New Battle is clicked
- ✅ Input fields are cleared after reset
- ✅ Starting a new battle after reset
- ✅ Error messages are cleared on reset

### 4. Complete User Journey (`complete-user-journey.cy.ts`)
Tests the full end-to-end user experience:
- ✅ Complete battle flow from start to reset
- ✅ Responsive design across different viewports
- ✅ State maintenance during animations

## Running the Tests

### Prerequisites
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server in one terminal:
   ```bash
   npm run dev
   ```

### Running Tests

**Headless Mode (CI/CD):**
```bash
npm run test:e2e
# or
npm run cypress:run
```

**Interactive Mode (Development):**
```bash
npm run test:e2e:open
# or
npm run cypress:open
```

The interactive mode opens the Cypress Test Runner, allowing you to:
- Select and run specific test files
- See tests execute in a real browser
- Debug failed tests
- Inspect DOM snapshots at each step

## Test Structure

```
cypress/
├── e2e/                             # Test files
│   ├── battle-comparison.cy.ts      # Battle screen tests
│   ├── complete-user-journey.cy.ts  # Full user journey tests
│   ├── reset-functionality.cy.ts    # Reset functionality tests
│   └── user-selection.cy.ts         # User selection tests
├── fixtures/                        # Mock data
│   ├── user1-contributions.json     # Mock contribution data for user 1
│   ├── user1-profile.json        # Mock profile data for user 1
│   ├── user2-contributions.json  # Mock contribution data for user 2
│   └── user2-profile.json        # Mock profile data for user 2
└── support/                      # Support files
    ├── commands.ts               # Custom Cypress commands
    └── e2e.ts                    # Test configuration
```

## API Mocking

The tests use Cypress intercepts to mock GitHub API calls, ensuring:
- Tests run quickly without network dependencies
- Consistent test data across runs
- No rate limiting issues
- Ability to test error scenarios

Mock data is stored in `cypress/fixtures/` and includes:
- User contribution data (weekly contribution counts)
- User profile information (name, avatar)

## Configuration

Cypress configuration is in `cypress.config.ts`:
- Base URL: `http://localhost:5000`
- Spec pattern: `cypress/e2e/**/*.cy.{js,jsx,ts,tsx}`
- Support file: `cypress/support/e2e.ts`
- Video recording: Disabled (can be enabled for debugging)
- Screenshot on failure: Enabled
- Viewport: 1280x720

## Adding New Tests

1. Create a new test file in `cypress/e2e/` with the pattern `*.cy.ts`
2. Add any required fixtures to `cypress/fixtures/`
3. Follow the existing test structure and naming conventions
4. Use descriptive test names that explain what is being tested
5. Include proper setup in `beforeEach()` hooks
6. Mock API calls using `cy.intercept()`

## Best Practices

- **Isolation**: Each test should be independent and not rely on other tests
- **Fixtures**: Use fixtures for consistent mock data
- **Selectors**: Use semantic selectors (text content) when possible
- **Waiting**: Use `cy.wait()` for API intercepts, not arbitrary timeouts
- **Assertions**: Be explicit about what you're testing
- **Cleanup**: Reset state in `beforeEach()` hooks

## Troubleshooting

**Tests failing locally?**
1. Ensure the dev server is running on port 5000
2. Check that all dependencies are installed
3. Clear Cypress cache: `npx cypress cache clear`
4. Verify browser compatibility: `npx cypress verify`

**Flaky tests?**
1. Check for race conditions in the application
2. Ensure proper wait for API calls
3. Review Cypress retry-ability settings
4. Use `cy.wait()` for network requests

## CI/CD Integration

The tests are designed to run in CI/CD pipelines:
```bash
# Example CI script
npm ci
npm run build
npm run dev &  # Start server in background
npm run test:e2e
```

Remember to:
- Set appropriate timeouts for CI environments
- Save test artifacts (screenshots, videos) on failure
- Use `--headless` mode for faster execution
