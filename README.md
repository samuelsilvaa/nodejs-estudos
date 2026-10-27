# Estudos de Node.js, Express, Prisma ORM & React

Repositório dedicado ao registro do meu aprendizado em **Node.js** e **React**, focado no desenvolvimento de APIs RESTful, integração com banco de dados usando o **Prisma ORM** e consumo da API por um front-end.

## 📁 Estrutura

```text
nodejs-estudos/
├── 01-api-usuarios/    # API REST (Express + Prisma + MySQL)
└── 02-front-usuarios/  # Front-end (React + Vite)
```

## 📚 Conteúdo & Aprendizados

### API (`01-api-usuarios`)

- [x] Servidor Express básico com ES Modules (`import/export`)
- [x] Estrutura e manipulação de verbos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- [x] Conexão com o MySQL (via Prisma ORM)
- [x] CRUD completo de usuários
- [x] **Relacionamento 1:N** entre usuários e tarefas (chave estrangeira, `onDelete: Cascade`)
- [x] CRUD de tarefas com rotas aninhadas por usuário
- [x] Validação de dados de entrada e de parâmetros de rota (`req.params`) com **Zod**
- [x] Arquitetura em camadas (routes, controllers, schemas, middlewares) sem `try/catch` redundantes nos controllers
- [x] **Middleware global de erros** centralizado para o Express 5
- [x] Tratamento automático de erros do Prisma (`P2002` dado duplicado, `P2003` chave estrangeira inválida e `P2025` registro não encontrado)
- [x] Respostas padronizadas com códigos HTTP apropriados (`200`, `201`, `204`, `400`, `404`, `409`, `500`)
- [x] **CORS** restrito ao front-end, configurado por variável de ambiente

### Front-end (`02-front-usuarios`)

- [x] Projeto React com Vite
- [x] Consumo da API com `fetch` e `async/await`
- [x] `useState` e `useEffect` (inclusive com dependência)
- [x] Formulários controlados (criar e editar no mesmo formulário)
- [x] Listar, criar, editar e excluir usuários
- [x] Painel de tarefas por usuário, em um componente próprio que recebe props
- [x] Mensagens de erro na tela, de acordo com o status da resposta (`400`, `404`, `409`, API fora do ar)
- [x] URL da API em variável de ambiente (`VITE_API_URL`)

### Próximos passos

- [ ] Autenticação (hash de senha, JWT e rotas protegidas)
- [ ] Refazer o projeto em TypeScript

## 🛣️ Rotas da API

| Método | Endereço | O que faz |
|---|---|---|
| `POST` | `/usuarios` | Cria um usuário |
| `GET` | `/usuarios` | Lista todos os usuários |
| `PUT` | `/usuarios/:id` | Atualização total do usuário |
| `PATCH` | `/usuarios/:id` | Atualização parcial do usuário |
| `DELETE` | `/usuarios/:id` | Remove o usuário (e as tarefas dele, em cascata) |
| `GET` | `/usuarios/:id/tarefas` | Lista as tarefas do usuário |
| `POST` | `/usuarios/:id/tarefas` | Cria uma tarefa para o usuário |
| `PUT` | `/tarefas/:id` | Edita uma tarefa |
| `DELETE` | `/tarefas/:id` | Remove uma tarefa |

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express 5**
- **Prisma ORM 6**
- **Zod**
- **MySQL**
- **React** + **Vite**
- **JavaScript (ES6+)**

## 🔧 Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- MySQL instalado e rodando

### 1. API

1. Clone o repositório e entre na pasta da API:

```bash
git clone https://github.com/samuelsilvaa/nodejs-estudos.git
cd nodejs-estudos/01-api-usuarios
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` a partir do exemplo:

```bash
copy .env.example .env
```
*(No Mac ou Linux, use: `cp .env.example .env`)*

4. Abra o `.env` e preencha as variáveis:

```text
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/api_usuarios"
FRONTEND_URL=http://localhost:5173
```

- `DATABASE_URL`: usuário, senha e nome do banco. Se a senha tiver caracteres especiais (`@`, `#`, `/`), eles precisam ser codificados (URL encoded).
- `FRONTEND_URL`: endereço do front-end liberado pelo CORS, **sem barra no final**.
- `PORT` (opcional): porta da API. Se não for definida, usa `3000`.

5. Crie as tabelas no banco com as migrations do Prisma:

```bash
npx prisma migrate dev
```
*Se o banco já existir e você só precisar gerar o Prisma Client, rode `npx prisma generate`.*
*Rode os comandos do Prisma dentro da pasta `01-api-usuarios`, onde ele está instalado.*

6. Inicie o servidor:

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

### 2. Front-end

Com a API rodando, abra **outro terminal**:

1. Entre na pasta do front e instale as dependências:

```bash
cd 02-front-usuarios
npm install
```

2. Crie o `.env` a partir do exemplo:

```bash
copy .env.example .env
```
*(No Mac ou Linux, use: `cp .env.example .env`)*

3. Confira que ele aponta para a API:

```text
VITE_API_URL=http://localhost:3000
```

4. Inicie o front:

```bash
npm run dev
```

Abra `http://localhost:5173` no navegador.