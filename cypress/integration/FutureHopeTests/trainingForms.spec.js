// Testing for Add Materials Form
describe('Add materials form', () => {
  beforeEach(() => {
      cy.server()
  })

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
  
      cy.get('.form-control').eq(1)
          .type(typedText)
          .should('have.value', typedText)
  })

  // select a category
  it('select a category', () => {
    cy.visit('http://localhost:3000/add-materials')
    cy.get("button").contains("Select or Add New Category").click();  
  });
})

// Form submission
context('Form submission', () => {
  beforeEach(() => {
    cy.server()
  })
  
  // Adds a new material
  it('Adds a new material', () => {
    const itemText = 'The Ocean'
    cy.route('POST', '/training/science', {
      name: itemText,
      id: 1,
      isComplete: false
    })
  })
})

/*------------------------------------------------------------*/
// Testing for Edit Materials Form
describe('Edit materials form', () => {
  beforeEach(() => {
    cy.server()
  })
  
  // enter heading accepts input
  it('enter heading accepts input', () => {
    const typedText = 'The Ocean'

    cy.visit('http://localhost:3000/edit-materials')
          
    cy.get('.form-control').first()
      .type(typedText)
      .should('have.value', typedText)
  })
    
  // enter description accepts input
  it('enter description accepts input', () => {
    const typedText = 'The Ocean is vast.'
  
    cy.visit('http://localhost:3000/edit-materials')
    
    cy.get('.form-control').eq(1)
      .type(typedText)
      .should('have.value', typedText)
  })
  
  // enter URL accepts input
  it('enter URL accepts input', () => {
    const typedText = 'ocean.com'
      
    cy.visit('http://localhost:3000/edit-materials')
    
    cy.get('.form-control').eq(1)
      .type(typedText)
      .should('have.value', typedText)
  })
})
  
// Form submission
context('Form submission', () => {
  beforeEach(() => {
    cy.server()
  })
    
  // Adds a new material
  it('Adds a new material', () => {
  const itemText = 'The Ocean'
    cy.route('POST', '/training/science', {
      name: itemText,
      id: 1,
      isComplete: false
    })
  })
})