// Delete materials testing

describe('Delete materials', () => {
  // click delete button
  it('Deletes on submit', () => {
    cy.visit('http://localhost:3000/training/family')
    .get('.delete').eq(0).click()
  })

  // confirm delete
  it('Confirm delete', () => {
    cy.visit('http://localhost:3000/training/family')
      .get('.delete').eq(0).click()
      .get('.confirmDelete').eq(0).click()
  })
})