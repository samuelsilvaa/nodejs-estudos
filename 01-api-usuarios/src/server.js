/*
app.post('/usuarios', ) cria um usuario
app.delete('/usuarios', ) deleta um usuario
app.put('/usuarios', ) substitui o recurso inteiro (você manda todos os campos)
app.patch('/usuarios', ) altera só alguns campos (você manda só o que mudou).
*/


import 'dotenv/config' // ativa o arquivo secreto logo de inicio
import cors from 'cors'
import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js' // Importando o roteador que criei na pasta routes

// dentro do "app" tem tudo que posso usar do express
const app = express()
const PORT = process.env.PORT || 3000

// para pode liberar a api a mandar informacoes ao front end
app.use(cors())

//usado para liberar o front
app.use(cors({ origin: process.env.FRONTEND_URL }))

// Avisa o express para aceitar JSON no corpo (body) das requisições
app.use(express.json())

// Conecta as rotas de usuários ao nosso servidor principal
app.use(usuarioRoutes)


// inicializa o servidor na porta 3000
app.listen(PORT, () => {
    console.log(`servidor rodando com sucesso em http://usuarios:${PORT}`)
})  