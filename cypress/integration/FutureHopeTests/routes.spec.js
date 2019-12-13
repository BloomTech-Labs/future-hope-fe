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
    cy.visit('http://localhost:3000/');
  });

    // Route to "Mentoring"
    it('Route to "Mentoring"', () => {
      cy.get('.MuiAvatar-img').click()
      cy.get('li').contains('Dashboard').click()
      cy.get('svg').eq(7).click()
      cy.get('a').contains('Mentoring').click()

      cy.url().should("include", "/training/mentoring");
    });

    // Route to "School Syllabi"
    it('Route to "School Syllabi"', () => {
      cy.get('.MuiAvatar-img').click()
      cy.get('li').contains('Dashboard').click()
      cy.get('svg').eq(7).click()
      cy.get('a').contains('School Syllabi').click()

      cy.url().should("include", "/training/school%20syllabi");
    });

    // Route to "Math"
    it('Route to "Math"', () => {
      cy.get('.MuiAvatar-img').click()
      cy.get('li').contains('Dashboard').click()
      cy.get('svg').eq(7).click()
      cy.get('a').contains('Math').click()

      cy.url().should("include", "/training/math");
    });

    // Route to "Science"
    it('Route to "Science"', () => {
      cy.get('.MuiAvatar-img').click()
      cy.get('li').contains('Dashboard').click()
      cy.get('svg').eq(7).click()
      cy.get('a').contains('Science').click()

      cy.url().should("include", "/training/science");
    });

    // Route to "Teaching English"
    it('Route to "Teaching English"', () => {
      cy.get('.MuiAvatar-img').click()
      cy.get('li').contains('Dashboard').click()
      cy.get('svg').eq(7).click()
      cy.get('a').contains('Teaching English').click()

      cy.url().should("include", "/training/teaching%20english");
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
    cy.visit('http://localhost:3000/training/science')
  })

  it('route to edit materials form', () => {
    cy.get('.edit').eq(0).click()
  })

})