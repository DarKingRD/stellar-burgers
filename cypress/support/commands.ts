/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(ingredientName: string): Chainable<void>;

      checkIngredientCount(
        ingredientName: string,
        count: number
      ): Chainable<void>;

      closeModal(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('addIngredient', (ingredientName) => {
  cy.get(`[data-cy="ingredient-${ingredientName}"]`)
    .contains('button', 'Добавить')
    .click();
});

Cypress.Commands.add('checkIngredientCount', (ingredientName, count) => {
  cy.get(`[data-cy="ingredient-${ingredientName}"]`)
    .find('div.counter')
    .find('p')
    .should('have.text', count.toString())
    .and('be.visible');
});

Cypress.Commands.add('closeModal', () => {
  cy.get('#modals').as('modalRoot');
  cy.get('@modalRoot').find('[data-cy="modal-close-button"]').click();
  cy.get('@modalRoot').should('be.empty');
});

export {};