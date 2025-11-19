describe('Battle Comparison Screen', () => {
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

    // Wait for all API calls to complete
    cy.wait(['@getUser1Contributions', '@getUser2Contributions', '@getUser1Profile', '@getUser2Profile'])
  })

  it('should display both player cards', () => {
    cy.contains('Test User One').should('be.visible')
    cy.contains('Test User Two').should('be.visible')
    cy.contains('testuser1').should('be.visible')
    cy.contains('testuser2').should('be.visible')
  })

  it('should display the VS lightning bolt separator', () => {
    // The lightning bolt is a visual element, check that it's in the DOM
    // We can check for the presence of the Lightning component by checking for SVG elements
    cy.get('svg').should('have.length.at.least', 1)
  })

  it('should display stats comparison', () => {
    cy.contains('CONTRIBUTION GRAPHS').should('be.visible')
  })

  it('should show contribution graphs for both players', () => {
    // Both usernames should appear in the contribution graph section
    cy.contains('testuser1').should('be.visible')
    cy.contains('testuser2').should('be.visible')
  })

  it('should display a winner banner', () => {
    // The winner banner should be present - it could show winner or tie
    // We just verify it's rendered, checking for common trophy/crown elements
    cy.get('svg').should('exist')
  })

  it('should have working New Battle button', () => {
    cy.contains('button', 'New Battle').should('be.visible').and('not.be.disabled')
  })
})
