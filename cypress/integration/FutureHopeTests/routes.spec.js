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
    cy.visit('http://localhost:3000/training');
  });

    // Route to "food"
    it('Route to "food"', () => {
      cy.visit('http://localhost:3000/training/food');
    });

    // Route to "family"
    it('Route to "family"', () => {
      cy.visit('http://localhost:3000/training/family');
    });

    // Route to "friends"
    it('Route to "friends"', () => {
      cy.visit('http://localhost:3000/training/friends');
    });

    // Route to "geography"
    it('Route to "geography"', () => {
      cy.visit('http://localhost:3000/training/geography');
    });

    // Route to "culture"
    it('Route to "culture"', () => {
      cy.visit('http://localhost:3000/training/culture');
    });

    // Route to "geography"
    it('Route to "geography"', () => {
      cy.visit('http://localhost:3000/training/geography');
    });
});

// Test routing to Add Training
describe('Route to Add Training Materials', () => {

  // Route to "Add Materials" form
  it('Route to add materials form', () => {
    cy.visit('http://localhost:3000/training');
    cy.get("button").contains("Add Material").click();
    cy.url().should("include", "/add-materials");   
  });

});

// route to edit materials form
describe('Edit materials form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/training/family')
  })

  it('route to edit materials form', () => {
    cy.get('.edit').eq(0).click()
  })

})