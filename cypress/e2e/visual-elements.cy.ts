describe('GitHub Battle Arena - Visual Elements and Animations', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have animated gradient background', () => {
    // Check for gradient background element
    cy.get('[class*="bg-gradient"]').should('exist')
  })

  it('should display lightning bolt icon in battle screen', () => {
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
    cy.get('input[placeholder="Enter username"]').last().type('user2')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributions')
    cy.wait('@getUserProfile')
    
    // Lightning icon should be visible in the VS divider
    cy.get('svg').should('exist')
  })

  it('should show player cards with visual styling', () => {
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
    cy.get('input[placeholder="Enter username"]').last().type('user2')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributions')
    cy.wait('@getUserProfile')
    
    // Player names should be visible
    cy.contains('Test User').should('be.visible')
  })

  it('should have proper spacing and layout', () => {
    // Check for proper spacing classes
    cy.get('[class*="gap-"]').should('exist')
    cy.get('[class*="space-y-"]').should('exist')
  })

  it('should display cards with border styling', () => {
    // Selection card should have border styling
    cy.get('[class*="border"]').should('exist')
  })

  it('should show color-coded elements for players', () => {
    // Player 1 label should have primary color
    cy.contains('label', 'Player 1').should('have.class', 'text-primary')
    
    // Player 2 label should have secondary color
    cy.contains('label', 'Player 2').should('have.class', 'text-secondary')
  })

  it('should display proper font styling', () => {
    // Main title should be bold and large
    cy.contains('GITHUB BATTLE ARENA').should('have.class', 'font-bold')
  })

  it('should have rounded corners on UI elements', () => {
    // Inputs and buttons should have rounded corners
    cy.get('[class*="rounded"]').should('exist')
  })

  it('should show shadow effects on cards', () => {
    // Cards should have shadow effects
    cy.get('[class*="shadow"]').should('exist')
  })

  it('should have proper text alignment', () => {
    // Title should be centered
    cy.contains('GITHUB BATTLE ARENA').parent().should('have.class', 'text-center')
  })
})
