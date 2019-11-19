
describe("tests button", function () {
    
    it('says sign up', function() {
      cy.visit("http://localhost:3000/training/family")
      cy.get('[data-cy=test-material-list]')
        .should('have.class', 'react_tinylink_card')
    })
  })