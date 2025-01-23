import Home from "../../src/app/page"; // Adjust path if needed

describe("Home Page Component", () => {
    it("renders main heading", () => {
        cy.mount(<Home />);
        cy.get("h1").should("exist");
    });

    it("has a link to the About page", () => {
        cy.mount(<Home />);
        cy.get('a[href*="about"]').should("exist");
    });
});
