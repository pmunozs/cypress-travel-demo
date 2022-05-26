class Homepage {

    getLoginButton() {
        return cy.get('a[href*=/login]');
    }

    getSignupButton() {
        return cy.get('[a[href*=/signup]');
    }
}

export default Homepage;