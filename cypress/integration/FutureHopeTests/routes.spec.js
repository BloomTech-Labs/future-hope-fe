// Test routing from Landing Page
describe('Routes from Landing Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    // Signup
    it('Route to signup', () => {
      cy.get("button").contains("Sign Up").click();
      cy.url().should("include", "/signup");
    });
  
    // Login
    it('Route to login', () => {
      cy.get("button").contains("Login").click();
      cy.url().should("include", "/login");       
    });
  
    // Mission
    it('Route to mission', () => {
      cy.get("button").contains("Mission").click();
      cy.url().should("include", "/mission");   
    });

    // View Mentors
    it('Route to view mentors', () => {
      cy.get("button").contains("View Mentors").click();
      cy.url().should("include", "/mentors");   
    });
});

// Test routing to display Training
describe('Routes to display Training', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/messaging');
  });

    // Display training sidebar menu from dashboard
    it('Route to display sidebar training menu', () => {
      cy.get("[data-cy=longmenu]").click();
    })

    // Route to "food" from sidebar menu
    it('Route to "food" from sidebar menu', () => {
      cy.get("[data-cy=longmenu]").click();
      cy.get('[href="/training/food"]').click();
      cy.url().should("include", "/training/food");
    });

    // Route to "family" from sidebar menu
    it('Route to "family" from sidebar menu', () => {
      cy.get("[data-cy=longmenu]").click();
      cy.get('[href="/training/family"]').click();
      cy.url().should("include", "/training/family");
    });

    // Route to "friends" from sidebar menu
    it('Route to "friends" from sidebar menu', () => {
      cy.get("[data-cy=longmenu]").click();
      cy.get('[href="/training/friends"]').click();
      cy.url().should("include", "/training/friends");
    });

    // Route to "geography" from sidebar menu
    it('Route to "geography" from sidebar menu', () => {
      cy.get("[data-cy=longmenu]").click();
      cy.get('[href="/training/geography"]').click();
      cy.url().should("include", "/training/geography");
    });

    // Route to "culture" from sidebar menu
    it('Route to "culture" from sidebar menu', () => {
      cy.get("[data-cy=longmenu]").click();
      cy.get('[href="/training/culture"]').click();
      cy.url().should("include", "/training/culture");
    });

});