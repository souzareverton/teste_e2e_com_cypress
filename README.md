# Testes _end-to-end_ com Cypress

Como pré-condição é necessário ter o NodeJS e o GIT instalados

- [git](https://git-scm.com/downloads) (Foi utilizada a versão `2.34.1`)
- [Node.js](https://nodejs.org/en/) (Foi utilizada a versão `v18.15.0`)
- npm (Foi utilizada a versão `9.5.0` ), o npm é instalado junto com o NodeJS

Para executar os testes localmente, após realizar um fork e o download ou apenas o download, executar o comando:

npm install

É necessário realizar o cadastro no site do https://mailosaur.com/

Após isso, é necessário criar um arquivo cypress.env.json, seguindo o exemplo do arquivo cypress.env.example.json. Nele, o usuário deverá adicionar o Mailosaur server id e o mailosaur api key.

É possível executar com o comando npx cypress open ou npm run + um dos comandos da sessão script do package.json

Para executar os testes pela CI, com Cypress cloud:

É necessário criar uma conta no site do https://www.cypress.io/cloud

Após isso, adicionar o número do projeto no arquivo cypress.config.js e cadastrar na sessão de secrets nas configurações do reposítorio:

Mailosaur server id
Mailosaur api key
Email que será usado para logar na aplicação
Senha que será usado para logar na aplicação
Cypress record key

Conforme descrito no arquivo pipeline.yml
