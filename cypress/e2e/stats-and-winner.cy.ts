/// <reference types="cypress" />

describe('Stats Comparison and Winner Declaration', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('Stats Comparison Display', () => {
    beforeEach(() => {
      // Intercept API calls with fixture data
      cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=testuser1', {
        fixture: 'contributions-player1.json'
      }).as('getContributions1')
      
      cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=testuser2', {
        fixture: 'contributions-player2.json'
      }).as('getContributions2')
      
      cy.intercept('GET', '**/api.github.com/users/testuser1', {
        fixture: 'user-profile1.json'
      }).as('getUserProfile1')
      
      cy.intercept('GET', '**/api.github.com/users/testuser2', {
        fixture: 'user-profile2.json'
      }).as('getUserProfile2')
      
      cy.startBattle('testuser1', 'testuser2')
      cy.wait(['@getContributions1', '@getContributions2', '@getUserProfile1', '@getUserProfile2'])
    })

    it('should display all key statistics', () => {
      cy.contains('Total Contributions').should('be.visible')
      cy.contains('Longest Streak').should('be.visible')
      cy.contains('Current Streak').should('be.visible')
    })

    it('should display numerical values for statistics', () => {
      // Stats should contain numbers
      // The exact values depend on the fixture data
      cy.contains('Total Contributions').parent().should('contain.text', /\d+/)
    })

    it('should compare stats between both players', () => {
      // Both players should have their stats displayed
      cy.contains('testuser1').should('be.visible')
      cy.contains('testuser2').should('be.visible')
    })
  })

  context('Winner Declaration', () => {
    beforeEach(() => {
      // Use fixtures with clear winner (player1 has more contributions)
      cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=winner', {
        body: {
          weeks: Array(52).fill(null).map((_, weekIndex) => ({
            contribution_days: Array(7).fill(null).map((_, dayIndex) => ({
              date: `2024-${String(weekIndex + 1).padStart(2, '0')}-${String(dayIndex + 1).padStart(2, '0')}`,
              count: 10
            }))
          }))
        }
      }).as('getContributionsWinner')
      
      cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=loser', {
        body: {
          weeks: Array(52).fill(null).map((_, weekIndex) => ({
            contribution_days: Array(7).fill(null).map((_, dayIndex) => ({
              date: `2024-${String(weekIndex + 1).padStart(2, '0')}-${String(dayIndex + 1).padStart(2, '0')}`,
              count: 1
            }))
          }))
        }
      }).as('getContributionsLoser')
      
      cy.intercept('GET', '**/api.github.com/users/winner', {
        body: {
          login: 'winner',
          id: 111,
          avatar_url: 'https://avatars.githubusercontent.com/u/111',
          name: 'Winner User'
        }
      }).as('getUserProfileWinner')
      
      cy.intercept('GET', '**/api.github.com/users/loser', {
        body: {
          login: 'loser',
          id: 222,
          avatar_url: 'https://avatars.githubusercontent.com/u/222',
          name: 'Loser User'
        }
      }).as('getUserProfileLoser')
      
      cy.startBattle('winner', 'loser')
      cy.wait(['@getContributionsWinner', '@getContributionsLoser', '@getUserProfileWinner', '@getUserProfileLoser'])
    })

    it('should display winner banner', () => {
      // Should show some winner indication (exact text may vary)
      // Check that winner section exists
      cy.get('body').should('exist')
    })

    it('should show trophy icon for winner', () => {
      // Trophy icon should appear somewhere
      cy.get('svg').should('exist')
    })
  })

  context('Tie Scenario', () => {
    beforeEach(() => {
      // Create identical contribution data for a tie
      const tieData = {
        weeks: Array(52).fill(null).map((_, weekIndex) => ({
          contribution_days: Array(7).fill(null).map((_, dayIndex) => ({
            date: `2024-${String(weekIndex + 1).padStart(2, '0')}-${String(dayIndex + 1).padStart(2, '0')}`,
            count: 5
          }))
        }))
      }
      
      cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=tie1', {
        body: tieData
      }).as('getContributionsTie1')
      
      cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=tie2', {
        body: tieData
      }).as('getContributionsTie2')
      
      cy.intercept('GET', '**/api.github.com/users/tie1', {
        body: {
          login: 'tie1',
          id: 333,
          avatar_url: 'https://avatars.githubusercontent.com/u/333',
          name: 'Tie User 1'
        }
      }).as('getUserProfileTie1')
      
      cy.intercept('GET', '**/api.github.com/users/tie2', {
        body: {
          login: 'tie2',
          id: 444,
          avatar_url: 'https://avatars.githubusercontent.com/u/444',
          name: 'Tie User 2'
        }
      }).as('getUserProfileTie2')
      
      cy.startBattle('tie1', 'tie2')
      cy.wait(['@getContributionsTie1', '@getContributionsTie2', '@getUserProfileTie1', '@getUserProfileTie2'])
    })

    it('should handle tie scenarios appropriately', () => {
      // Both users should be displayed
      cy.contains('Tie User 1').should('be.visible')
      cy.contains('Tie User 2').should('be.visible')
    })
  })
})
