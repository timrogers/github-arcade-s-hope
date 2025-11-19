# E2E Testing with Cypress

This project includes comprehensive end-to-end (E2E) tests using [Cypress](https://www.cypress.io/).

## Test Coverage

The test suite includes **65 comprehensive tests** covering:

### 1. User Selection (`user-selection.cy.ts`)
- Main UI elements display
- Input field validation
- Button states (enabled/disabled)
- User input handling

### 2. Battle Flow (`battle-flow.cy.ts`)
- Starting battles with valid usernames
- Loading states during API calls
- Error handling for failed API requests
- Battle screen component rendering

### 3. Stats Comparison (`stats-comparison.cy.ts`)
- Battle statistics display
- All four stat categories (Total Contributions, Longest Streak, Current Streak, Best Day)
- Stat icons and visual indicators
- Winner highlighting in stats

### 4. Contribution Graphs (`contribution-graphs.cy.ts`)
- Contribution graph visualization
- Dual player graph display
- Heatmap rendering
- Username display on graphs

### 5. Winner Declaration (`winner-declaration.cy.ts`)
- Winner banner display
- Victory celebrations
- Different winner scenarios (player 1, player 2, tie)
- Trophy/victory icons

### 6. Reset Functionality (`reset-functionality.cy.ts`)
- "New Battle" button display
- Reset to selection screen
- Clearing previous battle data
- Starting new battles after reset

### 7. Responsive Design (`responsive-design.cy.ts`)
- Mobile viewport (375x667)
- Tablet viewport (768x1024)
- Desktop viewport (1280x720)
- Layout adaptations for different screen sizes

### 8. Accessibility (`accessibility.cy.ts`)
- Proper heading hierarchy
- Form label accessibility
- Keyboard navigation
- Focus states
- Color contrast
- Semantic HTML

### 9. Visual Elements (`visual-elements.cy.ts`)
- Animated gradient backgrounds
- Icon displays
- Color-coded player elements
- Spacing and layout
- Card styling and shadows

## Running Tests

### Prerequisites
```bash
npm install
```

### Interactive Mode
Open Cypress Test Runner for interactive testing:
```bash
npm run cypress
# or
npm run test:e2e:open
```

### Headless Mode
Run all tests in headless mode (CI/CD):
```bash
npm run cypress:headless
```

### Run with Dev Server
Automatically start dev server and run tests:
```bash
npm run test:e2e
```

## Test Configuration

Tests are configured in `cypress.config.ts`:
- Base URL: `http://localhost:5000`
- Viewport: 1280x720
- Video recording: Disabled
- Screenshots: Enabled on failure

## Directory Structure

```
cypress/
├── e2e/                    # Test specifications
│   ├── accessibility.cy.ts
│   ├── battle-flow.cy.ts
│   ├── contribution-graphs.cy.ts
│   ├── reset-functionality.cy.ts
│   ├── responsive-design.cy.ts
│   ├── stats-comparison.cy.ts
│   ├── user-selection.cy.ts
│   ├── visual-elements.cy.ts
│   └── winner-declaration.cy.ts
├── fixtures/               # Test data
│   └── github-data.json
└── support/               # Support files
    ├── commands.ts
    └── e2e.ts
```

## API Mocking

Tests use Cypress's `cy.intercept()` to mock GitHub API calls:
- Contribution data API
- User profile API

This ensures tests run quickly and reliably without depending on external services.

## Best Practices

1. **Tests are isolated** - Each test sets up its own state
2. **API calls are mocked** - No external dependencies
3. **Responsive testing** - Tests cover multiple viewports
4. **Accessibility focus** - Ensures the app is accessible
5. **Visual validation** - Checks UI elements and styling

## Continuous Integration

Tests can be run in CI/CD pipelines using:
```bash
npm run test:e2e
```

This command will:
1. Start the development server
2. Wait for it to be ready
3. Run all Cypress tests
4. Exit with appropriate status code

## Debugging Failed Tests

When tests fail:
1. Screenshots are automatically captured in `cypress/screenshots/`
2. Run in interactive mode to debug: `npm run cypress`
3. Use `.only()` to run a single test: `it.only('test name', ...)`

## Adding New Tests

1. Create a new `.cy.ts` file in `cypress/e2e/`
2. Follow existing test patterns
3. Use descriptive test names
4. Mock API calls when needed
5. Test both happy paths and edge cases

## Test Results

All 65 tests pass successfully, covering:
- ✅ User interactions
- ✅ API integration
- ✅ Responsive design
- ✅ Accessibility
- ✅ Visual elements
- ✅ Error handling
- ✅ State management
