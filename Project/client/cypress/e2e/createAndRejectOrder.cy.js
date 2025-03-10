describe('Test application flow', () => {
    it('creates an order as customer', () => {
        cy.intercept('GET', '/restaurants').as('getRestaurants');
        cy.intercept('POST', '/createOrder').as('createOrder');
        cy.intercept('POST', '/pay').as('pay');

        cy.visit('http://localhost:5173/');

        cy.get('#username').type('user');
        cy.get('#password').type('test123');
        cy.get('#cy_loginButton').click();
        cy.wait('@getRestaurants');
        cy.get('#cy_restaurantSelect').select(1);
        cy.get('#cy_addToCartButton').click().click().click();
        cy.get('#cy_proceedToPaymentButton').click();
        cy.get('#cy_cardNumberInput').type('43899203');
        cy.get('#cy_payButton').click();
        cy.wait('@pay');
        cy.contains('Order completed!');
    });

    it('rejects order as restaurant', () => {
        cy.intercept('POST', '/ordersById').as('ordersById');

        cy.visit('http://localhost:5173/');

        cy.get('#username').type('NewPizzaChef');
        cy.get('#password').type('test123');
        cy.get('#cy_loginButton').click();

        cy.wait('@ordersById');
        cy.get('#cy_orderCard').click();

        cy.get('#cy_rejectReasonInput').type("Help, I'm a test reason!!!!");
        cy.get('#cy_rejectButton').click();
    });
});
