describe("About Page Tests", () => {
    beforeEach(() => {
        // Assumes your About page is served at http://localhost:3000/about
        cy.visit("http://localhost:3000/about");
    });

    it("should render the page heading", () => {
        // Checks for an h1 with the correct text
        cy.get("h1").contains("About AI-Powered CV").should("exist");
    });

    it("should list the application features", () => {
        // Verifies presence of the features list
        cy.get("ul.list-disc li").should("have.length.at.least", 4);
    });
});
