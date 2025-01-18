const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://meus-emprestimos.picpay.com', // insere baseurl para ser utilizado em todos os testes
    video: true, // habilita gravação de vídeo
    defaultBrowser: 'electron', // define o navegador padrão ao rodar o npn run test e ao abrir o cypress já abre por padrão o electron
    viewportWidth: 1280, // seta a largura da tela
    viewportHeight: 720, // seta a altura da tela
    setupNodeEvents(on, config) {},
  },
})
