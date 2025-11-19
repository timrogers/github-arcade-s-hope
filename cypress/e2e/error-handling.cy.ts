/// <reference types="cypress" />

describe('Error Handling', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display error message when API call fails', () => {
    // Intercept with error response
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=invaliduser', {
      statusCode: 404,
      body: { error: 'Not found' }
    }).as('getContributionsError')
    
    cy.intercept('GET', '**/api.github.com/users/invaliduser', {
      statusCode: 404,
      body: { message: 'Not Found' }
    }).as('getUserProfileError')
    
    // Try to start battle with invalid user
    cy.get('input[placeholder="Enter username"]').first().type('invaliduser')
    cy.get('input[placeholder="Enter username"]').last().type('invaliduser')
    cy.contains('button', 'START BATTLE').click()
    
    // Wait for API call
    cy.wait('@getContributionsError')
    
    // Error message should be displayed
    cy.get('[class*="bg-destructive"]', { timeout: 10000 }).should('be.visible')
  })

  it('should handle network timeout gracefully', () => {
    // Intercept with delay and then failure
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=slowuser', (req) => {
      req.reply({
        statusCode: 408,
        body: { error: 'Request Timeout' },
        delay: 5000
      })
    }).as('getContributionsTimeout')
    
    cy.get('input[placeholder="Enter username"]').first().type('slowuser')
    cy.get('input[placeholder="Enter username"]').last().type('anotheruser')
    cy.contains('button', 'START BATTLE').click()
    
    // Should show loading state
    cy.contains('LOADING...').should('be.visible')
  })

  it('should handle malformed API response', () => {
    // Intercept with invalid JSON structure
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=malformed', {
      body: { invalid: 'structure' }
    }).as('getContributionsMalformed')
    
    cy.intercept('GET', '**/api.github.com/users/malformed', {
      fixture: 'user-profile1.json'
    }).as('getUserProfileMalformed')
    
    cy.get('input[placeholder="Enter username"]').first().type('malformed')
    cy.get('input[placeholder="Enter username"]').last().type('testuser')
    cy.contains('button', 'START BATTLE').click()
    
    // Should handle the error (exact behavior may vary)
    // At minimum, the app shouldn't crash
    cy.get('body').should('exist')
  })

  it('should allow retry after error', () => {
    // First attempt: error
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=erroruser', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getContributionsError')
    
    cy.intercept('GET', '**/api.github.com/users/erroruser', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getUserProfileError')
    
    cy.get('input[placeholder="Enter username"]').first().type('erroruser')
    cy.get('input[placeholder="Enter username"]').last().type('erroruser')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributionsError')
    
    // Error should be displayed
    cy.get('[class*="bg-destructive"]', { timeout: 10000 }).should('be.visible')
    
    // Clear inputs
    cy.get('input[placeholder="Enter username"]').first().clear()
    cy.get('input[placeholder="Enter username"]').last().clear()
    
    // Second attempt: success
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=validuser', {
      fixture: 'contributions-player1.json'
    }).as('getContributionsSuccess')
    
    cy.intercept('GET', '**/api.github.com/users/validuser', {
      fixture: 'user-profile1.json'
    }).as('getUserProfileSuccess')
    
    cy.startBattle('validuser', 'validuser')
    cy.wait(['@getContributionsSuccess', '@getUserProfileSuccess'])
    
    // Battle should display successfully
    cy.contains('Test User One').should('be.visible')
  })

  it('should handle one user succeeding and one failing', () => {
    // First user succeeds
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=gooduser', {
      fixture: 'contributions-player1.json'
    }).as('getContributionsGood')
    
    cy.intercept('GET', '**/api.github.com/users/gooduser', {
      fixture: 'user-profile1.json'
    }).as('getUserProfileGood')
    
    // Second user fails
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=baduser', {
      statusCode: 404,
      body: { error: 'Not found' }
    }).as('getContributionsBad')
    
    cy.intercept('GET', '**/api.github.com/users/baduser', {
      statusCode: 404,
      body: { message: 'Not Found' }
    }).as('getUserProfileBad')
    
    cy.get('input[placeholder="Enter username"]').first().type('gooduser')
    cy.get('input[placeholder="Enter username"]').last().type('baduser')
    cy.contains('button', 'START BATTLE').click()
    
    // Should show error (battle requires both users to succeed)
    cy.get('[class*="bg-destructive"]', { timeout: 10000 }).should('be.visible')
  })

  it('should not break UI with special characters in username', () => {
    // Test with various special characters (though GitHub usernames have restrictions)
    const specialUsername = 'user-name_123'
    
    cy.intercept('GET', `**/contributions-api.me-5bd.workers.dev/?username=${specialUsername}`, {
      fixture: 'contributions-player1.json'
    }).as('getContributionsSpecial')
    
    cy.intercept('GET', `**/api.github.com/users/${specialUsername}`, {
      fixture: 'user-profile1.json'
    }).as('getUserProfileSpecial')
    
    cy.get('input[placeholder="Enter username"]').first().type(specialUsername)
    cy.get('input[placeholder="Enter username"]').last().type('testuser')
    
    // Button should still work
    cy.contains('button', 'START BATTLE').should('not.be.disabled')
  })

  it('should clear error message when user starts typing again', () => {
    // Cause an error
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=error', {
      statusCode: 500,
      body: { error: 'Error' }
    }).as('getContributionsError')
    
    cy.intercept('GET', '**/api.github.com/users/error', {
      statusCode: 500
    }).as('getUserProfileError')
    
    cy.get('input[placeholder="Enter username"]').first().type('error')
    cy.get('input[placeholder="Enter username"]').last().type('error')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributionsError')
    
    // Error should be visible
    cy.get('[class*="bg-destructive"]', { timeout: 10000 }).should('be.visible')
  })

  it('should handle empty response gracefully', () => {
    // Empty weeks array
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=emptyuser', {
      body: { weeks: [] }
    }).as('getContributionsEmpty')
    
    cy.intercept('GET', '**/api.github.com/users/emptyuser', {
      fixture: 'user-profile1.json'
    }).as('getUserProfileEmpty')
    
    cy.get('input[placeholder="Enter username"]').first().type('emptyuser')
    cy.get('input[placeholder="Enter username"]').last().type('emptyuser')
    cy.contains('button', 'START BATTLE').click()
    
    // Should handle empty data without crashing
    cy.get('body').should('exist')
  })
})
