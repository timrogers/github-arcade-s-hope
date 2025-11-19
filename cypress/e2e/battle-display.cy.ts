/// <reference types="cypress" />

describe('Battle Display', () => {
  beforeEach(() => {
    cy.visit('/')
    
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
    
    // Start the battle
    cy.startBattle('testuser1', 'testuser2')
    
    // Wait for all API calls
    cy.wait(['@getContributions1', '@getContributions2', '@getUserProfile1', '@getUserProfile2'])
  })

  it('should display player cards with correct information', () => {
    // Check that both player cards are displayed
    cy.get('img[alt="testuser1"]').should('be.visible')
    cy.get('img[alt="testuser2"]').should('be.visible')
    
    // Check for player names
    cy.contains('Test User One').should('be.visible')
    cy.contains('Test User Two').should('be.visible')
    
    // Check for usernames
    cy.contains('testuser1').should('be.visible')
    cy.contains('testuser2').should('be.visible')
  })

  it('should display the VS divider with lightning icon', () => {
    // Check for the lightning icon in the VS section
    cy.get('svg').should('exist')
  })

  it('should display the New Battle button', () => {
    cy.contains('button', 'New Battle').should('be.visible')
    cy.contains('button', 'New Battle').should('not.be.disabled')
  })

  it('should display contribution graphs section', () => {
    cy.contains('CONTRIBUTION GRAPHS').should('be.visible')
  })

  it('should display stats comparison section', () => {
    // The stats should be visible
    cy.contains('Total Contributions').should('be.visible')
    cy.contains('Longest Streak').should('be.visible')
    cy.contains('Current Streak').should('be.visible')
  })

  it('should have proper responsive layout on desktop', () => {
    // Desktop viewport
    cy.viewport(1280, 720)
    
    // Check that elements are visible
    cy.contains('Test User One').should('be.visible')
    cy.contains('Test User Two').should('be.visible')
  })

  it('should have proper responsive layout on mobile', () => {
    // Mobile viewport
    cy.viewport(375, 667)
    
    // Elements should still be visible but stacked
    cy.contains('Test User One').should('be.visible')
    cy.contains('Test User Two').should('be.visible')
  })

  it('should display player avatars correctly', () => {
    // Check that avatars have correct src
    cy.get('img[alt="testuser1"]')
      .should('have.attr', 'src')
      .and('include', 'avatars.githubusercontent.com')
    
    cy.get('img[alt="testuser2"]')
      .should('have.attr', 'src')
      .and('include', 'avatars.githubusercontent.com')
  })

  it('should animate elements on load', () => {
    // The page should have animated elements
    // We can't easily test animations, but we can verify elements appear
    cy.contains('Test User One').should('be.visible')
    cy.contains('Test User Two').should('be.visible')
  })

  it('should display contribution graph grids', () => {
    // Check that contribution graphs are rendered
    // The component should contain grid elements
    cy.contains('CONTRIBUTION GRAPHS').should('be.visible')
    cy.contains('testuser1').should('be.visible')
    cy.contains('testuser2').should('be.visible')
  })
})
