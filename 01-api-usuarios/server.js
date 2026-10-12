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

const PORT = 3000
const users = []
let nextId = 1


//rota de criacao
app.post('/usuarios', (req, res) => {
    const {nome, email} = req.body

    if (!nome || !email) {
        return res.status(400).json({ erro: "nome e email são obrigátios" })
    }

    const usuario = { id: nextId, nome, email }
    users.push(usuario)

    res.status(201).json(usuario)   
});


app.get('/usuarios', (req, res) => {
    res.status(200).json(users)
})

// rota de delete
app.delete('/usuarios/:id', (req, res) => {
     
    const id = Number(req.params.id) 

    const indice = users.findIndex(user => user.id === id);

    if(indice === -1) {
        return res.status(404).json({ erro: "usuario nao encontrado" })
    }
    
    users.splice(indice, 1) 
    res.status(204).send()

})


app.listen(PORT)