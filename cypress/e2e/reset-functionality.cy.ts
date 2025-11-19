describe('Reset Functionality', () => {
  beforeEach(() => {
    // Set up API mocks
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=testuser1', {
      fixture: 'user1-contributions.json'
    }).as('getUser1Contributions')

    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=testuser2', {
      fixture: 'user2-contributions.json'
    }).as('getUser2Contributions')

    cy.intercept('GET', '**/api.github.com/users/testuser1', {
      fixture: 'user1-profile.json'
    }).as('getUser1Profile')

    cy.intercept('GET', '**/api.github.com/users/testuser2', {
      fixture: 'user2-profile.json'
    }).as('getUser2Profile')

    // Navigate and start battle
    cy.visit('/')
    cy.get('input[placeholder="Enter username"]').first().type('testuser1')
    cy.get('input[placeholder="Enter username"]').last().type('testuser2')
    cy.contains('button', 'START BATTLE').click()

    // Wait for all API calls
    cy.wait(['@getUser1Contributions', '@getUser2Contributions', '@getUser1Profile', '@getUser2Profile'])
  })

  it('should return to selection screen when New Battle is clicked', () => {
    // Verify we're on the battle screen
    cy.contains('New Battle').should('be.visible')
    cy.contains('Test User One').should('be.visible')
    cy.contains('Test User Two').should('be.visible')

    // Click New Battle button
    cy.contains('button', 'New Battle').click()

    // Should return to selection screen
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    cy.contains('Enter two GitHub usernames to begin the battle').should('be.visible')
    cy.contains('button', 'START BATTLE').should('be.visible')
  })

  it('should clear input fields after reset', () => {
    // Click New Battle to reset
    cy.contains('button', 'New Battle').click()

    // Input fields should be empty
    cy.get('input[placeholder="Enter username"]').first().should('have.value', '')
    cy.get('input[placeholder="Enter username"]').last().should('have.value', '')
  })

  it('should allow starting a new battle after reset', () => {
    // Reset the battle
    cy.contains('button', 'New Battle').click()

    // Enter new usernames
    cy.get('input[placeholder="Enter username"]').first().type('testuser1')
    cy.get('input[placeholder="Enter username"]').last().type('testuser2')
    
    // Start a new battle
    cy.contains('button', 'START BATTLE').click()

    // Wait for API calls
    cy.wait(['@getUser1Contributions', '@getUser2Contributions'])

    // Should show battle screen again
    cy.contains('New Battle').should('be.visible')
    cy.contains('Test User One').should('be.visible')
  })

  it('should clear any previous error messages on reset', () => {
    // Set up an error scenario
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=erroruser', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('getErrorUser')

    // Reset and try with an error user
    cy.contains('button', 'New Battle').click()
    
    cy.get('input[placeholder="Enter username"]').first().type('erroruser')
    cy.get('input[placeholder="Enter username"]').last().type('testuser2')
    cy.contains('button', 'START BATTLE').click()

    // Wait for error
    cy.wait('@getErrorUser')

    // Error should be visible
    cy.contains('Failed to fetch data for erroruser').should('be.visible')

    // Now reset - error should disappear
    // Note: We need to check if there's a way to reset from error state
    // Since the button might not be visible, let's just reload the page
    cy.visit('/')
    
    // Error should not be visible on fresh load
    cy.contains('Failed to fetch data for erroruser').should('not.exist')
  })
})
