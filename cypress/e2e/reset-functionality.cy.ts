/// <reference types="cypress" />

describe('Reset and New Battle Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should reset the battle and return to selection screen', () => {
    // Intercept API calls
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
    
    // Start a battle
    cy.startBattle('testuser1', 'testuser2')
    cy.wait(['@getContributions1', '@getContributions2', '@getUserProfile1', '@getUserProfile2'])
    
    // Verify battle is displayed
    cy.contains('Test User One').should('be.visible')
    cy.contains('Test User Two').should('be.visible')
    
    // Click the New Battle button
    cy.contains('button', 'New Battle').click()
    
    // Should return to selection screen
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    cy.get('input[placeholder="Enter username"]').should('have.length', 2)
    
    // Input fields should be empty
    cy.get('input[placeholder="Enter username"]').first().should('have.value', '')
    cy.get('input[placeholder="Enter username"]').last().should('have.value', '')
  })

  it('should allow starting a new battle after reset', () => {
    // Intercept for first battle
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=first1', {
      fixture: 'contributions-player1.json'
    }).as('getContributionsFirst1')
    
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=first2', {
      fixture: 'contributions-player2.json'
    }).as('getContributionsFirst2')
    
    cy.intercept('GET', '**/api.github.com/users/first1', {
      body: {
        login: 'first1',
        name: 'First User One',
        avatar_url: 'https://avatars.githubusercontent.com/u/111'
      }
    }).as('getUserProfileFirst1')
    
    cy.intercept('GET', '**/api.github.com/users/first2', {
      body: {
        login: 'first2',
        name: 'First User Two',
        avatar_url: 'https://avatars.githubusercontent.com/u/222'
      }
    }).as('getUserProfileFirst2')
    
    // Start first battle
    cy.startBattle('first1', 'first2')
    cy.wait(['@getContributionsFirst1', '@getContributionsFirst2', '@getUserProfileFirst1', '@getUserProfileFirst2'])
    
    // Reset
    cy.contains('button', 'New Battle').click()
    
    // Intercept for second battle
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=second1', {
      fixture: 'contributions-player1.json'
    }).as('getContributionsSecond1')
    
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=second2', {
      fixture: 'contributions-player2.json'
    }).as('getContributionsSecond2')
    
    cy.intercept('GET', '**/api.github.com/users/second1', {
      body: {
        login: 'second1',
        name: 'Second User One',
        avatar_url: 'https://avatars.githubusercontent.com/u/333'
      }
    }).as('getUserProfileSecond1')
    
    cy.intercept('GET', '**/api.github.com/users/second2', {
      body: {
        login: 'second2',
        name: 'Second User Two',
        avatar_url: 'https://avatars.githubusercontent.com/u/444'
      }
    }).as('getUserProfileSecond2')
    
    // Start second battle
    cy.startBattle('second1', 'second2')
    cy.wait(['@getContributionsSecond1', '@getContributionsSecond2', '@getUserProfileSecond1', '@getUserProfileSecond2'])
    
    // Verify second battle is displayed
    cy.contains('Second User One').should('be.visible')
    cy.contains('Second User Two').should('be.visible')
  })

  it('should clear any previous errors when resetting', () => {
    // Intercept to cause an error
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=error1', {
      statusCode: 404,
      body: 'Not found'
    }).as('getContributionsError')
    
    cy.intercept('GET', '**/api.github.com/users/error1', {
      statusCode: 404,
      body: 'Not found'
    }).as('getUserProfileError')
    
    // Try to start a battle that will fail
    cy.get('input[placeholder="Enter username"]').first().type('error1')
    cy.get('input[placeholder="Enter username"]').last().type('error2')
    cy.contains('button', 'START BATTLE').click()
    
    // Wait for error to appear
    cy.wait('@getContributionsError')
    
    // Error message should be visible
    cy.get('[class*="bg-destructive"]', { timeout: 10000 }).should('be.visible')
    
    // The selection screen should still be visible (battle didn't start)
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    
    // Clear inputs and try again with valid data
    cy.get('input[placeholder="Enter username"]').first().clear()
    cy.get('input[placeholder="Enter username"]').last().clear()
    
    // Intercept with valid data
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=valid1', {
      fixture: 'contributions-player1.json'
    }).as('getContributionsValid1')
    
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/?username=valid2', {
      fixture: 'contributions-player2.json'
    }).as('getContributionsValid2')
    
    cy.intercept('GET', '**/api.github.com/users/valid1', {
      fixture: 'user-profile1.json'
    }).as('getUserProfileValid1')
    
    cy.intercept('GET', '**/api.github.com/users/valid2', {
      fixture: 'user-profile2.json'
    }).as('getUserProfileValid2')
    
    // Start a valid battle
    cy.startBattle('valid1', 'valid2')
    cy.wait(['@getContributionsValid1', '@getContributionsValid2', '@getUserProfileValid1', '@getUserProfileValid2'])
    
    // Error should be gone and battle should display
    cy.contains('Test User One').should('be.visible')
  })

  it('should preserve animations when resetting', () => {
    // Intercept API calls
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/**', {
      fixture: 'contributions-player1.json'
    })
    
    cy.intercept('GET', '**/api.github.com/users/**', {
      fixture: 'user-profile1.json'
    })
    
    // Start a battle
    cy.startBattle('user1', 'user2')
    
    // Wait for battle to load
    cy.contains('Test User One', { timeout: 10000 }).should('be.visible')
    
    // Reset
    cy.contains('button', 'New Battle').click()
    
    // Selection screen should animate in
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
  })
})
