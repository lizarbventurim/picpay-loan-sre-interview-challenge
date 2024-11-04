# Desafio SRE PicPay Empréstimos

Obrigado pelo interesse em fazer parte do nosso time! Preparamos este desafio com carinho para ajudar a entender um pouco mais dos seus conhecimentos na área de DevOps/SRE

Se não entender algum conceito ou parte do problema, não é motivo para se preocupar! Queremos que faça o desafio até onde souber.

No mais, divirta-se :D

## Avisos antes de começar

- Leia com atenção este documento todo e tente seguir ao **máximo** as instruções;
- Crie um repositório no seu GitHub **sem citar nada relacionado ao PicPay**;
- Faça seus commits no seu repositório;
- Envie o link do seu repositório para o email **do recrutador responsável**;
- Dê uma olhada nos [Links Úteis](#links-úteis);
- Dê uma olhada em como será a [entrevista](#para-o-dia-da-entrevista-técnica);
- Fique à vontade para perguntar qualquer dúvida aos recrutadores;

## Conteúdo do repositório

Este projeto é um exemplo bem simples de aplicação web full-stack, utilizando uma arquitetura de microsserviços com um BFF em **Go** para otimizar a comunicação entre o frontend e o backend. O backend em **Java** interage com um banco de dados MySQL para armazenar e recuperar os dados, enquanto o frontend em **React** é responsável pela interface do usuário.

Você pode subir o banco de dados MySQL utilizando o arquivo **./docker-compose.yaml** e pode ser inicializado utilizando o **./init.sql**

Alguns exemplos de requisição estão no arquivo **./requests.http**

### Váriaveis de Ambiente

|Aplicação|Key|Default|Description|Exemplo|
|-|-|-|-|-|
|backend|DB_URL|n/a|Define a URL de conexão com o banco de dados.|mysql://user:password@host:port/database|
|backend|DB_USERNAME|n/a|Especifica o nome de usuário utilizado para autenticar a conexão com o banco de dados.|myuser|
|backend|DB_PASSWORD|n/a|Contém a senha associada ao nome de usuário para a conexão com o banco de dados.|mypassword123|
|backend|JWT_SECRET_KEY|n/a|É uma chave secreta utilizada para gerar e verificar tokens JWT (JSON Web Tokens).|averylongandsecuresecretkey|
|bff|PORT|8085|Porta de exposição do BFF.|n/a|
|bff|API_URL|http://localhost:8080|URL de exposição do backend.|n/a|
|bff|CLIENT_ID|n/a|Identifica um cliente em um sistema de autenticação OAuth.|bff|
|bff|CLIENT_SECRET|n/a|É uma chave secreta associada ao Client ID, utilizada para verificar a identidade do cliente durante o processo de autenticação OAuth.|averylongandsecureclientsecret|

# Avaliação

## O que deve ser feito?

- Ajustes que fazem todas as aplicações subirem e se comunicarem;
- Colete as métricas expostas pela aplicação backend, seria legal também exibilas em algum dashboard;
- Colete e armazene os logs das aplicações;
- Um README contendo os seus pensamentos ao longo do projeto;
- Um desenho contendo os serviços que explique o funcionamento;


Faça commits ao longo do processo, queremos entender o seu modo de pensar! :)

Para a entrevista, separe também anotações contendo melhorias que faria em cada aplicação ou na arquitetura em geral. Não envie estas anotações na pull request.

## O que será avaliado e valorizamos :heart:
## O que NÃO será avaliado :warning:
## O que será um Diferencial


## Links Úteis

- https://docs.spring.io/spring-boot/reference/actuator/metrics.html
- https://github.com/open-telemetry/opentelemetry-java-instrumentation
- https://12factor.net/
- https://docs.docker.com/reference/dockerfile/
- https://docs.docker.com/compose/
- https://pt-br.legacy.reactjs.org/docs/getting-started.html
- https://doubletapp.medium.com/overview-of-monitoring-system-with-prometheus-and-grafana-9ce6501eff88
- https://www.elastic.co/pt/blog/getting-started-with-the-elastic-stack-and-docker-compose