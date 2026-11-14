describe("3.7 Pruebas de API (Productos y Login)", () => {
  beforeEach(() => {
    cy.fixture("testData").as("data");
  });

  it("Debe listar productos (200) y autenticar al usuario devolviendo un token (200)", function () {
    const apiUrl = this.data.apiUrl;

    // 1. Pedir la lista de productos y verificar status 200 y lista no vacía
    cy.request({
      method: "GET",
      url: `${apiUrl}/products`,
    }).then((productsRes) => {
      expect(productsRes.status).to.eq(200);
      expect(productsRes.body.data).to.be.an("array").and.not.be.empty;

      // 2. Iniciar sesión por API dentro del mismo it y verificar status 200 y token
      cy.request({
        method: "POST",
        url: `${apiUrl}/users/login`,
        body: {
          email: this.data.validUser.email,
          password: this.data.validUser.password,
        },
      }).then((loginRes) => {
        expect(loginRes.status).to.eq(200);
        expect(loginRes.body).to.have.property("access_token").and.not.be.empty;
      });
    });
  });
});