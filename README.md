<p align="center">
    <img alt="node" title="#node" src="https://ourcodeworld.com/public-media/articles/articleocw-57e57b89889ad.png" width="400px" />
</p>

<h3 align="center">
  Backend da aplicação
</h3>

<blockquote align="center">“Trabalhe naquilo que goste, que não trabalhara nenhum dia da sua vida”!</blockquote>

# Event

Projeto desenvolvido para processo seletivo
Trata-se de uma aplicação web

# Guia

[Funcionalidades](#rocket-funcionalidades)&nbsp;&nbsp;|&nbsp;&nbsp;
[Começando](#runner-começando)&nbsp;&nbsp;|&nbsp;&nbsp;
[Instalação](#construction_worker-instalação)&nbsp;&nbsp;|&nbsp;&nbsp;
[Tecnologias](#satellite-tecnologias)&nbsp;&nbsp;|&nbsp;&nbsp;
[Endpoints](#cyclone-endpoints)&nbsp;&nbsp;|&nbsp;&nbsp;

## :rocket: Funcionalidades

* 👩  Cadastrar e Logar com Usuario.
* 🍕  Listar, Criar, Editar e deletar evento.
* 📨  Permitir que outros usuarios participem do evento.
* 🌏  Permitir que somente datas futuras sejam cadastradas nao datas passadas.
* 🎨  Nao permitir que sejam criados eventos com mesmo nome.

## :runner: Começando
As instruções a seguir são para fornecer uma cópia deste projeto que poderá ser executada na sua máquina local para fins de desenvolvimento e teste.

### Pré Requisitos

* É necessário que você tenha o `Node.js` instalado em sua máquina. 

## :construction_worker: Instalação

Clonando este repositório em sua máquina local e acessaando a pasta do projeto:

```bash
git clone https://github.com/DavilsonJunior/event-backend
cd event-backend
```

Instalando as dependências do backend da aplicação:

```bash
npm install ou yarn install```
```

## :satellite: Tecnologias

* [Node.js](https://nodejs.org/) - Usado para construir o backend (webservice REST) do projeto
* [express](https://expressjs.com/) - Framework Web utilizado no backend
* [sequelize](http://sequelize.org/) - ORM usado no backend para auxiliar no versionamento do banco de dados
* [postgreSQL](https://www.postgresql.org/) - Banco de dados utilisado no backend para peristência dos dados
* [date-fns](https://date-fns.org/) - Para tratamento de datas

## :cyclone: Endpoints
### Rotas da aplicação

Agora que você já está com o projeto clonado, e pronto para continuar, listarei alguns endpoints para testes ou usar no frontend

`Rotas destinadas ao usuario:`

- **`GET /users`**: A rota que listara todos os usuarios da aplicacao.

- **`POST /users`**: A rota cadastrara um novo usuario. A rota deve receber os dados em json, `name`, a `email` e  `password`.

- **`POST /sessions`**: A rota que fara a autenticacao do usuario. A rota deve receber os dados em json, `email` e  `password`

`Rotas destinadas a o evento:`

- **`GET /events`**: A rota que listara todos os eventos da aplicacao.

- **`GET /events/user`**: A rota que listara todos os eventos relacionadas a um unico usuario.

- **`POST /events`**: A rota que cadastrara um novo evento relacionado ao usuario. A rota deve receber os dados em json, `description`, a `date_initial` e  `date_final`.

- **`PUT /events/:idevent`**: A rota que atualizara o evento do usuario, onde `idevent` seria o id do evento da atualizacao. A rota deve receber os dados em json, `description`,  `date_initial`,  `date_final`, nao eh necessario passar os tres parametros, so o que sera atualizado.


- **`DELETE /events/:idevent`**: A rota que deletara o evento do usuario, onde `idevent` seria o id do evento para deletar, entretanto, na verdade nao removera o item do banco e sim adicionara uma data de cancelamento, assim que essa funcao for concluida, removera o evento criado para que outros usuarios se cadastrem.

`Rotas extras para que usuarios possam se cadastrar no evento de outro usuario:`

- **`GET /events/user/registered`**: A rota listara todos os eventos que o usuario se cadastrou, sendo que ao criar o evento dele, automaticamente ele se cadastra no evento.

- **`POST /events/:idevent/register`**: A rota que permitira um usuario se cadastrar em um evento de outro onde `idevent` seria o id do evento.


Confira a lista completa de libs utilizadas no arquivo `package.json`, presente na pasta raiz do projeto.

Feito com ♥ por [Davilson Junior](https://www.linkedin.com/in/davilson-paulino-da-cunha-junior-23029315a/)
