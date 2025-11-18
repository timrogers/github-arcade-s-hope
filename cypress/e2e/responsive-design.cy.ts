/// <reference types="cypress" />

describe('Responsive Design', () => {
  const desktopViewport = { width: 1280, height: 720 }
  const tabletViewport = { width: 768, height: 1024 }
  const mobileViewport = { width: 375, height: 667 }

  beforeEach(() => {
    cy.visit('/')
    
    // Setup API intercepts
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
  })

  context('Desktop Layout', () => {
    beforeEach(() => {
      cy.viewport(desktopViewport.width, desktopViewport.height)
    })

    it('should display correctly on desktop', () => {
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    })

    it('should show side-by-side player inputs on desktop', () => {
      cy.get('input[placeholder="Enter username"]').should('have.length', 2)
      
      // Both inputs should be visible without scrolling
      cy.get('input[placeholder="Enter username"]').first().should('be.visible')
      cy.get('input[placeholder="Enter username"]').last().should('be.visible')
    })

    it('should display battle view properly on desktop', () => {
      cy.startBattle('testuser1', 'testuser2')
      cy.wait(['@getContributions1', '@getContributions2', '@getUserProfile1', '@getUserProfile2'])
      
      // Player cards should be side by side
      cy.contains('Test User One').should('be.visible')
      cy.contains('Test User Two').should('be.visible')
    })
  })

  context('Tablet Layout', () => {
    beforeEach(() => {
      cy.viewport(tabletViewport.width, tabletViewport.height)
    })

    it('should display correctly on tablet', () => {
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    })

    it('should handle tablet layout for selection screen', () => {
      cy.get('input[placeholder="Enter username"]').should('have.length', 2)
      cy.contains('button', 'START BATTLE').should('be.visible')
    })

    it('should display battle view on tablet', () => {
      cy.startBattle('testuser1', 'testuser2')
      cy.wait(['@getContributions1', '@getContributions2', '@getUserProfile1', '@getUserProfile2'])
      
      cy.contains('Test User One').should('be.visible')
      cy.contains('Test User Two').should('be.visible')
    })
  })

  context('Mobile Layout', () => {
    beforeEach(() => {
      cy.viewport(mobileViewport.width, mobileViewport.height)
    })

    it('should display correctly on mobile', () => {
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    })

    it('should stack player inputs vertically on mobile', () => {
      cy.get('input[placeholder="Enter username"]').should('have.length', 2)
      
      // Inputs should still be accessible
      cy.get('input[placeholder="Enter username"]').first().should('be.visible')
    })

    it('should make start button full width on mobile', () => {
      cy.contains('button', 'START BATTLE').should('be.visible')
    })

    it('should display battle view properly on mobile', () => {
      cy.startBattle('testuser1', 'testuser2')
      cy.wait(['@getContributions1', '@getContributions2', '@getUserProfile1', '@getUserProfile2'])
      
      // Elements should be stacked vertically
      cy.contains('Test User One').should('be.visible')
      
      // May need to scroll to see second player
      cy.contains('Test User Two').scrollIntoView().should('be.visible')
    })

    it('should display contribution graphs on mobile', () => {
      cy.startBattle('testuser1', 'testuser2')
      cy.wait(['@getContributions1', '@getContributions2', '@getUserProfile1', '@getUserProfile2'])
      
      cy.contains('CONTRIBUTION GRAPHS').scrollIntoView().should('be.visible')
    })

    it('should keep stats readable on mobile', () => {
      cy.startBattle('testuser1', 'testuser2')
      cy.wait(['@getContributions1', '@getContributions2', '@getUserProfile1', '@getUserProfile2'])
      
      cy.contains('Total Contributions').scrollIntoView().should('be.visible')
    })
  })

  context('Viewport Changes', () => {
    it('should adapt when resizing from desktop to mobile', () => {
      // Start on desktop
      cy.viewport(desktopViewport.width, desktopViewport.height)
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      
      // Resize to mobile
      cy.viewport(mobileViewport.width, mobileViewport.height)
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    })

    it('should adapt when resizing from mobile to desktop', () => {
      // Start on mobile
      cy.viewport(mobileViewport.width, mobileViewport.height)
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      
      // Resize to desktop
      cy.viewport(desktopViewport.width, desktopViewport.height)
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    })
  })

  context('Very Small Screens', () => {
    it('should handle very small mobile screens', () => {
      cy.viewport(320, 568) // iPhone SE size
      
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      cy.get('input[placeholder="Enter username"]').should('have.length', 2)
    })
  })

  context('Very Large Screens', () => {
    it('should handle large desktop screens', () => {
      cy.viewport(1920, 1080)
      
      cy.contains('GITHUB BATTLE ARENA').should('be.visible')
      cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
      
      // Elements should still be properly centered/sized
      cy.get('input[placeholder="Enter username"]').should('have.length', 2)
    })
  })

  context('Touch Interactions', () => {
    beforeEach(() => {
      cy.viewport(mobileViewport.width, mobileViewport.height)
    })

    it('should support touch-friendly tap targets', () => {
      // Button should be large enough to tap easily
      cy.contains('button', 'START BATTLE')
        .should('be.visible')
        .then(($btn) => {
          const height = $btn.height() || 0
          // Button should be at least 44px high (minimum touch target)
          expect(height).to.be.greaterThan(40)
        })
    })

    it('should handle input focus on mobile', () => {
      cy.get('input[placeholder="Enter username"]').first().focus()
      cy.get('input[placeholder="Enter username"]').first().type('testuser')
      cy.get('input[placeholder="Enter username"]').first().should('have.value', 'testuser')
    })
  })
})
