describe("Login from landing page", function() {
  it("Logs into future hope", function() {
    //goes to site
    cy.visit("localhost:3000/")

    //finds a button that contains login, clicks it
    cy.get("button")
      .contains("Login")
      .click()

    //verify's the url should include /login
    cy.url().should("include", "/login")

    //Type in info to login for cypresstest
    cy.get("input[name=email]")
      .type("cypresstest@email.com")
      .should("have.value", "cypresstest@email.com")
    cy.get("input[name=password]")
      .type("test1234")
      .should("have.value", "test1234")

    //click login
    cy.get("#login-btn").click()
    
    //should take them to dashboard
    cy.url().should("include", "dashboard")
  })
})

/*
To execute tests: yarn run cypress open
*/
