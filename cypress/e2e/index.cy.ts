describe("Home Page Tests", () => {
    beforeEach(() => {
        // Assumes your home page is served at http://localhost:3000
        cy.visit("http://localhost:3000");
    });

    it("should display the main welcome text or heading", () => {
        // Update the selector to match an actual element on your home page
        cy.get("h1").should("exist");
    });

    it("should have a clickable link to the About page", () => {
        // If there's a link on the home page pointing to /about
        cy.get('a[href*="about"]').should("exist").click({ multiple: true });
        cy.url().should("include", "/about");
        // Go back to the homepage
        cy.go("back");
    });
});
