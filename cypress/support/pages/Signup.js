class Signup {

   getName() {
       return cy.get('[name="first_name"]');
   }

    getLastName() {
        return cy.get('[name="last_name"]');
    }   

    getTelephone() {
        return cy.get('[name="phone"]');
    }

    getEmail() {
        return cy.get('[name="email"]');
    }

    getPassword() {
        return cy.get('[name="password"]');
    }

    submit() {
        return cy.get('button[type="submit"]');
    }

    visit() {
        cy.visit('/signup')
    }
}

export default Signup;