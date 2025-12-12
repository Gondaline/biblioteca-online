# Sistema de Gerenciamento de Livraria

Este é um sistema de gerenciamento de livraria desenvolvido com Node.js, Express e MongoDB, utilizando Mongoose para o mapeamento objeto-documento. O sistema permite o gerenciamento de livros, autores e editoras através de uma API RESTful.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript do lado do servidor
- **Express.js**: Framework web para Node.js
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM (Object Document Mapper) para MongoDB

## Estrutura do Projeto

```
mongodb/
├── package.json              
├── package-lock.json         
├── server/                   
│   ├── app.js                # Configuração principal do Express e rotas
│   ├── index.js              # Ponto de entrada da aplicação
│   └── src/                  
│       ├── config/           
│       │   ├── dbConnect.js  # Conexão com o MongoDB
│       ├── models/           
│       │   ├── Autor.js      # Modelo de dados para Autores
│       │   ├── Editora.js    # Modelo de dados para Editoras
│       │   └── Livro.js      # Modelo de dados para Livros
│       └── routes/           
│           ├── Autor.js      # Rotas para CRUD de Autores
│           ├── Editora.js    # Rotas para CRUD de Editoras
│           └── Livro.js      # Rotas para CRUD de Livros
```

## Descrição dos Arquivos

### Arquivo Principal
- **[`package.json`](package.json)**: Contém as dependências do projeto, scripts e metadados. Define as tecnologias utilizadas e configurações básicas.

### Configurações
- **[`server/index.js`](server/index.js)**: Ponto de entrada da aplicação. Responsável por:
  - Carregar variáveis de ambiente
  - Conectar ao banco de dados
  - Iniciar o servidor

- **[`server/app.js`](server/app.js)**: Configuração principal do Express. Define:
  - Middlewares (express.json())
  - Rotas da API (autores, livros, editoras)

### Configurações do Sistema
- **[`server/src/config/dbConnect.js`](server/src/config/dbConnect.js)**: Gerencia a conexão com o MongoDB utilizando Mongoose. Inclui tratamento de erros e logging.

### Modelos de Dados (Mongoose Schemas)
- **[`server/src/models/Autor.js`](server/src/models/Autor.js)**: Define o schema para autores com campos:
  - `nome`: String (obrigatório)
  - `nacionalidade`: String (obrigatório)
  - `qtd_livros_publicados`: Number (obrigatório)

- **[`server/src/models/Editora.js`](server/src/models/Editora.js)**: Define o schema para editoras com campos:
  - `nome`: String (obrigatório)
  - `pais`: String (obrigatório)
  - `anoFuncao`: Date (obrigatório)

- **[`server/src/models/Livro.js`](server/src/models/Livro.js)**: Define o schema para livros com campos:
  - `titulo`: String (obrigatório, único)
  - `editora`: String (obrigatório)
  - `paginas`: Number (opcional)
  - `preco`: Number (opcional)

### Rotas da API REST
- **[`server/src/routes/Autor.js`](server/src/routes/Autor.js)**: Endpoints para gerenciamento de autores:
  - `GET /autores` - Listar todos os autores
  - `POST /autores` - Criar novo autor
  - `PUT /autores/:id` - Atualizar autor
  - `DELETE /autores/:id` - Deletar autor

- **[`server/src/routes/Editora.js`](server/src/routes/Editora.js)**: Endpoints para gerenciamento de editoras:
  - `GET /editoras` - Listar todas as editoras
  - `POST /editoras` - Criar nova editora
  - `PUT /editoras/:id` - Atualizar editora
  - `DELETE /editoras/:id` - Deletar editora

- **[`server/src/routes/Livro.js`](server/src/routes/Livro.js)**: Endpoints para gerenciamento de livros:
  - `GET /livros` - Listar todos os livros
  - `POST /livros` - Criar novo livro
  - `PUT /livros/:id` - Atualizar livro
  - `DELETE /livros/:id` - Deletar livro

## Instalação e Execução

### Pré-requisitos
- Node.js (versão 14+)
- MongoDB instalado ou acesso a um serviço MongoDB Atlas

### Passos para Instalação

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd mongodb
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env` e ajuste as configurações conforme necessário:
     ```
     MONGO_URL=mongodb+srv://seu_usuario:sua_senha@cluster0.seudominio.mongodb.net/livraria
     PORT=3000
     ```

4. **Inicie o servidor:**
   ```bash
   npm start
   ```

O servidor será iniciado na porta definida na variável `PORT` (padrão: 3000).

## Endpoints da API

### Autores
- `GET /autores` - Retorna todos os autores
- `POST /autores` - Cria um novo autor
  ```json
  {
    "nome": "Nome do Autor",
    "nacionalidade": "Nacionalidade",
    "qtd_livros_publicados": 5
  }
  ```
- `PUT /autores/:id` - Atualiza um autor existente
- `DELETE /autores/:id` - Remove um autor

### Editoras
- `GET /editoras` - Retorna todas as editoras
- `POST /editoras` - Cria uma nova editora
  ```json
  {
    "nome": "Nome da Editora",
    "pais": "País",
    "anoFuncao": "2020-01-01"
  }
  ```
- `PUT /editoras/:id` - Atualiza uma editora existente
- `DELETE /editoras/:id` - Remove uma editora

### Livros
- `GET /livros` - Retorna todos os livros
- `POST /livros` - Cria um novo livro
  ```json
  {
    "titulo": "Título do Livro",
    "editora": "Nome da Editora",
    "paginas": 200,
    "preco": 29.90
  }
  ```
- `PUT /livros/:id` - Atualiza um livro existente
- `DELETE /livros/:id` - Remove um livro

## Funcionalidades

- **CRUD Completo**: Operações de Create, Read, Update e Delete para todas as entidades
- **Validação de Dados**: Utilização de schemas do Mongoose para validação
- **Tratamento de Erros**: Respostas HTTP adequadas com mensagens de erro
- **Conexão com MongoDB**: Gerenciamento eficiente da conexão com o banco de dados
- **API RESTful**: Seguimento dos princípios REST para design de APIs

## Observações

- Todos os modelos utilizam `versionKey: false` para desabilitar o campo `__v` do Mongoose.
- A aplicação utiliza módulos ES6 (import/export) devido à configuração `"type": "module"` no [`package.json`](package.json).

## Autor

*Vinícius Gondaline Silva*