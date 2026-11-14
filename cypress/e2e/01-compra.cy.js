describe("3.1 Flujo de Compra Exitosa", () => {
  beforeEach(() => {
    cy.fixture("testData").as("data");
  });

  it("Debe completar una compra desde el catálogo hasta la confirmación", function () {
    // 1. Entrar a la página principal y verificar que se muestran productos
    cy.visit("/");
    cy.get(".card").should("have.length.greaterThan", 0);

    // 2. Abrir un producto y agregarlo al carrito
    cy.get(".card").first().click();
    cy.get('[data-test="add-to-cart"]').click();

    // 3. Ir al carrito y verificar que el producto está ahí
    cy.get('[data-test="nav-cart"]').click();
    cy.url().should("include", "/checkout");
    cy.get(".product-title").should("be.visible");
    cy.get('[data-test="proceed-1"]').click();

    // 4. Iniciar sesión con el usuario de prueba (sus datos salen del fixture)
    cy.get('[data-test="email"]').type(this.data.validUser.email);
    cy.get('[data-test="password"]').type(this.data.validUser.password);
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="proceed-2"]').should("be.visible").click();

    // 5. Esperar a que carguen los datos precargados y completar la dirección
    cy.get('[data-test="address"]').should("not.have.value", "");
    cy.get('[data-test="address"]').clear().type(this.data.checkout.address);
    cy.get('[data-test="city"]').clear().type(this.data.checkout.city);
    cy.get('[data-test="state"]').clear().type(this.data.checkout.state);
    cy.get('[data-test="country"]').clear().type(this.data.checkout.country);
    cy.get('[data-test="postcode"]').clear().type(this.data.checkout.postcode);
    cy.get('[data-test="proceed-3"]').should("not.be.disabled").click();

    // Seleccionar método de pago por índice y completar campos si aparecen
    cy.get('[data-test="payment-method"]').select(1);
    cy.get("body").then(($body) => {
      if ($body.find('[data-test="account-name"]').length > 0) {
        cy.get('[data-test="account-name"]').clear().type("Juan Perez");
        cy.get('[data-test="account-number"]').clear().type("1234567890");
      }
    });

    cy.get('[data-test="finish"]').should("not.be.disabled").click();

    // 6. Verificar que aparece el mensaje de confirmación
    cy.get(".help-block, .alert-success").should(
      "contain.text",
      "Payment was successful"
    );
  });
});