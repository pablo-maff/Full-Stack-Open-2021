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
    cy.contains('Blogs')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('pmaff')
      cy.get('#password').type('pabpass')
      cy.get('#login-button').click()

      cy.contains('Pablo Maffioli logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('pmaff')
      cy.get('#password').type('wrongpass')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'pmaff', password: 'pabpass' })
    })

    it.only('a new blog can be created', function() {
      cy.createBlog({ title: 'cypress new blog', author: 'bot author', url: 'http://example.com' })

      cy.contains('View').click()
      cy.contains('cypress new blog')
      cy.contains('bot author')
      cy.contains('http://example.com')
    })
  })
})