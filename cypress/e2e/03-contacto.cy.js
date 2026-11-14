describe("3.3 Formulario de Contacto", () => {
  beforeEach(() => {
    cy.fixture("testData").as("data");
  });

  it("Debe enviar un mensaje válido y mostrar confirmación", function () {
    cy.visit("/");
    cy.get('[data-test="nav-contact"]').click();

    cy.fillContactForm(this.data.contact);
    cy.get('[data-test="contact-submit"]').click();

    cy.get(".alert-success")
      .should("be.visible")
      .and("contain.text", "Thanks for your message!");
  });
});