/// <reference types="Cypress" />

describe("Homepage", () => {
  it("loads homepage", () => {
    cy.visit("/")
    cy.contains("It works!")
  })
})
