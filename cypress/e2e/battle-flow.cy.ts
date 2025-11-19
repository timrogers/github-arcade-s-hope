describe('GitHub Battle Arena - Battle Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should start a battle when both usernames are provided and button is clicked', () => {
    // Intercept the GitHub API calls
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/**', {
      statusCode: 200,
      body: {
        weeks: [
          {
            contribution_days: [
              { date: '2024-01-01', count: 5 },
              { date: '2024-01-02', count: 10 },
              { date: '2024-01-03', count: 15 },
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

    // Enter usernames
    cy.get('input[placeholder="Enter username"]').first().type('octocat')
    cy.get('input[placeholder="Enter username"]').last().type('torvalds')
    
    // Click START BATTLE
    cy.contains('button', 'START BATTLE').click()
    
    // Wait for API calls
    cy.wait('@getContributions')
    cy.wait('@getUserProfile')
    
    // Verify battle screen is shown
    cy.contains('New Battle').should('be.visible')
  })

  it('should display loading state when fetching user data', () => {
    // Intercept and delay the API calls
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/**', (req) => {
      req.reply((res) => {
        res.delay = 1000
        res.send({
          statusCode: 200,
          body: {
            weeks: [
              {
                contribution_days: [
                  { date: '2024-01-01', count: 5 }
                ]
              }
            ]
          }
        })
      })
    }).as('getContributions')

    cy.intercept('GET', '**/api.github.com/users/**', {
      statusCode: 200,
      body: {
        login: 'testuser',
        name: 'Test User',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4'
      }
    }).as('getUserProfile')

    cy.get('input[placeholder="Enter username"]').first().type('octocat')
    cy.get('input[placeholder="Enter username"]').last().type('torvalds')
    
    cy.contains('button', 'START BATTLE').click()
    
    // Check for loading state
    cy.contains('button', 'LOADING...').should('be.visible')
  })

  it('should display error message when API fails', () => {
    // Intercept and fail the API call
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/**', {
      statusCode: 404,
      body: { message: 'User not found' }
    }).as('getContributionsFail')

    cy.get('input[placeholder="Enter username"]').first().type('nonexistentuser123456')
    cy.get('input[placeholder="Enter username"]').last().type('anothernonexistent')
    
    cy.contains('button', 'START BATTLE').click()
    
    // Wait for the failed request
    cy.wait('@getContributionsFail')
    
    // Verify error message is displayed (wait a bit for state update)
    cy.get('[class*="destructive"]', { timeout: 5000 }).should('exist')
  })

  it('should display battle screen components after successful data fetch', () => {
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/**', {
      statusCode: 200,
      body: {
        weeks: [
          {
            contribution_days: [
              { date: '2024-01-01', count: 5 },
              { date: '2024-01-02', count: 10 },
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

    cy.get('input[placeholder="Enter username"]').first().type('octocat')
    cy.get('input[placeholder="Enter username"]').last().type('torvalds')
    
    cy.contains('button', 'START BATTLE').click()
    
    cy.wait('@getContributions')
    cy.wait('@getUserProfile')
    
    // Verify battle components are visible
    cy.contains('BATTLE STATISTICS').should('be.visible')
    cy.contains('CONTRIBUTION GRAPHS').should('be.visible')
  })
})
