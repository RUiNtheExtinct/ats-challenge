/* eslint-disable @typescript-eslint/no-namespace */
import { mount } from "cypress/react";
import "../../src/app/globals.css";

export {};

declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {
            mount: typeof mount;
            dataCy(value: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}

Cypress.Commands.add("mount", mount);
Cypress.Commands.add("dataCy", (value) => {
    return cy.get(`[data-cy=${value}]`);
});
