class Login {

    constructor() {
        this.url = '/login'
    }

    getEmail() {
        return cy.get('[name="email"]').first();
    }

    getPassword() {
        return cy.get('[name="password"]');
    }

    submit() {
        return cy.get('button[type="submit"]').first();
    }

    visit() {
        cy.visit(this.url);
    }

}

export default Login;