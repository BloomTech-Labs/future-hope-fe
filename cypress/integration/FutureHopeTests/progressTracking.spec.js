describe("Login in and complete training", () => {//Currently must be logged in before running to use beforeEach
    beforeEach(() => {
        cy.visit('https://staging.futurehopeschool.com/')
        cy.get('.MuiAvatar-img').click()
        cy.get('a').contains('Logout').click()//Log out before loggin in
    });

    it("Logs in and updates the Training Completed percentage match materials completed", () => {

        cy.get('button').contains('Login').click()
        cy.get('input').eq(0).type('hopeschooldevs@gmail.com')
        cy.get('input').eq(1).type('Pa$$w0rdz')
        cy.get('button').eq(5).click()
        cy.get('.MuiAvatar-img').click()
        cy.get('li').contains('Dashboard').click()
        cy.get('svg').eq(7).click()
        cy.get('a').contains('Science').click()

        
        
    })
})

// 12-13-2019: Next, will clean up and break into smaller tests