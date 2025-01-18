
# Desafio QA Sênior PicPay
Este projeto contém testes automatizados utilizando Cypress para validar a tela de login do sistema de empréstimos do PicPay.


## Estrutura do Projeto

- `.husky/`: Scripts de hooks do Git para garantir a qualidade do código antes de commits e push.
- `cypress/`: Diretório contendo os testes E2E, fixtures e arquivos de suporte.
  - `e2e/`: Testes E2E escritos em Cypress.
  - `fixtures/`: Dados mockados para serem utilizados nos testes.
  - `support/`: Comandos customizados e configurações globais para os testes.
- `node_modules/`: Dependências do projeto.
- `package.json`: Configurações e dependências do projeto.
- `cypress.config.js`: Configurações do Cypress.
- `eslint.config.mjs`: Configurações do ESLint.
- `.prettierrc`: Configurações do Prettier.
- `.prettierignore`: Arquivos e diretórios ignorados pelo Prettier.
- `.gitignore`: Arquivos e diretórios ignorados pelo Git.

## Pré-requisitos

- Node.js >= 21
- npm

## Instalação

1. Clone o repositório:
   ```sh
   git clonegit@github.com:lizarbventurim/picpay-loan-sre-interview-challenge.git
   cd picpay-test-qa-senior

rode o comando `npm install` para instalar as dependências do projeto.


### Scripts Disponíveis
- `npm run test`: Executa os testes E2E utilizando Cypress no terminal.
- `npm run open`: Abri o modo interativo do Cypress.
- `npm run format`: Formata o código utilizando Prettier.
- `npm run prepare`: Configura os hooks do Husky.

### Estrutura dos Testes
Os testes estão localizados no diretório e2e e são divididos em três arquivos principais:

- login_test.cy.js: Testa o login com um CPF válido.
- login_test_invalid_cpf.cy.js: Testa o login com um CPF inválido.
- login_test_cpf_null.cy.js: Testa o login sem inserir um CPF.

### Configurações do Cypress
As configurações do Cypress estão definidas no arquivo `cypress.config.js`. 
A base URL para os testes é  `https://meus-emprestimos.picpay.com`, e o navegador padrão é o Electron.


### ESLint e Prettier
O projeto utiliza ESLint para linting e Prettier para formatação de código. As configurações estão nos arquivos `eslint.config.mjs` e `.prettierrc`, respectivamente.

### Hooks do Git
O projeto utiliza Husky para configurar hooks do Git. O hook pre-commit formata o código e executa o ESLint nos arquivos JavaScript dentro do diretório cypress.