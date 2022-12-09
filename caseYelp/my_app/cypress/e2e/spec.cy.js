// Testing for Login page
describe('The Login Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.get('.css-b5n552').should('contain.text', 'Login with google')
    cy.wait(2000)
    cy.get('.css-1lbjdhs').should('exist')
    cy.wait(2000)
    cy.get('.css-b5n552').click()
    cy.wait(2000)
    cy.origin('https://accounts.google.com', () => {
      cy.url().should('contain', 'accounts.google.com')
    })
  })
})

// Testing for home page
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/home_testing')
    // Sidebar testing
    cy.get('.css-me7xnl').should('exist')
    cy.get('.css-me7xnl').invoke('width').should('be.greaterThan', 50)
    cy.get('.css-me7xnl').should('contain.text', 'Home')
    cy.get('.css-d98813').click()
    cy.get('.css-me7xnl').invoke('width').should('be.lessThan', 45)
    // Header exists
    cy.get('.css-10b483n').should('exist')
    // Tag
    cy.get('.css-1gk9jll').first().click()
    cy.wait(1000)
    cy.get('.css-79z5gx').should('exist')
    // 
    cy.get('.css-tla527').should('contain.text', 'spicy')
    cy.get('.css-1md6f3y').first().click()
    cy.wait(2000)
    cy.get('.css-15gvtj9').should('contain.text', 'spicy')
    cy.get('.css-fgm8us').contains('Save').click()
    cy.wait(2000)
    cy.get('.css-1gk9jll').first().click()
    cy.wait(2000)
    cy.get('.css-15gvtj9').should('contain.text', 'spicy')
    cy.get('.css-jz4iuj').first().click()
    cy.wait(2000)
    cy.get('.css-fgm8us').contains('Save').click()
    cy.wait(3000)
    // Test filtering
    cy.get('.css-rmlqu9').should('contain.text', 'Chipotle')
    cy.get('.css-rmlqu9').should('contain.text', 'BurgerIM')
    cy.wait(2000)
    cy.get('.css-fn1o4y').click().get('.css-138pct0').contains('Your favorite').click()
    cy.wait(2000)
    cy.get('.css-rmlqu9').should('contain.text', 'Chipotle')
    cy.get('.css-rmlqu9').should('not.include.text', 'BurgerIM')
    cy.wait(2000)
    cy.get('.css-fn1o4y').click().get('.css-138pct0').contains('Chinese food').click()
    cy.wait(2000)
    cy.get('.css-rmlqu9').should('contain.text', 'Chopstick')
    cy.get('.css-rmlqu9').each(() => {cy.get('.css-d5wbux').should('contain.text', 'Chinese')})
    cy.wait(2000)
  })
})

// Testing for profile
describe('The Profile Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/profile_testing')
    cy.get('.css-rmlqu9').should('contain.text', 'Zhiyuan Yu')
    .and('contain.text', '2022-12-04')
    .and('contain.text', 'spicy')
    .and('contain.text', 'Not your fav? Click to change')
  })
})

// Testing for posting question
describe('The AskQuestion Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/askQuestion_testing')
    cy.get('.css-1pl3vz5').type('Testing for posting question')
    cy.get('select').select('Chipotle')
    cy.get('.css-y19l5s').click()
    cy.wait(3000)
  })
})

// Testing for seeing my questions
describe('The MyQuestion Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/myQuestions_testing')
    cy.get('.css-pga01w').should('contain.text', 'Testing for posting question')
  })
})

// Testing for search questions
describe('The SearchQuestion Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/searchQuestions_testing')
    cy.get('input').type('Testing').type('{enter}')
    cy.wait(3000)
    cy.get('.css-pga01w').should('contain.text', 'Testing for posting question')
    cy.get('.css-1a7yavo').click()
    cy.wait(3000)
    cy.get('.css-381t5m').click()
    cy.wait(1000)
    cy.get('.css-gzc3rp').click()
    cy.wait(3000)
  })
})

