// 1. Iniciar sesión vía UI
Cypress.Commands.add("loginUI", (email, password) => {
  cy.visit("/");
  cy.get('[data-test="nav-sign-in"]').click();
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-submit"]').click();
});

// 2. Abrir el primer producto del catálogo y agregarlo al carrito
Cypress.Commands.add("addFirstProductToCart", () => {
  cy.visit("/");
  cy.get(".card").first().click();
  cy.get('[data-test="add-to-cart"]').click();
  cy.get('[data-test="cart-quantity"]').should("be.visible");
});

// 3. Completar formulario de contacto
Cypress.Commands.add("fillContactForm", (contactData) => {
  cy.get('[data-test="first-name"]').type(contactData.firstName);
  cy.get('[data-test="last-name"]').type(contactData.lastName);
  cy.get('[data-test="email"]').type(contactData.email);
  cy.get('[data-test="subject"]').select(contactData.subject);
  cy.get('[data-test="message"]').type(contactData.message);
});