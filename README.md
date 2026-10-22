# Estudos de Node.js, Express & Prisma ORM 

Repositório dedicado ao registro do meu aprendizado em **Node.js** e **Express**, focado no desenvolvimento de APIs RESTful e integração com banco de dados usando o **Prisma ORM**.

##  Conteúdo & Aprendizados

- [x] Servidor Express básico com ES Modules (`import/export`)
- [x] Estrutura e manipulação de verbos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- [x] Conexão com o MySQL (via Prisma ORM)
- [x] CRUD Completo de Usuários:
  - [x] `POST /usuarios` - Criar usuário com validação de dados
  - [x] `GET /usuarios` - Listar todos os usuários
  - [x] `PUT /usuarios/:id` - Atualização total de dados
  - [x] `PATCH /usuarios/:id` - Atualização parcial flexível
  - [x] `DELETE /usuarios/:id` - Remoção de usuário
- [x] Validação de dados de entrada e esquemas de dados com **Zod**
- [x] Validação de parâmetros de rota (`req.params`) para proteção de IDs
- [x] Arquitetura de código limpo com eliminação de `try/catch` redundantes nos controllers
- [x] Criação de **Middleware Global de Erros** centralizado para o Express 5
- [x] Tratamento automático de erros do Prisma (`P2002` para dados duplicados e `P2025` para não encontrado)
- [x] Respostas padronizadas com códigos de status HTTP apropriados (`200`, `201`, `204`, `400`, `404`, `409`, `500`)

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Prisma ORM**
- **Zod**
- **MySQL**
- **JavaScript (ES6+)**

## 🔧 Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- MySQL instalado e rodando

### Passo a passo

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

4. Abra o `.env` e preencha a `DATABASE_URL` com o seu usuário, senha e nome do banco:

```text
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/api_usuarios"
```
*Se a sua senha tiver caracteres especiais (`@`, `#`, `/`), eles precisam ser codificados (URL encoded).*

5. Crie a tabela no banco com a migration do Prisma:

```bash
npx prisma migrate dev
```
*Se o banco já existir e você só precisar gerar o Prisma Client, rode `npx prisma generate`.*

6. Inicie o servidor:

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3000`.