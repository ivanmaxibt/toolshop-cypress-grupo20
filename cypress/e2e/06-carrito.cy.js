describe("3.6 Eliminar Producto del Carrito", () => {
  it("Debe permitir agregar un producto y luego eliminarlo dejando el carrito vacío", () => {
    cy.addFirstProductToCart();

    cy.get('[data-test="nav-cart"]').click();
    cy.get(".product-title").should("be.visible");

    // Eliminar producto
    cy.get(".btn-danger").first().click();

    // Verificar carrito vacío
    cy.get(".product-title").should("not.exist");
    cy.get('[data-test="cart-quantity"]').should("not.exist");
  });
});