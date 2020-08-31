describe('Comply page directly', function () {
  it('should prevent access', function () {
    cy.visit('/comply', {failOnStatusCode: false});
    cy.get('h1').should('contain', 'there is a problem with the service');
  });
});

describe('Comply page ', function () {
  beforeEach(() => {
    // GET `/start`
    cy.visit('/start');

    // POST `/start`
    cy.get('#main-content form button.govuk-button').click();

    // ~GET `/gdpr`~
    // POST `/gdpr`
    cy.get('#main-content form button.govuk-button').click();

    // ~GET `/conviction`~
    // CLICK no
    cy.get('#main-content form input[type="radio"][value="no"]').click();
    // POST `/conviction`
    cy.get('#main-content form button.govuk-button').click();

    // ~GET `/eligible`~
    // POST `/eligible`
    cy.get('#main-content form button.govuk-button').click();

    // ~GET `/general`~
    // CLICK GLO1
    cy.get('#main-content form input[type="checkbox"]#general').click();
    // POST `/general`
    cy.get('#main-content form button.govuk-button').click();
  });

  it('should allow access if the user visits all the pages in order', function () {
    cy.visit('/comply');
    cy.get('h1').should('contain', 'confirm that you agree to comply');
  });

  it('"no" checkbox + main button should navigate to same page with error', function () {
    cy.visit('/comply');
    cy.get('#main-content form button.govuk-button').click();
    cy.url().should('include', '/comply');
    cy.get('h2#error-summary-title').should('contain', 'There is a problem');
    cy.get('span#comply-error').should('contain', 'You must confirm');
  });

  it('"yes" checkbox + main button should navigate to meat-bait page', function () {
    cy.visit('/comply');
    cy.get('#main-content form input[type="checkbox"]#comply').click();
    cy.get('#main-content form button.govuk-button').click();
    cy.url().should('include', '/meat-bait');
  });
});
