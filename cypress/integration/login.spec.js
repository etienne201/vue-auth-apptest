describe('The login process', () =>{

    it('should login a user, flash message , and redirect to the home page', () => {

        cy.server()

        cy.fixture ('user').as('user')

        cy.route('POST', '/api/v1/auth/login','@user')

        cy.visit('auth/login')
        cy.get('input[name="email"]').type('Freddy@gmail.com')

        cy.get('input[name="password').type('password')

        cy.get('button').click()

        cy.get('#confirm-email').should('contain', 'Please confirm your email address. ')
        cy.get('#auth-username').should('contain', ' Hey, Freddy')

        cy.get('#auth-logout').should('contain','Logout')
        
    });  

})  