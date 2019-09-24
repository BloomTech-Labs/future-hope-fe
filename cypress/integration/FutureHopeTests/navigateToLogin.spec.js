describe("Login from landing page", function() {
  it("Logs into future hope", function() {
    //goes to site
    //! MAKE SURE THIS IS THE SITE YOU ARE USING
    cy.visit("localhost:3000/");
    //finds a button that contains login, clicks it
    cy.get("button")
      .contains("Login")
      .click();
    //verify's the url should include /login
    cy.url().should("include", "/login");
    //finds the login with Email button, clicks it
    cy.get("button")
      .contains("Login with Email")
      .click();
    //Type in info to login for cypresstest
    cy.get("#email")
      .type("cypresstest@email.com")
      .should("have.value", "cypresstest@email.com");
    cy.get("#password")
      .type("test1234")
      .should("have.value", "test1234");
    //click login
    cy.get("#login-btn").click();
    //should take them to dashboard
    cy.url().should("include", "dashboard");
  });
});

/*

Arrange - setup initial app state
Act - take an action
Assert - make an assertion

Don't know why cy is "not defined" on VS code, works and runs just fine.

To execute tests: yarn run cypress open

*/
