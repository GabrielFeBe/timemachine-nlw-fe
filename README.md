# Maquina do tempo - FE

## Configurações do projeto

- Projeto feito no bootcamp da Rocketseat Ignite, para criar um FE para o projeto de gerenciamento de tempo de estudo.

- Projeto feito usando NextJS, Lucide React, Axios, DayJS, React Datepicker e usando Github como forma de autentificação para logar.

## Como rodar o projeto

- Para instalar o projeto, basta clonar o repositório e rodar o comando `npm install` para instalar as dependências.
- Apos isso, basta rodar o comando `npm run dev` para rodar o projeto em modo de desenvolvimento.

## Paginas

- `/` - Pagina inicial, onde o usuário pode logar com o Github, lembrando que a pagina inicial vai mudar se você estiver logado ou não, mostrando as memorias registradas para um usuario logado.
- `/memories/new` - Pagina onde o usuário pode criar uma nova memória, só acessivel a usuários autenticados.
- `/memories/:id` - Pagina onde o usuário pode ver uma memória especifica, só acessivel a usuários autenticados.
- `memories/:id/edit` - Pagina onde o usuário pode editar uma memória especifica, só acessivel a usuários autenticados.
