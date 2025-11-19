describe('GitHub Battle Arena - Contribution Graphs', () => {
  beforeEach(() => {
    cy.visit('/')
    
    // Setup API intercepts
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/**', {
      statusCode: 200,
      body: {
        weeks: Array.from({ length: 52 }, (_, weekIndex) => ({
          contribution_days: Array.from({ length: 7 }, (_, dayIndex) => {
            const date = new Date(2024, 0, weekIndex * 7 + dayIndex + 1)
            return {
              date: date.toISOString().split('T')[0],
              count: Math.floor(Math.random() * 30)
            }
          })
        }))
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

    // Start battle
    cy.get('input[placeholder="Enter username"]').first().type('user1')
    cy.get('input[placeholder="Enter username"]').last().type('user2')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributions')
    cy.wait('@getUserProfile')
  })

  it('should display the Contribution Graphs section', () => {
    cy.contains('CONTRIBUTION GRAPHS').should('be.visible')
  })

  it('should display contribution graphs for both players', () => {
    // Should have two contribution graph components
    cy.get('[class*="grid"]').contains('user1').should('be.visible')
    cy.get('[class*="grid"]').contains('user2').should('be.visible')
  })

  it('should display contribution heatmap squares', () => {
    // Verify that contribution squares/cells are rendered
    // The contribution graph should have multiple elements representing days
    cy.get('[class*="grid"]').find('[class*="gap"]').should('exist')
  })

  it('should display graphs in responsive grid layout', () => {
    // Verify responsive grid layout
    cy.get('[class*="md:grid-cols-2"]').should('exist')
  })

  it('should show usernames on contribution graphs', () => {
    cy.contains('user1').should('be.visible')
    cy.contains('user2').should('be.visible')
  })
})
