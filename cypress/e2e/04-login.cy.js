describe("3.4 Inicio de Sesión con Datos Incorrectos", () => {
  beforeEach(() => {
    cy.fixture("testData").as("data");
  });

  it("Debe rechazar una contraseña inválida y mantener al usuario en /login", function () {
    cy.loginUI(this.data.invalidUser.email, this.data.invalidUser.password);

    cy.get('[data-test="login-error"]')
      .should("be.visible")
      .and("contain.text", "Invalid email or password");

    cy.url().should("include", "/auth/login");
  });
});