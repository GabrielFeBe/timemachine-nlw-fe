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

## API

- Lembrando que esse projeto é conectado ou `Maquina do tempo - BE`, que é a API que sgerencia as memorias.
- A conexão é feita atraves do arquivo `src/lib/api.ts`, onde é definido a url base da API.
- A URL muda de acordo com a porta que o projeto esta rodando, se for em modo de desenvolvimento, a url base é `http://localhost:3333`, se for em produção a url depende do dominio que o projeto esta rodando, também é bom mencionar que ao rodar em produção temos que fazer a configuração do CORS no BE.
