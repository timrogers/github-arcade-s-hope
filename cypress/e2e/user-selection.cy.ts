describe('User Selection Flow', () => {
  beforeEach(() => {
    // Intercept API calls for contributions data
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=testuser1', {
      fixture: 'user1-contributions.json'
    }).as('getUser1Contributions')

    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=testuser2', {
      fixture: 'user2-contributions.json'
    }).as('getUser2Contributions')

    // Intercept GitHub API calls for user profiles
    cy.intercept('GET', '**/api.github.com/users/testuser1', {
      fixture: 'user1-profile.json'
    }).as('getUser1Profile')

    cy.intercept('GET', '**/api.github.com/users/testuser2', {
      fixture: 'user2-profile.json'
    }).as('getUser2Profile')

    cy.visit('/')
  })

  it('should display the initial selection screen', () => {
    // Check for main title
    cy.contains('GITHUB BATTLE ARENA').should('be.visible')
    cy.contains('Face off in the ultimate contribution showdown').should('be.visible')

    // Check for selection card
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    cy.contains('Enter two GitHub usernames to begin the battle').should('be.visible')

    // Check for input fields
    cy.contains('Player 1').should('be.visible')
    cy.contains('Player 2').should('be.visible')

    // Check for start button
    cy.contains('START BATTLE').should('be.visible')
  })

  it('should have disabled submit button when inputs are empty', () => {
    cy.contains('button', 'START BATTLE').should('be.disabled')
  })

  it('should enable submit button when both usernames are entered', () => {
    cy.get('input[placeholder="Enter username"]').first().type('testuser1')
    cy.get('input[placeholder="Enter username"]').last().type('testuser2')
    
    cy.contains('button', 'START BATTLE').should('not.be.disabled')
  })

  it('should remain disabled with only one username', () => {
    cy.get('input[placeholder="Enter username"]').first().type('testuser1')
    cy.contains('button', 'START BATTLE').should('be.disabled')
  })

  it('should successfully start a battle with valid usernames', () => {
    // Enter usernames
    cy.get('input[placeholder="Enter username"]').first().type('testuser1')
    cy.get('input[placeholder="Enter username"]').last().type('testuser2')
    
    // Click start battle button
    cy.contains('button', 'START BATTLE').click()

    // Wait for API calls
    cy.wait('@getUser1Contributions')
    cy.wait('@getUser2Contributions')
    cy.wait('@getUser1Profile')
    cy.wait('@getUser2Profile')

    // Verify battle screen is displayed
    cy.contains('New Battle').should('be.visible')
    cy.contains('Test User One').should('be.visible')
    cy.contains('Test User Two').should('be.visible')
  })

  it('should show loading state while fetching data', () => {
    // Enter usernames
    cy.get('input[placeholder="Enter username"]').first().type('testuser1')
    cy.get('input[placeholder="Enter username"]').last().type('testuser2')
    
    // Click start battle button
    cy.contains('button', 'START BATTLE').click()

    // Check for loading state
    cy.contains('LOADING...').should('be.visible')
  })

  it('should handle API errors gracefully', () => {
    // Intercept with error
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=invaliduser', {
      statusCode: 404,
      body: { error: 'User not found' }
    }).as('getUserError')

    cy.get('input[placeholder="Enter username"]').first().type('invaliduser')
    cy.get('input[placeholder="Enter username"]').last().type('testuser2')
    
    cy.contains('button', 'START BATTLE').click()

    // Wait for the error response
    cy.wait('@getUserError')

    // Should show error message
    cy.contains('Failed to fetch data for invaliduser').should('be.visible')
  })
})
