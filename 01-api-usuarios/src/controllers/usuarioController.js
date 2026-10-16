import { prisma } from '../lib/prisma.js'


// 1. Função de Criação (POST)
export const criarUsuario = async (req, res) => {
    const { nome, email } = req.body

    if (!nome || !email) {
        return res.status(400).json({ erro: "nome e email são obrigatórios" })
    }

    try {
        const usuario = await prisma.usuario.create({
            data: { nome, email }

        })

        res.status(201).json(usuario)

    } catch (erro) {
        if(erro.code === 'P2002') {
            return res.status(409).json({erro: "email já cadastrado"})
        }

        console.error(erro)
        return res.status(500).json({erro: "erro no servidor interno"})
    }

}


// 2. Função de Listagem (GET)
export const listarUsuarios = async (req, res) => {

    try {

        const usuarios = await prisma.usuario.findMany()

        res.status(200).json(usuarios)

    } catch(erro) {
        console.error(erro)
        return res.status(500).json({erro: "erro no servidor"})
    }
}


// 3. função de Delete (DELETE)
export const deletarUsuario = async (req, res) => {

    const id = Number(req.params.id) 
    
    if(!Number.isInteger(id)) { // verificar se o texto virou um número inteiro válido
        return res.status(400).json({erro: "Id inválido"})
    }


    try {
        await prisma.usuario.delete({
            where: { id }
        })

        res.status(204).send()

    } catch(erro) {

        if(erro.code === 'P2025') {
            return res.status(404).json({ erro: "Usuário não encontrado" })
        }

        console.error(erro)
        return res.status(500).json({ erro: "erro interno do servidor"})
    }
        
    
}


// 4. Função de Atualização Total (PUT)
export const atualizarUsuarioTotal = async (req, res) => {

    const id = Number(req.params.id) // id da url
    
    if(!Number.isInteger(id)) { 
        return res.status(400).json({ erro: "id inválido"})
    }

    const { nome, email } = req.body // pegando o nome e email do body
    
    if(!nome || !email) { // se faltou campos, return com 400
        return res.status(400).json({erro: "nome e email são obrigatórios"})
    }

    try {
        const usuario = await prisma.usuario.update({
            where: { id },
            data: { nome, email }
        })

        res.status(200).json(usuario)
    } catch (erro) {
        if(erro.code === 'P2025') {
            return res.status(404).json({erro: "Usuário não encontrado"})
        }

        if(erro.code === 'P2002') {
            return res.status(409).json({erro: "email já cadastrado" })
        }

        console.error(erro)
        return res.status(500).json({erro: "Erro no servidor interno"})
    }
    
}


// 5. Função de Atualização Parcial (PATCH)
export const atualizarUsuarioParcial = async (req, res) => {

    const id = Number(req.params.id) // . pegar o id que vem da url
    
    if(!Number.isInteger(id)) {
        return res.status(400).json({ erro: "id inválido" })
    };

    const { nome, email } = req.body // . pegar nome e email do body

    if(!nome && !email ) { // se o nome E o email não forem preenchidos (ou seja, se ambos vierem vazios)"
        return res.status(400).json({erro: "Pelo menos um dos campos deve ser enviado"})
    };

    try {
        const usuario = await prisma.usuario.update({
            where: { id },
            data: {nome,
                   email
                }
        })

        res.status(200).json(usuario)
    } catch (erro) {
        if(erro.code === 'P2025') {
            return res.status(404).json({ erro: "Usuário não encontrado" })
        }

        if(erro.code === 'P2002') {
            return res.status(409).json({ erro: "Esse email já existe" })
        }

        console.error(erro)
        res.status(500).json({ erro: "erro no servidor interno"} )

    }
};