describe('Complete User Journey', () => {
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

    cy.visit('/')
  })

  it('should complete a full battle from start to reset', () => {
    // Step 1: Verify initial state
    cy.contains('GITHUB BATTLE ARENA').should('be.visible')
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    
    // Step 2: Enter usernames
    cy.get('input[placeholder="Enter username"]').first().type('testuser1')
    cy.get('input[placeholder="Enter username"]').last().type('testuser2')
    
    // Step 3: Verify button is enabled
    cy.contains('button', 'START BATTLE').should('not.be.disabled')
    
    // Step 4: Start battle
    cy.contains('button', 'START BATTLE').click()
    
    // Step 5: Wait for all data to load
    cy.wait(['@getUser1Contributions', '@getUser2Contributions', '@getUser1Profile', '@getUser2Profile'])
    
    // Step 6: Verify battle screen components
    cy.contains('Test User One').should('be.visible')
    cy.contains('Test User Two').should('be.visible')
    cy.contains('New Battle').should('be.visible')
    cy.contains('CONTRIBUTION GRAPHS').should('be.visible')
    
    // Step 7: Verify both usernames appear
    cy.contains('testuser1').should('be.visible')
    cy.contains('testuser2').should('be.visible')
    
    // Step 8: Verify VS separator exists (check for svg elements)
    cy.get('svg').should('have.length.at.least', 1)
    
    // Step 9: Reset the battle
    cy.contains('button', 'New Battle').click()
    
    // Step 10: Verify back to initial state
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    cy.get('input[placeholder="Enter username"]').first().should('have.value', '')
    cy.get('input[placeholder="Enter username"]').last().should('have.value', '')
    
    // Step 11: Verify can start a new battle
    cy.contains('button', 'START BATTLE').should('be.disabled')
  })

  it('should handle responsive design elements', () => {
    // Test mobile viewport
    cy.viewport('iphone-x')
    cy.contains('GITHUB BATTLE ARENA').should('be.visible')
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    
    // Enter usernames on mobile
    cy.get('input[placeholder="Enter username"]').first().type('testuser1')
    cy.get('input[placeholder="Enter username"]').last().type('testuser2')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait(['@getUser1Contributions', '@getUser2Contributions', '@getUser1Profile', '@getUser2Profile'])
    
    // Verify components are visible on mobile
    cy.contains('Test User One').should('be.visible')
    cy.contains('Test User Two').should('be.visible')
    
    // Test desktop viewport
    cy.viewport(1280, 720)
    cy.contains('Test User One').should('be.visible')
    cy.contains('Test User Two').should('be.visible')
  })

  it('should maintain state during animations', () => {
    // Enter usernames
    cy.get('input[placeholder="Enter username"]').first().type('testuser1')
    cy.get('input[placeholder="Enter username"]').last().type('testuser2')
    cy.contains('button', 'START BATTLE').click()
    
    // Don't wait for animations, just verify data loads
    cy.wait(['@getUser1Contributions', '@getUser2Contributions'])
    
    // Even during animations, content should be accessible
    cy.contains('Test User One', { timeout: 10000 }).should('exist')
    cy.contains('Test User Two', { timeout: 10000 }).should('exist')
  })
})
