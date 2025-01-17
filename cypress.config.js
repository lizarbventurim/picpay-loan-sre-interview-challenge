const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://meus-emprestimos.picpay.com", // insere baseurl para ser utilizado em todos os testes
    video: true, // habilita gravação de vídeo
    defaultBrowser: "electron", // define o navegador padrão ao rodar o npn run test e ao abrir o cypress já abre por padrão o electron
    setupNodeEvents(on, config) {
      
    },
  },
});
