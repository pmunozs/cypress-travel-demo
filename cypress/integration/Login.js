import Login from '../support/pages/Login';
import { faker } from '@faker-js/faker';

describe('Login', () => {

    const login = new Login();

    beforeEach(() => {
        cy.intercept('/login').as('Login');
        login.visit();
        cy.wait('@Login').its('response.statusCode').should('eq', 200);
    });

    it('User can login succesfully', () => {
        cy.intercept('/account/dashboard').as('Dashboard');
        login.getEmail().type('supplier@phptravels.com');
        login.getPassword().type('demosupplier');
        login.submit().click();
        cy.wait('@Dashboard').its('response.statusCode').should('eq', 200);
        cy.url().should('contain', '/account/dashboard');
    });

    it('Display error messages if credentials are incorrect', () => {
        cy.intercept('**/failed').as('Failed');
        login.getEmail().type('fake-email@test.com');
        login.getPassword().type('qwerty1234');
        login.submit().click();
        cy.wait('@Failed').its('response.statusCode').should('eq', 200);
        cy.get('.alert-danger').should('be.visible');
        cy.url().should('contain', 'login/failed');
    });
});