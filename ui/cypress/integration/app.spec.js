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

context('Faq - responsivity', () => {
    it('iphone-5 - all fields must be visible on other viewports', () => {
        cy.visit('http://localhost:3000')
    
        cy.viewport('iphone-5')
        cy.get('button').contains('Enviar').scrollIntoView()
        checkIfFieldsAreVisible()
    })
    it('iphone-6+ - all fields must be visible on other viewports', () => {
        cy.visit('http://localhost:3000')

        cy.viewport('iphone-6+')
        cy.get('button').contains('Enviar').scrollIntoView()
        checkIfFieldsAreVisible()
    })
    it('1280, 720 - all fields must be visible on other viewports', () => {
        cy.visit('http://localhost:3000')

        cy.viewport(1280, 720)
        cy.get('button').contains('Enviar').scrollIntoView()
        checkIfFieldsAreVisible()
    })
})

function fillRequiredFields() {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in cursus sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit."

    cy.get("input[name=firstname]").scrollIntoView().type('Breno').should('have.value', 'Breno')
    cy.get("input[name=lastname]").type('Alberto').should('have.value', 'Alberto')
    cy.get("input[name=email]").type('brenoaps435@gmail.com').should('have.value', 'brenoaps435@gmail.com')
    cy.get("textarea[name=message]").scrollIntoView().type(lorem).should('have.value', lorem)
}

function fillNotRequiredFields() {
    cy.get("input[name=subject]").type('Qualquer assunto').should('have.value', 'Qualquer assunto')
}

function checkIfFieldsAreVisible() {
    cy.get("input[name=firstname]").should('be.visible')
    cy.get("input[name=lastname]").should('be.visible')
    cy.get("input[name=email]").should('be.visible')
    cy.get("textarea[name=message]").should('be.visible')
    cy.get("input[name=subject]").should('be.visible')
}