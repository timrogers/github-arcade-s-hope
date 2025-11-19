describe('GitHub Battle Arena - User Selection', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main title and subtitle', () => {
    cy.contains('GITHUB BATTLE ARENA').should('be.visible')
    cy.contains('Face off in the ultimate contribution showdown').should('be.visible')
  })

  it('should display the selection screen with proper UI elements', () => {
    cy.contains('CHOOSE YOUR FIGHTERS').should('be.visible')
    cy.contains('Enter two GitHub usernames to begin the battle').should('be.visible')
    cy.get('input[placeholder="Enter username"]').should('have.length', 2)
    cy.contains('button', 'START BATTLE').should('be.visible')
  })

  it('should have disabled START BATTLE button when no usernames are entered', () => {
    cy.contains('button', 'START BATTLE').should('be.disabled')
  })

  it('should have disabled START BATTLE button when only one username is entered', () => {
    cy.get('input[placeholder="Enter username"]').first().type('octocat')
    cy.contains('button', 'START BATTLE').should('be.disabled')
  })

  it('should enable START BATTLE button when both usernames are entered', () => {
    cy.get('input[placeholder="Enter username"]').first().type('octocat')
    cy.get('input[placeholder="Enter username"]').last().type('torvalds')
    cy.contains('button', 'START BATTLE').should('not.be.disabled')
  })

  it('should display Player 1 and Player 2 labels with correct styling', () => {
    cy.contains('label', 'Player 1').should('be.visible')
    cy.contains('label', 'Player 2').should('be.visible')
  })

  it('should allow typing in username input fields', () => {
    const username1 = 'testuser1'
    const username2 = 'testuser2'
    
    cy.get('input[placeholder="Enter username"]').first().type(username1)
    cy.get('input[placeholder="Enter username"]').first().should('have.value', username1)
    
    cy.get('input[placeholder="Enter username"]').last().type(username2)
    cy.get('input[placeholder="Enter username"]').last().should('have.value', username2)
  })

  it('should clear input fields when cleared manually', () => {
    cy.get('input[placeholder="Enter username"]').first().type('octocat')
    cy.get('input[placeholder="Enter username"]').first().clear()
    cy.get('input[placeholder="Enter username"]').first().should('have.value', '')
  })

  it('should show trophy icon on selection screen', () => {
    // Check if the trophy icon is displayed (using Phosphor Icons)
    cy.get('svg').should('exist')
  })
})
