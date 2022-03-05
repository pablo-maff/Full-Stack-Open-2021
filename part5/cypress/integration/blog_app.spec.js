describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Pablo Maffioli',
      username: 'pmaff',
      password: 'pabpass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('login form is shown', function() {
    cy.contains('Login').click()
    cy.get('#username').type('pmaff')
    cy.get('#password').type('pabpass')
    cy.get('#login-button').click()

    cy.contains('Pablo Maffioli logged-in')
  })
})