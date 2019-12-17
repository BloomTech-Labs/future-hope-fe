describe("Login in and complete some training", () => {
    beforeEach(() => { //log in before each test
        
        cy.visit('http://localhost:3000/')
        
        cy.get('button').contains('Login').click()
        cy.get('input').eq(0).type('hopeschooldevs@gmail.com')
        cy.get('input').eq(1).type('Pa$$w0rdz')
        cy.get('button').eq(2).click()

        cy.get('.MuiAvatar-img').click()
        cy.get('li').contains('Dashboard').click()
        cy.get('svg').eq(7).click()
        cy.get('a').contains('Science').click()
    });

    it("Navigates to topic and selects complete on a card", () => {
        cy.get('.complete-btn').eq(0).click()        
    })  

    it("Returns percentage value that is not equal to NaN", () => {
        cy.get('.progressText').should('not.have.text', 'NaN')
    })    
})