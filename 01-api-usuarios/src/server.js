/*
app.post('/usuarios', ) cria um usuario
app.delete('/usuarios', ) deleta um usuario
app.put('/usuarios', ) substitui o recurso inteiro (você manda todos os campos)
app.patch('/usuarios', ) altera só alguns campos (você manda só o que mudou).
*/


import 'dotenv/config' // ativa o arquivo secreto logo de inicio
import cors from 'cors'
import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js' 
import { gerenciadorDeErros } from './middlewares/gerenciadorDeErros.js';

const app = express()
const PORT = process.env.PORT || 3000

// Apenas a liberação segura para o Front-end específico
app.use(cors({ origin: process.env.FRONTEND_URL }))

// Avisa o express para aceitar JSON no corpo (body) das requisições
app.use(express.json())

// Conecta as rotas de usuários ao nosso servidor principal
app.use(usuarioRoutes)

// Ativa a rede de segurança global (SEMPRE depois de todas as rotas!)
app.use(gerenciadorDeErros)

// inicializa o servidor na porta 3000
app.listen(PORT, () => {  
    // para que o link fique clicável corretamente no terminal do VS Code
    console.log(`servidor rodando com sucesso em http://localhost:${PORT}`)
})  
