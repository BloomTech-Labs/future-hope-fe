describe("Go to dashboard and navigate through training tabs", function() {
  it("Logs in and redirects to dashboard", function() {
    cy.visit("localhost:3000/login")

    cy.get("#email")
      .type("cypresstest@email.com")
      .should("have.value", "cypresstest@email.com")

    cy.get("#password")
      .type("test1234")
      .should("have.value", "test1234")

    cy.get("#login-btn").click()

    cy.url().should("include", "dashboard")
  })
  it("Opens Training menu button and navigates to Food route", function() {
    cy.get("button[aria-controls='long-menu']").click()

    cy.get("a")
      .contains("Food")
      .click()
  })
  it("Opens Training menu button and navigates to Family route", function() {
    cy.get("button[aria-controls='long-menu']").click()

    cy.get("a")
      .contains("Family")
      .click()
  })
  it("Opens Training menu button and navigates to Friends route", function() {
    cy.get("button[aria-controls='long-menu']").click()

    cy.get("a")
      .contains("Friends")
      .click()

    cy.url().should("include", "friends")
  })
  it("Opens Training menu button and navigates to Geography route", function() {
    cy.get("button[aria-controls='long-menu']").click()

    cy.get("a")
      .contains("Geography")
      .click()

    cy.url().should("include", "geography")
  })
  it("Opens Training menu button and navigates to Culture route", function() {
    cy.get("button[aria-controls='long-menu']").click()

    cy.get("a")
      .contains("Culture")
      .click()

    cy.url().should("include", "culture")
  })
})
