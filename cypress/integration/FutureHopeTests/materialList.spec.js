describe("Training Portal", function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000/training/family")
    })    
    
    it('tests that training cards are present', function() {
      
      cy.get('[data-cy=trainingCard]')
        .should('have.length', 2)
    })

    it('checks training material component is present', function() {
      
        cy.get('[data-cy=materialList]')
          .its('length')
          .should('be.gt', 0)
      })      

  })