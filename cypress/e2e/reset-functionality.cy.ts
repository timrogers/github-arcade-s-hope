describe('GitHub Battle Arena - Reset Functionality', () => {
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
  })

  it('should show "New Battle" button after battle starts', () => {
    cy.get('input[placeholder="Enter username"]').first().type('player1')
    cy.get('input[placeholder="Enter username"]').last().type('player2')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributions')
    cy.wait('@getUserProfile')
    
    cy.contains('button', 'New Battle').should('be.visible')
  })

  it('should reset to selection screen when "New Battle" is clicked', () => {
    // Start a battle
    cy.get('input[placeholder="Enter username"]').first().type('player1')
    cy.get('input[placeholder="Enter username"]').last().type('player2')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributions')
    cy.wait('@getUserProfile')
    
    // Verify battle screen is shown
    cy.contains('BATTLE STATISTICS').should('be.visible')
    
    // Click New Battle button
    cy.contains('button', 'New Battle').click()
    
    // Verify back to selection screen
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    cy.contains('button', 'START BATTLE').should('be.visible')
  })

  it('should clear previous battle data after reset', () => {
    // Start first battle
    cy.get('input[placeholder="Enter username"]').first().type('player1')
    cy.get('input[placeholder="Enter username"]').last().type('player2')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributions')
    cy.wait('@getUserProfile')
    
    // Reset
    cy.contains('button', 'New Battle').click()
    
    // Input fields should be empty or ready for new input
    cy.get('input[placeholder="Enter username"]').first().should('have.value', '')
    cy.get('input[placeholder="Enter username"]').last().should('have.value', '')
  })

  it('should allow starting a new battle after reset', () => {
    // Start first battle
    cy.get('input[placeholder="Enter username"]').first().type('player1')
    cy.get('input[placeholder="Enter username"]').last().type('player2')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributions')
    cy.wait('@getUserProfile')
    
    // Reset
    cy.contains('button', 'New Battle').click()
    
    // Start second battle with different users
    cy.get('input[placeholder="Enter username"]').first().type('newplayer1')
    cy.get('input[placeholder="Enter username"]').last().type('newplayer2')
    cy.contains('button', 'START BATTLE').should('not.be.disabled')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributions')
    cy.wait('@getUserProfile')
    
    // Verify new battle started
    cy.contains('BATTLE STATISTICS').should('be.visible')
  })

  it('should show animated reset icon', () => {
    // Start a battle
    cy.get('input[placeholder="Enter username"]').first().type('player1')
    cy.get('input[placeholder="Enter username"]').last().type('player2')
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributions')
    cy.wait('@getUserProfile')
    
    // The New Battle button should have an icon (SVG)
    cy.contains('button', 'New Battle').find('svg').should('exist')
  })

  it('should not show "New Battle" button on selection screen', () => {
    // On initial load, New Battle button should not be visible
    cy.contains('button', 'New Battle').should('not.exist')
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
  })
})
