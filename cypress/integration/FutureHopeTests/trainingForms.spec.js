// Testing for Add Materials Form
describe('Add materials form', () => {
  // enter heading accepts input
  it('enter heading accepts input', () => {
    const typedText = 'The Ocean'

    cy.visit('http://localhost:3000/add-materials')
        
    cy.get('.form-control').first()
      .type(typedText)
      .should('have.value', typedText)
  })
  
  // enter description accepts input
  it('enter description accepts input', () => {
    const typedText = 'The Ocean is vast.'

    cy.visit('http://localhost:3000/add-materials')
  
    cy.get('.form-control').eq(1)
      .type(typedText)
      .should('have.value', typedText)
  })

  // enter URL accepts input
  it('enter URL accepts input', () => {
    const typedText = 'ocean.com'
    
    cy.visit('http://localhost:3000/add-materials')
    
    cy.get('label').eq(2).click()
    
    cy.get('.form-control').eq(2)
      .type(typedText)
      .should('have.value', typedText)
  })

  // select a category
  it('select a category', () => {
    cy.visit('http://localhost:3000/add-materials')
    cy.get("button").contains("Select or Add New Category").click();  
  });

  // Form submission
  it('Form submission to add new material', () => {
    cy.get('.btn-orange').contains('Add Material').click()
  })
})

/*------------------------------------------------------------*/
// Testing for Edit Materials Form
describe('Edit materials form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/training/family')
    .get('.edit').eq(0).click()
  })
  
  // enter heading accepts input
  it('enter heading accepts input', () => {
    const typedText = 'family'

    cy.get('.form-control').eq(0)
      .clear()
      .type(typedText)
      .should('have.value', typedText)
  })

  // enter description accepts input
  it('enter description accepts input', () => {
    const typedText = 'Family life education has a broad aim.'
    
    cy.get('.form-control').eq(1)
      .clear()
      .type(typedText)
      .should('have.value', typedText)
  })
  
  // enter URL accepts input
  it('enter URL accepts input', () => {
    const typedText = 'family.com'
    
    cy.get('.form-control').eq(2)
      .clear()
      .type(typedText)
      .should('have.value', typedText)
  })

  // Form submission
  it('submits the form for updates', () => {
    const typedText = 'family'

    cy.get('.form-control').eq(0)
      .clear()
      .type(typedText)
      .should('have.value', typedText)

    const typedTexts = 'Family life education has a broad aim.'
    
    cy.get('.form-control').eq(1)
      .clear()
      .type(typedTexts)
      .should('have.value', typedTexts)

    const typedTexty = 'family.com'
    
    cy.get('.form-control').eq(2)
        .clear()
        .type(typedTexty)
        .should('have.value', typedTexty)  

    cy.get('.btn-orange').contains('Edit Material').click()

    cy.visit('http://localhost:3000/training/family')
    
  })
})

/*------------------------------------------------------------*/
// Add Category Testing
describe('Add category', () => {
  // Add a category to Add Material Form
  it('Add a category to Add Material Form', () => {
    cy.visit('http://localhost:3000/add-materials')
    cy.get("button").contains("Select or Add New Category").click()
    cy.get(".add-category").click()

    const typedTxt = 'Home'

    cy.get('.form-control').eq(3)
      .type(typedTxt)
      .should('have.value', typedTxt)

    cy.get('button').eq(1).click()
  })
})