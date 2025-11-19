describe('GitHub Battle Arena - Responsive Design', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('Mobile viewport', () => {
    beforeEach(() => {
      cy.viewport(375, 667) // iPhone SE dimensions
    })

    it('should display correctly on mobile', () => {
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    })

    it('should have stacked input fields on mobile', () => {
      cy.get('input[placeholder="Enter username"]').should('be.visible')
      cy.get('input[placeholder="Enter username"]').should('have.length', 2)
    })

    it('should have full-width START BATTLE button on mobile', () => {
      cy.contains('button', 'START BATTLE').should('be.visible')
      cy.contains('button', 'START BATTLE').should('have.class', 'w-full')
    })

    it('should display battle screen in mobile layout', () => {
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
      
      cy.contains('BATTLE STATISTICS').should('be.visible')
    })
  })

  context('Tablet viewport', () => {
    beforeEach(() => {
      cy.viewport(768, 1024) // iPad dimensions
    })

    it('should display correctly on tablet', () => {
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    })

    it('should have responsive grid layout on tablet', () => {
      cy.get('[class*="grid"]').should('exist')
    })
  })

  context('Desktop viewport', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })

    it('should display correctly on desktop', () => {
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    })

    it('should have side-by-side layout for input fields', () => {
      cy.get('[class*="md:grid-cols-2"]').should('exist')
    })

    it('should display full battle layout on desktop', () => {
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
      
      // Verify desktop grid layout
      cy.get('[class*="md:grid-cols"]').should('exist')
    })
  })
})
