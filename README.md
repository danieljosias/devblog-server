# DevBlog

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER-DevBlog](https://user-images.githubusercontent.com/77212802/198846853-a1e14df9-4f28-4468-9a2f-ee078ce48873.png)

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

Para autenticar o usuário basta fazer login na rota:  - [POST - /login](#11-login-do-usuário)

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
  - [POST - /users](#11-criação-do-usuário)
  - [GET - /users](#12-listando-usuário)
  
- [Login](#2-login)
  - [POST - /login](#21-login-do-usuário)
  
- [Posts](#3-posts)
  - [POST - /posts](#31-criação-do-post)
  - [GET - /posts](#32-listando-todos-os-posts)
  - [PATCH - /posts/:id](#14-atualizar-posts)
  - [DELETE - /posts/:id](#34-deletar-posts)

## Endpoints Resumo

### 1. /users

O objeto User é definido como:

| Campo       | Tipo   | Descrição                          |
| ----------- | ------ | ---------------------------------- |
| id          | string | Identificador único do usuário.    |
| name        | string | Nome do usuário.                   |
| email       | number | Email do usuário.                  |
| avatar      | number | Foto do usuário.                   |
| password    | string | Senha do usuário.                  |
| isActive    | boolean| Informa se o usuário está ativo    |
| createdAt   | Date   | Data que o usuário foi cadastrado. |
| updatedAt   | Date   | Data que o usuário foi atualizado. |

### Endpoints

| Método | Rota          | Descrição                                      | Autorizaçao | Adm |
| ------ | ------------- | ---------------------------------------------- | ----------- | --- |
| GET    | /users        | Lista todos os usuários.                       |             |     |
| POST   | /users        | Criação de um usuários.                        |             |     |

### 1.1. **Criação do Usuário**

### `/users`

### Exemplo de Request:

```
POST /users
Content-type: application/json
```

### Corpo da Requisição:

```json
{
	"name":"daniel",
	"email":"daniel@mail.com",
	"avatar":"https://media-exp1.licdn.com/dms/image/",
	"password":"123845678"
}
```

### Schema de Validação com Yup:

```javascript
name: yup.string().required(),
email: yup.string().email().required(),
avatar: yup.string().url().required(),
password: yup.string().min(9).required()
```

OBS.: Chaves não presentes no schema serão removidas e valores vazios ou nulos não serão aceitos.

### Exemplo de Response:

```
201 Created
```

```json
"users": {
		"id": "c49f9657-1151-49a4-bed7-c3344422e960",
		"name": "daniel",
		"email": "daniel@mail.com",
		"avatar": "https://media-exp1.licdn.com/dms/image",
		"isActive": true,
		"createdAt": "2022-09-24T19:43:29.054Z",
		"updatedAt": "2022-09-24T19:43:29.054Z"
	}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                  |
| --------------- | ------------------------------------------ |
| 400 bad request |  Email already exists                      |

---

### 1.2. **Listando usuários**

### `/users`

### Exemplo de Request:

```
GET /users
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
"users": [
	{
		"id": "de356fe8-177d-46b6-b8dc-c96f99dac28c",
		"name": "daniel",
		"email": "daniel@mail.com",
		"avatar": "https://avatars.githubusercontent.com/u/77212802?v=4",
		"isActive": true,
		"createdAt": "2022-10-04T20:17:41.107Z",
		"updatedAt": "2022-10-04T20:17:41.107Z"
	}
]
```

### 2. /login - Somente usuário faz login

| Método | Rota   | Descrição                           | Autorizaçao | Adm |
| ------ | ------ | ----------------------------------- | ----------- | --- |
| POST   | /login | Faz login do usuário e gera token.  |     X       |     |

### Possíveis Erros:

| Código do Erro  | Descrição                   |
| --------------- | --------------------------- |
| 403 Forbidden	  | Invalid email            	|
| 403 Forbidden   | Invalid password		|

### 3. /posts

O objeto Posts é definido como:

| Campo       | Tipo   | Descrição                          |
| ----------- | ------ | ---------------------------------- |
| id          | string | Identificador único do usuário.    |
| post        | string | Nome do usuário.                   |
| createdAt   | Date   | Data que o usuário foi cadastrado. |
| updatedAt   | Date   | Data que o usuário foi atualizado. |

### Endpoints

| Método   | Rota             | Descrição                                      | Autorizaçao | Adm |
| -------- | ---------------  | ---------------------------------------------- | ----------- | --- |
| GET      | /posts           | Lista todos os posts.                          |             |     |
| POST     | /posts           | Criação de um post.                            |      X      |     |
| PATCH    | /posts:id        | Atualização de um post.                        |      X      |     |
| DELETE   | /posts:id        | Deleção de um posts.                           |             |     |

### 3.1. **Criação do Post**

### `/posts`

### Exemplo de Request:

```
POST /posts
Content-type: application/json
```

### Corpo da Requisição:

```json
{
	"post":"testando a rota de criação de post"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
"posts": {
	"id": "9fcfa2b8-10ba-4c6a-b212-4ec8a5f7083a",
	"post": "testando a rota de criação de post",
	"user": {
	"id": "c49f9657-1151-49a4-bed7-c3344422e960",
	"name": "josias",
	"email": "josias@mail.com",
	"avatar": "https://media-exp1.licdn.com/dms/image",
	"password": "$2a$10$Q4G.R8L1WEt648SazHwVLexM1eNs5k/.tP2xFCbZjJ0V4scdsNgUy",
	"isActive": true,
	"createdAt": "2022-09-24T19:43:29.054Z",
	"updatedAt": "2022-09-24T19:43:29.054Z"
	}

}

```

### Possíveis Erros:

| Código do Erro  | Descrição                                  |
| --------------- | ------------------------------------------ |
| 400 bad request |  Invalid user id                   	       |


### 3.2. **Listando Posts**

### `/posts`

### Exemplo de Request:

```
GET /posts
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 Ok
```

```json

{
"posts": [
		{
			"id": "0a255d84-28c4-4ac1-850c-7f1b33e0db3f",
			"post": "Eu amo programação",
			"createdAt": "2022-10-08T18:14:08.462Z",
			"updatedAt": "2022-10-08T18:14:08.462Z",
			"user": {
				"id": "2413dd8c-fc5b-4b50-b8fe-537a301583b8",
				"name": "daniel",
				"email": "daneil@mail.com",
				"avatar": "https://th.bing.com/th/id/OIP.FA9XXm9JlmCzHxt_41WhsgHaIR?w=177&h=198&c=7&r=0&o=5&pid=1.7",
				"password": "$2a$10$3Hw0AGpCDWm7zG07qL3GieqUiCR65O83cSIAE7UCNqtwK1yg0EwXO",
				"createdAt": "2022-10-08T18:13:39.046Z",
				"updatedAt": "2022-10-08T18:13:39.046Z"
			}
		}
	[
}
```

### 3.3. **Atualizando Posts**

### `/posts`

### Exemplo de Request:

```
PATCH /posts
Content-type: application/json
```

### Corpo da Requisição:

```json

{
	"post":"atualizando o post"
}
```

### Exemplo de Response:

```
200 Ok
```

```json

{
"posts": {
	"id": "9fcfa2b8-10ba-4c6a-b212-4ec8a5f7083a",
	"post": "testando a rota de criação de post",
	"user": {
	"id": "c49f9657-1151-49a4-bed7-c3344422e960",
	"name": "josias",
	"email": "josias@mail.com",
	"avatar": "https://media-exp1.licdn.com/dms/image",
	"password": "$2a$10$Q4G.R8L1WEt648SazHwVLexM1eNs5k/.tP2xFCbZjJ0V4scdsNgUy",
	"isActive": true,
	"createdAt": "2022-09-24T19:43:29.054Z",
	"updatedAt": "2022-09-24T19:43:29.054Z"
	}

}
```

### 3.4. **Deletando Posts**

### `/posts`

### Exemplo de Request:

```
DELETE /posts/:id
Content-type: application/json
```

### Corpo da Requisição:
```json
vazio
```

### Exemplo de Response:

```
200 Ok
```
---
# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---
