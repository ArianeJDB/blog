
describe('Test end to end', function () {
    it('Visits ome and gets into /login and logs', function () {
        cy.visit('http://localhost:8080/')
        cy.contains('Entrar').click({ force: true })
        cy.url().should('include', '/login')
        cy.get('.input_username')
            .type('ari')
        cy.get('.input_password')
            .type('ane')
        cy.contains('Enviar').click({ force: true })
        cy.contains('Ver comentarios').click({ force: true })
    })

    it('Should write a post without offensive words', async function () {
       
        cy.get('.input_text')
            .type('comentario pacífico')
        cy.contains('Enviar').click({ force: true })
        await cy.contains('.sent_good', 'Tu post ha sido enviado =)')

        })

})