import Signup from '../support/pages/Signup';
import { faker } from '@faker-js/faker';

describe('Signup', () => {

    const signup = new Signup();

    beforeEach(() => {
        cy.intercept('/signup').as('Signup');
        signup.visit();
        cy.wait('@Signup').its('response.statusCode').should('eq', 200);
    });

    it('User should be able to create customer profile', () => {
        signup.getName().type(faker.name.firstName());
        signup.getLastName().type(faker.name.lastName());
        signup.getTelephone().type(faker.phone.phoneNumber('+1 ########'));
        signup.getEmail().type(faker.internet.email('qa+', 'demo'));
        signup.getPassword().type(faker.internet.password(8));
        signup.submit().click();
        cy.wait('@Signup').its('response.statusCode').should('eq', 302);
        cy.get('.alert-success.signup').should('be.visible');
        cy.url().should('contain', 'login/signup');
    }); 

    it('Display error message if e-mail already exists', () => {
        cy.intercept('**/failed').as('Failed');
        signup.getName().type(faker.name.firstName());
        signup.getLastName().type(faker.name.lastName());
        signup.getTelephone().type(faker.phone.phoneNumber('+1 ########'));
        signup.getEmail().type('user@phptravels.com');
        signup.getPassword().type(faker.internet.password(8));
        signup.submit().click();
        cy.wait('@Failed').its('response.statusCode').should('eq', 200);
        cy.get('.alert-danger').should('be.visible');
        cy.url().should('contain', 'signup/failed');
    });
})