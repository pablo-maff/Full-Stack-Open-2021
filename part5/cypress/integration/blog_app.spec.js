describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Pablo Maffioli',
      username: 'pmaff',
      password: 'pabpass'
    }
    const user2 = {
      name: 'Edward Lear',
      username: 'nonSensePoetry',
      password: 'Pobble'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
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

    it('a new blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#blog-title').type('a blog created by cypress')
      cy.get('#blog-author').type('Mr. Cypress')
      cy.get('#blog-url').type('http://example.com')
      cy.contains('Create').click()

      cy.contains('View').click()
      cy.contains('a blog created by cypress')
      cy.contains('Mr. Cypress')
      cy.contains('http://example.com')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'cypress new blog', author: 'bot author', url: 'http://newblog.com'
        })
      })

      it('user can like a blog', function() {
        cy.contains('cypress new blog')
          .contains('View').click()
        cy.contains('Like').click()

        cy.contains('Likes')
          .contains('1')
      })

      it('user can delete a blog if he is the owner', function() {
        cy.contains('cypress new blog')
          .contains('View').click()

        cy.contains('Remove').click()
      })

      it('user can\'t delete a blog if he is not the owner', function() {
        cy.contains('Logout').click()
        cy.login({ username: 'nonSensePoetry', password: 'Pobble' })
        cy.contains('cypress new blog')
          .contains('View').click()

        cy.contains('Remove').should('not.exist')
      })
    })

    describe('and several blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'first blog', author: 'Alice', url: 'http://first.com'
        })

        cy.createBlog({
          title: 'second blog', author: 'Bob', url: 'http://second.com'
        })

        cy.createBlog({
          title: 'third blog', author: 'Carl', url: 'http://third.com'
        })

        cy.likeBlog('first blog', 2)
        cy.likeBlog('second blog', 1)
        cy.likeBlog('third blog', 3)
      })

      it('blogs are ordered by ammount of likes in descending order', function() {
        cy.visit('http://localhost:3000')
        cy.get('.blog')
          .then($blog => {
            cy.wrap($blog[0]).should('contain', 'third blog')
            cy.wrap($blog[1]).should('contain', 'first blog')
            cy.wrap($blog[2]).should('contain', 'second blog')
          })
      })
    })
  })
})