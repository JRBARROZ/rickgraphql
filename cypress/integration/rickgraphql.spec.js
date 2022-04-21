describe("Navigation", () => {
  it("should navigate to the main page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");
    cy.get("input").type("Rick");
    cy.get(".card:first").click();
    cy.url().should('include', '/1')
  });
});
