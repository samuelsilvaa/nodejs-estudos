
// O array e o contador agora moram aqui dentro do cérebro da aplicação
const users = []
let nextId = 1

// 1. Função de Criação (POST)
export const criarUsuario = (req, res) => {
    const { nome, email } = req.body

    if (!nome || !email) {
        return res.status(400).json({ erro: "nome e email são obrigatórios" })
    }

    const usuario = { id: nextId++, nome, email }
    users.push(usuario)

    res.status(201).json(usuario)   
}


// 2. Função de Listagem (GET)
export const listarUsuarios = (req, res) => {
    res.status(200).json(users)
}


// rota de delete (DELETE)
export const deletarUsuario = (req, res) => {
    const id = Number(req.params.id) 
    const indice = users.findIndex(user => user.id === id)

    if (indice === -1) {
        return res.status(404).json({ erro: "usuario nao encontrado" })
    }
    
    users.splice(indice, 1) 
    res.status(204).send()
}


// 4. Função de Atualização Total (PUT)
export const atualizarUsuarioTotal = (req, res) => {

    const id = Number(req.params.id) // 1. id da url
    const { nome, email } = req.body // 2. nome e email do body
    const indice = users.findIndex(user => user.id === id) // 3. procurar indice no array


    if(indice === -1) { // 4. nao achou, return com 404
        return res.status(404).json({erro: "usuario nao encontrado"})
    };

    if(!nome || !email) { // 5. se faltou campos, return com 400
        return res.status(400).json({erro: "nome e email são obrigatórios"})
    }

    users[indice] = { id, nome, email } // 6. substituir o usuário em users[indice]

    res.status(200).json(users[indice]) // 7. responder 200 com o usuario atualizado

}


// 5. Função de Atualização Parcial (PATCH)
export const atualizarUsuarioParcial = (req, res) => {

    const id = Number(req.params.id) // 1. pegar o id que vem da url
    const { nome, email } = req.body // 2. pegar nome e email do body
    const indice = users.findIndex(user => user.id === id) // 3. pegar o indice do usuario no array


    if(indice === -1) { // 4. se o usuario nao estiver no array, return com 404
        return res.status(404).json({erro: "usuario não encontrado"})
    };

    if(!nome && !email ) { // 5. se o nome E o email não forem preenchidos (ou seja, se ambos vierem vazios)"
        return res.status(400).json({erro: "Pelo menos um dos campos deve ser enviado"})
    };

    if(nome) { // se for preenchido o nome, users recebe nome
        users[indice].nome = nome
    };

    if(email) { // se for preenchido o email, users recebe email
        users[indice].email = email
    };

    res.status(200).json(users[indice]) // resposta 200, deu tudo certo

};