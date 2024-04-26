# Teste Back-end Junior para MKS Desenvolvimento de Sistemas

Descrição breve do projeto:

## Instalação

Certifique-se de ter o Node.js e o npm instalados em sua máquina.

1.  Clone este repositório.
2.  Instale as dependências usando o comando:

```bash
npm install
```
Configuração

Antes de iniciar o servidor, é necessário configurar algumas variáveis de ambiente.

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

```dotenv
PORT=3000
JWT_SECRET=seu_token_secreto
DB_HOST=seu_host_do_banco_de_dados
DB_PORT=porta_do_banco_de_dados
DB_USERNAME=seu_usuario_do_banco_de_dados
DB_PASSWORD=sua_senha_do_banco_de_dados
```
---
Executando o Servidor
Para iniciar o servidor localmente, execute o seguinte comando:
```
bash
npm run start:dev
```
---
#### O servidor estará acessível em http://localhost:3000.
## "/" Rota do Swagger
---

#### Rotas da API
A API possui as seguintes rotas:

### Rota de Criação de Usuário (POST)
Descrição: Cria um novo usuário no sistema. A senha deve ter pelo menos 6 caracteres e conter números e letras.

URL: /api/users 

Método: POST

Corpo da Requisição:
```
json
{
    "username" :"string",
    "email":"string",
    "password":"string",
}

Exemplo de Dados:
json
{
    "username": Wendel",
    "email""wendel@aaa.com",
    "password":"abc123456"
}
```

----

### Rota de Login (POST)
Descrição: Autentica um usuário e gera um token JWT.
URL: /api/auth/login
Método: POST
```
Corpo da Requisição:
json
{
    "username" :"string",
    "password":"string",
}

Exemplo de Dados:
json
{
    "username": Wendel",
    "password":"abc123456"
}
```
---
### Rotas Protegidas
Exemplo de rota protegida que requer autenticação com JWT.
Header da Requisição:


### Authorization: Bearer <Seu_Token_JWT>

Criar Filme (POST)
Descrição: Cria um novo filme no sistema.
URL: /movies
Método: POST
Parâmetros de Rota:

```id:"string"```

Corpo da Requisição:
```
json
{
    "title": "string",
    "director": "string",
    "description": "string",
    "first_aired": "string",
    "genres": ["string"],
    "original_title": "string",
    "overview": "string",
    "poster_path": "string",
    "contentType": "string"
  }
  ```
```
Exemplo de novo filme:
{
    "title": "Filme de Exemplo",
    "director": "Diretor Exemplo",
    "description": "Descrição do Filme",
    "first_aired": "2022-01-01",
    "genres": ["Ação", "Aventura"],
    "original_title": "Original Title",
    "overview": "Visão geral do filme",
    "poster_path": "/caminho/do/poster.jpg",
    "contentType": "Movie"
}
```
---
### Atualizar Filme (PATCH)
Descrição: Atualiza os detalhes de um filme existente.
URL: /movies/:id
Método: PATCH
Parâmetros de Rota:

```id:"string"```

Exemplo de Dados:
```
json
{
    "title": "string",
    "director": "string",
    "description": "string",
    "first_aired": "string",
    "genres": ["string"],
    "original_title": "string",
    "overview": "string",
    "poster_path": "string",
    "contentType": "string"
}
```

```
  Exemplo de edição: 
{
    "title": "Filme de Exemplo",
    "director": "Diretor Exemplo",
    "description": "Descrição do Filme",
    "first_aired": "2022-01-01",
    "genres": ["Ação", "Aventura"],
    "original_title": "Original Title",
    "overview": "Visão geral do filme",
    "poster_path": "/caminho/do/poster.jpg",
    "contentType": "Movie",
}
```

---

Excluir Filme (DELETE)
Descrição: Exclui um filme do sistema.
URL: /movies/:id
Método: DELETE
Parâmetros de Rota:

```
 id:"string"
```

---
## Fique à vontade para explorar e testar as rotas usando o Swagger.
---
