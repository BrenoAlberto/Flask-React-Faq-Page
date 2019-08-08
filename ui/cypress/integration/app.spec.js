/// <reference types="Cypress" />

context('Faq', () => {
    it('should send a message with only required fields successfuly', () => {
        cy.visit('http://localhost:3000')
        fillRequiredFields()

        cy.get("button").contains("Enviar").click()
        cy.get(".notification-success").should("exist")
    })
    it('should send a message with all fields successfuly', () => {
        cy.visit('http://localhost:3000')
        fillRequiredFields()
        fillNotRequiredFields()

        cy.get("button").contains("Enviar").click()
        cy.get(".notification-success").should("exist")

    })
})

function fillRequiredFields() {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in cursus sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit."

    cy.get("input[name=firstname]")
        .scrollIntoView().type('Breno').should('have.value', 'Breno')
    cy.get("input[name=lastname]")
        .type('Alberto').should('have.value', 'Alberto')
    cy.get("input[name=email]")
        .type('brenoaps435@gmail.com').should('have.value', 'brenoaps435@gmail.com')
    cy.get("textarea[name=message]")
        .scrollIntoView().type(lorem).should('have.value', lorem)
}

function fillNotRequiredFields() {
    cy.get("input[name=subject]")
            .type('Qualquer assunto').should('have.value', 'Qualquer assunto')
}