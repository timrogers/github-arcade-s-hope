describe('GitHub Battle Arena - Stats Comparison', () => {
  beforeEach(() => {
    cy.visit('/')
    
    // Setup API intercepts for successful battle
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/**', {
      statusCode: 200,
      body: {
        weeks: [
          {
            contribution_days: [
              { date: '2024-11-01', count: 5 },
              { date: '2024-11-02', count: 10 },
              { date: '2024-11-03', count: 15 },
              { date: '2024-11-04', count: 20 },
              { date: '2024-11-05', count: 8 },
            ]
          }
        ]
      }
    }).as('getContributions')

    cy.intercept('GET', '**/api.github.com/users/player1', {
      statusCode: 200,
      body: {
        login: 'player1',
        name: 'Player One',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4'
      }
    }).as('getPlayer1Profile')

    cy.intercept('GET', '**/api.github.com/users/player2', {
      statusCode: 200,
      body: {
        login: 'player2',
        name: 'Player Two',
        avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4'
      }
    }).as('getPlayer2Profile')

    // Start battle
    cy.get('input[placeholder="Enter username"]').first().type('player1')
    cy.get('input[placeholder="Enter username"]').last().type('player2')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributions')
    cy.wait('@getPlayer1Profile')
    cy.wait('@getPlayer2Profile')
  })

  it('should display the Battle Statistics section', () => {
    cy.contains('BATTLE STATISTICS').should('be.visible')
  })

  it('should display all four stat categories', () => {
    cy.contains('Total Contributions').should('be.visible')
    cy.contains('Longest Streak').should('be.visible')
    cy.contains('Current Streak').should('be.visible')
    cy.contains('Best Day').should('be.visible')
  })

  it('should display stat icons for each category', () => {
    // Verify that SVG icons are present (Phosphor Icons)
    cy.contains('Total Contributions').parent().parent().parent().find('svg').should('exist')
    cy.contains('Longest Streak').parent().parent().parent().find('svg').should('exist')
    cy.contains('Current Streak').parent().parent().parent().find('svg').should('exist')
    cy.contains('Best Day').parent().parent().parent().find('svg').should('exist')
  })

  it('should display numeric values for both players in each stat', () => {
    // Each stat card should have two values (one for each player)
    cy.contains('Total Contributions').parent().parent().parent().find('[class*="font-bold"]').should('have.length.at.least', 2)
  })

  it('should highlight the winning stat with visual styling', () => {
    // The winner in each category should have special styling (primary or secondary colors)
    cy.get('[class*="border-primary"]').should('exist')
  })

  it('should display stats in a responsive grid layout', () => {
    // Verify grid layout exists
    cy.get('[class*="grid"]').should('exist')
    cy.get('[class*="md:grid-cols"]').should('exist')
  })
})
