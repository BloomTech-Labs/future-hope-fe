describe("Go to sign up from Landing page", function() {
  it("Signs up a new account", function() {
    //goes to staging site
    cy.visit("localhost:3000/");
    //finds a button that contains login, clicks it
    cy.get("button")
      .contains("Sign Up")
      .click();
    //verify's the url should include /login
    cy.url().should("include", "/signup");
    //finds the login with google button, clicks it
    cy.get("button")
      .contains("Sign Up With Email")
      .click();
    //finds the following id's, types into forms, asserts that info was typed and is correct
    cy.get("#standard-name")
      .type("Cypress Test")
      .should("have.value", "Cypress Test");

    cy.get("#standard-email")
      .type("cypresstest@email.com")
      .should("have.value", "cypresstest@email.com");

    cy.get("#verify-email")
      .type("cypresstest@email.com")
      .should("have.value", "cypresstest@email.com");

    cy.get("#standard-password-input")
      .type("test1234")
      .should("have.value", "test1234");

    cy.get("#city")
      .type("Cypress")
      .should("have.value", "Cypress");
    cy.get("#state-province")
      .type("Cypress")
      .should("have.value", "Cypress");
    cy.get("#country")
      .type("Cypress")
      .should("have.value", "Cypress");
    cy.get("#phone")
      .type("9999999999")
      .should("have.value", "9999999999");
    cy.get("#about-me")
      .type("I'm the cypress Test!")
      .should("have.value", "I'm the cypress Test!");
    //sign up after filling out form
    cy.get("#sign-up-btn").click();
    //! This will not work, will only get an alert saying email is already in use.
    //should redirect to /applicationstatus
    // cy.url().should("include", "/applicationstatus");
    cy.on("window:alert", str => {
      expect(str).to.equal(
        "The email address is already in use by another account."
      );
    });
  });
});
