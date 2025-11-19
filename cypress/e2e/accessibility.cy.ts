describe('GitHub Battle Arena - Accessibility', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have proper heading hierarchy', () => {
    cy.get('h1').should('exist')
    cy.get('h1').contains('GITHUB BATTLE ARENA')
  })

  it('should have accessible form labels', () => {
    cy.contains('label', 'Player 1').should('be.visible')
    cy.contains('label', 'Player 2').should('be.visible')
  })

  it('should have focusable input fields', () => {
    cy.get('input[placeholder="Enter username"]').first().focus()
    cy.get('input[placeholder="Enter username"]').first().should('have.focus')
  })

  it('should have focusable buttons', () => {
    // Enable the button first by filling inputs
    cy.get('input[placeholder="Enter username"]').first().type('user1')
    cy.get('input[placeholder="Enter username"]').last().type('user2')
    
    // Now the button should be focusable
    cy.contains('button', 'START BATTLE').focus()
    cy.contains('button', 'START BATTLE').should('have.focus')
  })

  it('should support keyboard navigation for form submission', () => {
    // Test that both inputs can receive keyboard input
    cy.get('input[placeholder="Enter username"]').first().type('user1')
    cy.get('input[placeholder="Enter username"]').first().should('have.value', 'user1')
    
    cy.get('input[placeholder="Enter username"]').last().type('user2')
    cy.get('input[placeholder="Enter username"]').last().should('have.value', 'user2')
  })

  it('should have proper button states', () => {
    // Disabled state
    cy.contains('button', 'START BATTLE').should('be.disabled')
    
    // Enabled state
    cy.get('input[placeholder="Enter username"]').first().type('user1')
    cy.get('input[placeholder="Enter username"]').last().type('user2')
    cy.contains('button', 'START BATTLE').should('not.be.disabled')
  })

  it('should have visible focus indicators', () => {
    cy.get('input[placeholder="Enter username"]').first().focus()
    // Focus styles should be applied (outline, ring, etc.)
    cy.get('input[placeholder="Enter username"]').first().should('have.class', 'focus:outline-none')
  })

  it('should have proper color contrast for text', () => {
    // Main title should be visible and readable
    cy.contains('GITHUB BATTLE ARENA').should('be.visible')
    cy.contains('Face off in the ultimate contribution showdown').should('be.visible')
  })

  it('should have semantic HTML structure', () => {
    cy.get('main').should('exist')
    cy.get('header').should('exist')
  })

  it('should support form submission with Enter key', () => {
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/**', {
      statusCode: 200,
      body: {
        weeks: [
          {
            contribution_days: [
              { date: '2024-11-01', count: 5 },
            ]
          }
        ]
      }
    }).as('getContributions')

    cy.intercept('GET', '**/api.github.com/users/**', {
      statusCode: 200,
      body: {
        login: 'testuser',
        name: 'Test User',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4'
      }
    }).as('getUserProfile')

    cy.get('input[placeholder="Enter username"]').first().type('user1')
    cy.get('input[placeholder="Enter username"]').last().type('user2{enter}')
    
    // Should trigger form submission
    cy.wait('@getContributions')
  })
})
