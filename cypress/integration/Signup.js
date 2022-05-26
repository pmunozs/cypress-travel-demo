import Signup from '../support/pages/Signup';

describe('Signup', () => {

    const signup = new Signup();
    
    before(() => {
        cy.intercept('/signup').as('Signup')
        signup.visit()
        cy.wait('@Signup').its('response.statusCode').should('eq', 200);
    })

    it('User should be able to create customer profile', () => {
        signup.getName().type('John');
        signup.getLastName().type('Doe');
        signup.getTelephone().type('12345678');
        signup.getEmail().type('john.doe.2@e-mail.com');
        signup.getPassword().type('Masked1!');
        signup.submit().click();
        cy.wait('@Signup').its('response.statusCode').should('eq', 302);
        cy.get('.alert-success.signup').should('be.visible');
        cy.url().should('contain', 'login/signup');
    })
})