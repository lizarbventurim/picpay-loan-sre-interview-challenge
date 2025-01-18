/// <reference types="cypress" />

const campoCpf = 'input[name="cpf"]'
const buttonAccess = 'button[type="submit"],[name="Acessar"]'
const domainValidation = 'https://meus-emprestimos.picpay.com/'
const message = 'Campo obrigatório'

describe('Validação da tela de login', () => {
  it(`Validar se a mansagem de erro de ${message} está visível`, () => {
    cy.visit('/') // visita a página inicial definida na baseUrl
    cy.url().should('include', domainValidation) // verifica se a URL contém o domínio correto
    cy.get('h1').filter(':contains("Gerencie seus contratos")').should('be.visible') //Busca um H1 que contenha o texto "Gerencie seus contratos" e verifica se está visível
    cy.get(campoCpf).click() // clicar no campo e não inserir o cpf
    cy.get(buttonAccess).should('be.visible').click() // clica em acessar
    cy.get('#mat-mdc-error-0').should('be.visible').should('contain.text', message) // valida se a mensagem de erro de campo obrigatório está visível

    cy.wait(1000) /// adiciona 1 segundo de espera para que na gravaçao do video seja possivel visualizar o mesmo por completo, as vezes o cypress mostra o video cortado no final
    // sem mostrar a execução do teste. essa inserção do wait foi de caracter didatico.
  })
})
