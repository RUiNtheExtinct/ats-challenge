import About from "../../src/app/about/page"; // Adjust path if needed

describe("About Page Component", () => {
    it("displays the page heading", () => {
        cy.mount(<About />);
        cy.get("h1").contains("About AI-Powered CV").should("exist");
    });

    it("lists the application features", () => {
        cy.mount(<About />);
        cy.get("ul.list-disc li").should("have.length.at.least", 4);
    });
});

describe("<About />", () => {
    it("should render and display expected content", () => {
        // Mount the React component for the Home page
        cy.mount(<About />);

        // Validate that a link with the expected URL is present
        // Following the link is better suited to an E2E test
        cy.get('a[href="/about"]').should("be.visible");
    });
});
