// Test routing

describe('Routes', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    // Signup from Landing page
    it('Route to signup', () => {
      cy.get("button").contains("Sign Up").click();
      cy.url().should("include", "/signup");
    });
  
    // Login from Landing page
    it('Route to login', () => {
      cy.get("button").contains("Login").click();
      cy.url().should("include", "/login");       
    });
  
    // Mission from Landing page
    it('Route to mission', () => {
      cy.get("button").contains("Mission").click();
      cy.url().should("include", "/mission");   
    });

    // View Mentors from Landing page
    it('Route to view mentors', () => {
      cy.get("button").contains("View Mentors").click();
      cy.url().should("include", "/mentors");   
    });
  });