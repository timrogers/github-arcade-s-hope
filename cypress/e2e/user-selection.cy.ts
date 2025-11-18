/// <reference types="cypress" />

describe('User Selection Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the initial selection screen', () => {
    // Check for the main title
    cy.contains('GITHUB BATTLE ARENA').should('be.visible')
    cy.contains('Face off in the ultimate contribution showdown').should('be.visible')
    
    // Check for the selection screen title
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    
    // Check for the trophy icon
    cy.get('svg').should('exist')
    
    // Check for input fields
    cy.get('input[placeholder="Enter username"]').should('have.length', 2)
    
    // Check for labels
    cy.contains('Player 1').should('be.visible')
    cy.contains('Player 2').should('be.visible')
    
    // Check that the start button exists and is disabled
    cy.contains('button', 'START BATTLE').should('be.disabled')
  })

  it('should enable the start button when both usernames are entered', () => {
    // Initially disabled
    cy.contains('button', 'START BATTLE').should('be.disabled')
    
    // Type first username
    cy.get('input[placeholder="Enter username"]').first().type('octocat')
    cy.contains('button', 'START BATTLE').should('be.disabled')
    
    // Type second username
    cy.get('input[placeholder="Enter username"]').last().type('torvalds')
    
    // Now should be enabled
    cy.contains('button', 'START BATTLE').should('not.be.disabled')
  })

  it('should keep button disabled if only one username is entered', () => {
    cy.get('input[placeholder="Enter username"]').first().type('octocat')
    cy.contains('button', 'START BATTLE').should('be.disabled')
  })

  it('should keep button disabled if usernames are empty strings', () => {
    cy.get('input[placeholder="Enter username"]').first().type('   ')
    cy.get('input[placeholder="Enter username"]').last().type('   ')
    cy.contains('button', 'START BATTLE').should('be.disabled')
  })

  it('should show loading state when battle starts', () => {
    // Intercept API calls to add delay
    cy.intercept('GET', '**/contributions-api.me-5bd.workers.dev/**', {
      delay: 1000,
      fixture: 'contributions-player1.json'
    }).as('getContributions')
    
    cy.intercept('GET', '**/api.github.com/users/**', {
      delay: 1000,
      fixture: 'user-profile1.json'
    }).as('getUserProfile')
    
    cy.get('input[placeholder="Enter username"]').first().type('testuser1')
    cy.get('input[placeholder="Enter username"]').last().type('testuser2')
    
    cy.contains('button', 'START BATTLE').click()
    
    // Should show loading text
    cy.contains('LOADING...').should('be.visible')
    cy.contains('button', 'LOADING...').should('be.disabled')
  })

  it('should handle input field focus states', () => {
    const firstInput = cy.get('input[placeholder="Enter username"]').first()
    
    // Focus the input
    firstInput.focus()
    
    // Type and verify value
    firstInput.type('testuser')
    firstInput.should('have.value', 'testuser')
    
    // Clear and verify empty
    firstInput.clear()
    firstInput.should('have.value', '')
  })

  it('should display validation styling for player fields', () => {
    // Check that Player 1 input has primary color styling
    cy.contains('label', 'Player 1').should('have.class', 'text-primary')
    
    // Check that Player 2 input has secondary color styling
    cy.contains('label', 'Player 2').should('have.class', 'text-secondary')
  })
})
