/* eslint-disable no-undef */
describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'Admin',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
  })

  it('Login form is shown', function() {
      cy.contains('login').click()
  })

  it('user can login', function () {
    cy.get('#username').type('Admin')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
  }) 
  describe('Login', function() {
    it('succeeds with correct credentials',function() {
      cy.get('#username').type('Admin')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })
    it('fails with wrong credentials',function() {
      cy.get('#username').type('Admin')
      cy.get('#password').type('nakki3')
      cy.get('#login-button').click()
      
      cy.contains('wrong credentials')
    })
  })


describe('when logged in', function() {
  beforeEach(function() {
    cy.get('#username').type('Admin')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
  })

  it('a new note can be created', function() {
    cy.contains('Create new Blog').click()
    cy.get('#title').type('New Blog :)')
    cy.get('#author').type('Cypress')
    cy.get('#url').type('chromeboys')
    cy.contains('create').click()
    cy.contains('New Blog :)')
  })


describe('when blog created',function () {
  beforeEach(function () {
    cy.contains('Create new Blog').click()
    cy.get('#title').type('New Blog :)')
    cy.get('#author').type('Cypress')
    cy.get('#url').type('chromeboys')
    cy.contains('create').click()
    cy.contains('New Blog :)')
  })
  it('blog can be liked',function() {
    cy.contains('New Blog :)')
    cy.contains('view').click()
    cy.contains('like').click()
    cy.get('.likes').contains(1)
  })
  it('blog can be deleted by its maker', function() {
    cy.contains('New Blog :)')
    cy.contains('view').click()
    cy.contains('remove').click()
    cy.get('html').should('not.contain', 'New Blog :)')
  })
  })
describe('multiple blogs',function() {
  beforeEach(function() {
    cy.contains('Create new Blog').click()
    cy.get('#title').type('New Blog :)')
    cy.get('#author').type('Cypress')
    cy.get('#url').type('chromeboys')
    cy.contains('create').click()
    cy.contains('New Blog :)')
 
    

    cy.contains('Create new Blog').click()
    cy.get('#title').type('second new')
    cy.get('#author').type('Cypress')
    cy.get('#url').type('chromeboys')
    cy.contains('create').click()
    cy.contains('second new')
    cy.contains('view').click()
    cy.contains('like').click()
    
  
    
    
  })
  it('blogs in right order',function() {
    
    cy.get('.likes').should((items) => {
      expect(items[0]).to.contain(1)
      expect(items[1]).to.contain(0)
    })
})
})
})
})

    
