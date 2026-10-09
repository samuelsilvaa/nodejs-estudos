/*
    CRIAR UMA API DE usuarios

       [x] CRIAR UM USUARIO
       [] LISTAR TODOS OS USUARIOS~
       [] EDITAR O USUARIO
       [] DELETAR O USUARIO

*/

/*
app.post('/usuarios', ) cria um usuario
app.delete('/usuarios', ) deleta um usuario
app.put('/usuarios', ) substitui o recurso inteiro (você manda todos os campos)
app.patch('/usuarios', ) altera só alguns campos (você manda só o que mudou).
*/


import express from 'express'

// dentro do "app" tem tudo que posso usar do express
const app = express()
app.use(express.json())

const users = []


app.post('/usuarios', (req, res) => {
    users.push(req.body) //mandando os users para a variavel users, direto do body

    res.send('ok, post')
})

// criando uma rota: 
app.get('/usuarios', (req, res) => {
    res.status(200).json(users) // mandando os usuarios em json
})

app.listen(3000)