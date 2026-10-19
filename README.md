# Estudos de Node.js, Express & Prisma ORM 🚀

Repositório dedicado ao registro do meu aprendizado em **Node.js** e **Express**, focado no desenvolvimento de APIs RESTful e integração com banco de dados usando o **Prisma ORM**.

## 📌 Conteúdo & Aprendizados

- [x] Servidor Express básico com ES Modules (`import/export`)
- [x] Estrutura e manipulação de verbos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- [x] Conexão com o MySQL (via Prisma ORM)
- [x] CRUD Completo de Usuários:
  - [x] `POST /usuarios` - Criar usuário com validação de dados
  - [x] `GET /usuarios` - Listar todos os usuários
  - [x] `PUT /usuarios/:id` - Atualização total de dados
  - [x] `PATCH /usuarios/:id` - Atualização parcial flexível
  - [x] `DELETE /usuarios/:id` - Remoção de usuário
- [x] Validação de parâmetros (`req.params`) e tipos de dados
- [x] Tratamento de erros do Prisma (`P2002` para dados duplicados e `P2025` para não encontrado)
- [x] Respostas padronizadas com códigos de status HTTP apropriados (`200`, `201`, `204`, `400`, `404`, `409`, `500`)

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Prisma ORM**
- **MySQL**
- **JavaScript (ES6+)**

## 🔧 Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- MySQL instalado e rodando
- Yarn instalado

### Passo a passo

1. Clone o repositório e entre na pasta do projeto:

```bash
   git clone https://github.com/samuelsilvaa/nodejs-estudos.git
   cd nodejs-estudos/01-api-usuarios
```

2. Instale as dependências:

```bash
   yarn install
```

3. Crie o arquivo `.env` a partir do exemplo:

```bash
   copy .env.example .env
```

   (no Mac ou Linux: `cp .env.example .env`)

4. Abra o `.env` e preencha a `DATABASE_URL` com o seu usuário, senha e nome do banco:

```
   DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/api_usuarios"
```

   Se a senha tiver caracteres especiais (`@`, `#`, `/`), eles precisam ser codificados na URL.

5. Crie o banco e a tabela com a migration do Prisma:

```bash
   yarn prisma migrate dev
```

6. Inicie o servidor:

```bash
   yarn dev
```

A API fica disponível em `http://localhost:3000`.

## 📡 Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/usuarios` | Cria um usuário |
| `GET` | `/usuarios` | Lista todos os usuários |
| `PUT` | `/usuarios/:id` | Atualiza todos os dados de um usuário |
| `PATCH` | `/usuarios/:id` | Atualiza parte dos dados de um usuário |
| `DELETE` | `/usuarios/:id` | Remove um usuário |

Exemplo de body para criar ou atualizar (JSON):

```json
{
  "nome": "Ana Souza",
  "email": "ana@exemplo.com"
}
```