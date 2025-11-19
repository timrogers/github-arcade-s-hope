# Cypress Testing Guide

This document provides detailed information about the Cypress integration tests for the GitHub Battle Arena application.

## Overview

The test suite includes **53 comprehensive end-to-end tests** across 6 test files, covering all major features and edge cases of the application.

## Test Organization

### 1. User Selection Flow (`user-selection.cy.ts`) - 7 tests
Tests the initial user selection screen and input validation.

**Test Cases:**
- ✅ Display of initial selection screen
- ✅ Button enable/disable logic based on input
- ✅ Empty string validation
- ✅ Loading state during API calls
- ✅ Input field focus states
- ✅ Player-specific color styling

### 2. Battle Display (`battle-display.cy.ts`) - 10 tests
Tests the battle visualization screen after users are selected.

**Test Cases:**
- ✅ Player card rendering with avatars and names
- ✅ VS divider with lightning icon animation
- ✅ New Battle button functionality
- ✅ Contribution graphs display
- ✅ Stats comparison panel
- ✅ Desktop responsive layout
- ✅ Mobile responsive layout
- ✅ Avatar image loading
- ✅ Animation presence
- ✅ Contribution graph grids

### 3. Stats & Winner (`stats-and-winner.cy.ts`) - 6 tests
Tests statistics calculation and winner declaration logic.

**Test Cases:**
- ✅ Display of all key statistics (Total Contributions, Longest Streak, Current Streak)
- ✅ Numerical values for statistics
- ✅ Stats comparison between both players
- ✅ Winner banner display
- ✅ Trophy icon for winner
- ✅ Tie scenario handling

### 4. Reset Functionality (`reset-functionality.cy.ts`) - 4 tests
Tests the ability to reset the battle and start a new one.

**Test Cases:**
- ✅ Reset returns to selection screen
- ✅ Starting new battle after reset
- ✅ Error clearing on reset
- ✅ Animation preservation during reset

### 5. Error Handling (`error-handling.cy.ts`) - 8 tests
Tests various error scenarios and recovery mechanisms.

**Test Cases:**
- ✅ API failure error messages
- ✅ Network timeout handling
- ✅ Malformed API response handling
- ✅ Retry after error
- ✅ Partial success scenarios (one user fails)
- ✅ Special characters in usernames
- ✅ Error message clearing on new input
- ✅ Empty response handling

### 6. Responsive Design (`responsive-design.cy.ts`) - 18 tests
Tests the application across different screen sizes and devices.

**Test Cases:**
- ✅ Desktop layout (1280x720)
  - Initial display
  - Side-by-side player inputs
  - Battle view layout
- ✅ Tablet layout (768x1024)
  - Initial display
  - Selection screen layout
  - Battle view adaptation
- ✅ Mobile layout (375x667)
  - Initial display
  - Vertical stacking of inputs
  - Full-width buttons
  - Scrollable battle view
  - Readable contribution graphs
  - Readable stats
- ✅ Viewport transitions
  - Desktop to mobile
  - Mobile to desktop
- ✅ Very small screens (320x568)
- ✅ Very large screens (1920x1080)
- ✅ Touch interactions
  - Touch-friendly tap targets (44px minimum)
  - Input focus on mobile

## Custom Commands

The test suite includes two custom Cypress commands for simplified testing:

### `cy.startBattle(username1, username2)`
Automates the process of entering usernames and starting a battle.

```javascript
cy.startBattle('octocat', 'torvalds')
```

**What it does:**
1. Enters `username1` in the first input field
2. Enters `username2` in the second input field
3. Clicks the "START BATTLE" button

### `cy.waitForBattle()`
Waits for the battle screen to fully load.

```javascript
cy.waitForBattle()
```

**What it does:**
1. Waits for player cards to appear (timeout: 10 seconds)
2. Verifies exactly 2 player cards are rendered

## Test Fixtures

Mock API data is provided in `cypress/fixtures/`:

- **contributions-player1.json**: Sample GitHub contribution data with 14 days of activity
- **contributions-player2.json**: Similar data with different values
- **user-profile1.json**: GitHub user profile for "testuser1"
- **user-profile2.json**: GitHub user profile for "testuser2"

## Running Tests

### Interactive Mode (Cypress Test Runner)
```bash
# Open Cypress UI without dev server
npm run cypress

# Open Cypress UI with dev server
npm run test:e2e:ui
```

### Headless Mode (CI/Command Line)
```bash
# Run tests headlessly without dev server
npm run cypress:headless

# Run tests headlessly with dev server
npm run test:e2e
```

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/user-selection.cy.ts"
```

### Run Tests in Different Browsers
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
npx cypress run --browser electron
```

## CI/CD Integration

Tests run automatically on every push and pull request via GitHub Actions.

**Workflow file:** `.github/workflows/cypress-tests.yml`

**Steps:**
1. Checkout code
2. Setup Node.js 20
3. Install dependencies with `npm ci`
4. Build application
5. Run Cypress tests against dev server
6. Upload screenshots (on failure only)
7. Upload videos (always)

**Artifacts:**
- Screenshots are saved when tests fail
- Videos are recorded for all test runs
- Both are available as GitHub Actions artifacts

## Test Coverage Summary

| Category | Tests | Passing | Coverage |
|----------|-------|---------|----------|
| User Selection | 7 | 7 | 100% |
| Battle Display | 10 | 10 | 100% |
| Stats & Winner | 6 | 6 | 100% |
| Reset Functionality | 4 | 4 | 100% |
| Error Handling | 8 | 8 | 100% |
| Responsive Design | 18 | 18 | 100% |
| **Total** | **53** | **53** | **100%** |

## Best Practices Used

1. **API Mocking**: All external API calls are intercepted and mocked with fixtures
2. **Isolation**: Each test is independent and can run in any order
3. **Cleanup**: Tests clean up after themselves by resetting state
4. **Assertions**: Multiple assertions per test to thoroughly validate behavior
5. **Wait Strategies**: Using `cy.wait()` for API calls and `should('be.visible')` for elements
6. **Custom Commands**: Reusable commands to reduce code duplication
7. **Viewport Testing**: Tests across multiple device sizes
8. **Error Scenarios**: Comprehensive error handling coverage

## Debugging Tips

### View Videos
After running tests, videos are saved in `cypress/videos/`. Open them to see the full test execution.

### View Screenshots
When tests fail, screenshots are saved in `cypress/screenshots/` showing the exact state when the failure occurred.

### Interactive Debugging
Use `npm run cypress` to open the Cypress Test Runner for step-by-step debugging with time travel.

### Browser Console
Cypress shows browser console logs in the test runner, making it easy to debug application issues.

## Maintenance

### Adding New Tests
1. Create a new file in `cypress/e2e/` with `.cy.ts` extension
2. Import necessary types: `/// <reference types="cypress" />`
3. Write tests using `describe` and `it` blocks
4. Use custom commands and fixtures where appropriate

### Updating Fixtures
Edit JSON files in `cypress/fixtures/` to match API changes or test different scenarios.

### Updating Commands
Edit `cypress/support/commands.ts` to add or modify custom commands.

## Known Limitations

1. Tests require the dev server to be running on port 5000
2. Some animations may cause timing issues - use appropriate waits
3. Network interception doesn't work for WebSocket connections
4. Component tests are configured but not yet implemented

## Future Enhancements

- [ ] Add component tests for individual React components
- [ ] Add visual regression testing with Percy or Applitools
- [ ] Add performance testing with Lighthouse
- [ ] Add accessibility testing with axe-core
- [ ] Increase test coverage for edge cases
- [ ] Add API contract testing
