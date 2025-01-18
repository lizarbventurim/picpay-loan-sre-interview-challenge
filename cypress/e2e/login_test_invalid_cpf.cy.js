/// <reference types="cypress" />

const campoCpf = 'input[name="cpf"]'
const buttonAccess = 'button[type="submit"],[name="Acessar"]'
const domainValidation = 'https://meus-emprestimos.picpay.com/'
const messageCpf = '*CPF Inválido'

describe('Validação da tela de login', () => {
  it(`Validar se o usuário inseriu cpf incorreto, apresentar a mensagem ${messageCpf}`, () => {
    cy.visit('/') // visita a página inicial definida na baseUrl
    cy.url().should('include', domainValidation) // verifica se a URL contém o domínio correto
    cy.get('h1').filter(':contains("Gerencie seus contratos")').should('be.visible') //Busca um H1 que contenha o texto "Gerencie seus contratos" e verifica se está visível
    cy.get(campoCpf).type('1111111111111') // Inserindo o CPF invalido
    cy.get(buttonAccess).should('be.visible').click() // clica em acessar
    cy.get('#mat-mdc-error-0').should('be.visible').should('contain.text', messageCpf) // valida mensagem de erro ao digitar um CPF inválido
    cy.get(campoCpf).should('have.value', '111.111.111-11') // valida que o campo do cpf está preenchido com o CPF inválido

    cy.wait(1000) /// adiciona 1 segundo de espera para que na gravaçao do video seja possivel visualizar o mesmo por completo, as vezes o cypress mostra o video cortado no final
    // sem mostrar a execução do teste. essa inserção do wait foi de caracter didatico.
  })
})
