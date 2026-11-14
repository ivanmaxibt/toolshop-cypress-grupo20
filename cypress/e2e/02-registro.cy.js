describe("3.2 Validaciones del Formulario de Registro", () => {
  it("Debe mostrar errores al enviar el formulario vacío y permanecer en /register", () => {
    // Entrar al home y navegar por UI hacia el registro
    cy.visit("/");
    cy.get('[data-test="nav-sign-in"]').click();
    cy.get('[data-test="register-link"]').click();

    // Intentar enviar el formulario vacío
    cy.get('[data-test="register-submit"]').click();

    // Verificar mensajes de validación obligatorios
    cy.get('[data-test="first-name-error"]').should("be.visible");
    cy.get('[data-test="last-name-error"]').should("be.visible");
    cy.get('[data-test="email-error"]').should("be.visible");
    cy.get('[data-test="password-error"]').should("be.visible");

    // Verificar que no se creó ninguna cuenta y seguimos en la página de registro
    cy.url().should("include", "/auth/register");
  });
});