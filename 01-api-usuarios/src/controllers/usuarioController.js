import { z } from 'zod';
import { prisma } from '../lib/prisma.js'

import { usuarioSchema, formatarErrosZod, idParamsSchema, atualizarUsuarioSchema } from '../schemas/usuarioSchema.js'

// 1. Função de Criação (POST)
export const criarUsuario = async (req, res) => {
    // executa a validação segura
    const resultado = usuarioSchema.safeParse(req.body)

    // se a validação falhar:
    if(!resultado.success) {
        //Transforma o ZodError em um objeto limpo por campo usando o helper global
        const erros = formatarErrosZod(resultado.error)

        return res.status(400).json({erros});
    };

    const {nome, email} = resultado.data;

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

    const resultDelete = idParamsSchema.safeParse(req.params)
    
    // se a validação falhar
    if(!resultDelete.success) {
        const errosDelete = formatarErrosZod(resultDelete.error) // formatar o erro que vem do resultDelete

        return res.status(400).json(errosDelete)
    }

    const { id } = resultDelete.data

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

    const resultPut = idParamsSchema.safeParse(req.params)
    const reqValidacao = usuarioSchema.safeParse(req.body)
    
    if(!resultPut.success || !reqValidacao.success) {
        const erros = !resultPut.success 
            ? formatarErrosZod(resultPut.error) 
            : formatarErrosZod(reqValidacao.error);

        return res.status(400).json({ erros })
    };

    const { id } = resultPut.data;
    const { nome, email } = reqValidacao.data;

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

    const resultPatch = idParamsSchema.safeParse(req.params)
    const reqValidacao = atualizarUsuarioSchema.safeParse(req.body)

    
    if(!resultPatch.success || !reqValidacao.success) {
        const erros = !resultPatch.success 
            ? formatarErrosZod(resultPatch.error) 
            : formatarErrosZod(reqValidacao.error);

        return res.status(400).json({erros})
    };

    const { id } = resultPatch.data; // pegar o id
    const { nome, email } = reqValidacao.data; // . pegar nome e email

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