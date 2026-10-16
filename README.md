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

   1. Instale as dependências:
   ```bash
   npm install