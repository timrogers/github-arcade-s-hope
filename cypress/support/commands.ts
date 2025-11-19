// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to enter usernames and start a battle
       * @example cy.startBattle('octocat', 'torvalds')
       */
      startBattle(username1: string, username2: string): Chainable<void>
      
      /**
       * Custom command to wait for the battle to load
       * @example cy.waitForBattle()
       */
      waitForBattle(): Chainable<void>
    }
  }
}

Cypress.Commands.add('startBattle', (username1: string, username2: string) => {
  // Type first username
  cy.get('input[placeholder="Enter username"]').first().clear().type(username1)
  
  // Type second username
  cy.get('input[placeholder="Enter username"]').last().clear().type(username2)
  
  // Click the start battle button
  cy.contains('button', 'START BATTLE').click()
})

Cypress.Commands.add('waitForBattle', () => {
  // Wait for the battle screen to load by checking for player cards
  cy.get('[class*="PlayerCard"]', { timeout: 10000 }).should('have.length', 2)
})

export {}
