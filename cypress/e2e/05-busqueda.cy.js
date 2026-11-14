describe("3.5 Búsqueda de Productos", () => {
  beforeEach(() => {
    cy.fixture("testData").as("data");
  });

  it("Debe filtrar productos por nombre y mostrar coincidencias", function () {
    cy.visit("/");
    cy.get('[data-test="search-query"]').type(this.data.search.toolName);
    cy.get('[data-test="search-submit"]').click();

    cy.get(".card").should("have.length.greaterThan", 0);
    cy.get('[data-test="product-name"]')
      .first()
      .should("contain.text", this.data.search.toolName);
  });
});