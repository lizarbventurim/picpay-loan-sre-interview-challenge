/// <reference types="cypress" />
// Importando o faker-br
const faker = require('faker-br')
const campoCpf = 'input[name="cpf"]'
const buttonAccess = 'button[type="submit"],[name="Acessar"]'
const domainValidation = 'https://meus-emprestimos.picpay.com/'

describe('Validação da tela de login', () => {
  it('Validar se o usuário irá realizar o login inserido CPF correto', () => {
    const cpf = faker.br.cpf() // gera um CPF válido
    cy.visit('/') // visita a página inicial definida na baseUrl
    cy.url().should('include', domainValidation)
    cy.get('h1').filter(':contains("Gerencie seus contratos")').should('be.visible') //Busca um H1 que contenha o texto "Gerencie seus contratos" e verifica se está visível
    cy.get(campoCpf).type(cpf) // Inserindo o CPF gerado utilizando o delay 0 para inserir o CPF de uma vez
    cy.get(buttonAccess).should('be.visible').click()

    // a página contem um recaptcha, que hora passa hora não, tendo isso em vista
    // foi criado uma condição se o elemento de inserção de validação de token estiver visivel, preeche como token inválido
    // clica em acessar e valdia se apresentou a mensagem de erro de código não reconhecido
    // se não passar pelo recapthca, ele externa um log que não passou e volta para o preenchimento do CPF

    cy.get('body').then(($body) => {
      if ($body.find('.w-full:visible').length === 1) {
        cy.get('input[name="cod1"]').type('1')
        cy.get('input[name="cod2"]').type('2')
        cy.get('input[name="cod3"]').type('3')
        cy.get('input[name="cod4"]').type('4')
        cy.get('input[name="cod5"]').type('5')
        cy.get(buttonAccess).should('be.visible').click()
        cy.get('#mat-mdc-error-0')
          .should('be.visible')
          .should('contain.text', 'Código não reconhecido. Digite novamente.')
      } else {
        cy.get(campoCpf).should('have.value', '') // valida que o campo do cpf está vazio após não passar no recaptcha
        cy.log('Não passou no recaptcha, voltou para o preenchimento do CPF')
      }
    })

    cy.url().should('include', domainValidation) // Validando se continuo na página ao clicar em acessar
    cy.wait(1000) /// adiciona 1 segundo de espera para que na gravaçao do video seja possivel visualizar o mesmo por completo, as vezes o cypress mostra o video cortado no final
    // sem mostrar a execução do teste. essa inserção do wait foi de caracter didatico.
  })
})
