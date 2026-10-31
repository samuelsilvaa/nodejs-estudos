import { z } from 'zod';
import argon2 from 'argon2'
import { prisma } from '../lib/prisma.js'

import { usuarioSchema, idParamsSchema, atualizarUsuarioSchema } from '../schemas/usuarioSchema.js'

// 1. Função de Criação (POST)
export const criarUsuario = async (req, res) => {
    // Se falhar aqui, o Zod joga o erro. O Express captura e manda pro Middleware!
    const { nome, email, senha } = usuarioSchema.parse(req.body);

    // criando a senha hash
    const senhaHash = await argon2.hash(senha)


    // se o banco falhar por email duplicado, o prisma joga o erro e o express captura ele
    const usuario = await prisma.usuario.create({
        data: { nome, email, senha: senhaHash },
        select: { id: true, nome: true, email: true } // filtrando para não responder com a senha no corpo
    });

    // codigo de sucesso
    return res.status(201).json(usuario)

}


// 2. Função de Listagem (GET)
export const listarUsuarios = async (req, res) => {


    //Busca no banco, se falhar vai direto para o middleware
    const usuarios = await prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            email: true
        }
    })

    // resposta dos usuarios enc    ontrados
    res.status(200).json(usuarios)

}


// 3. função de Delete (DELETE)
export const deletarUsuario = async (req, res) => {

    const { id } = idParamsSchema.parse(req.params)


    await prisma.usuario.delete({
        where: { id }
    })

    res.status(204).send()

}


// 4. Função de Atualização Total (PUT)
export const atualizarUsuarioTotal = async (req, res) => {

    const { id } = idParamsSchema.parse(req.params)
    const { nome, email, senha } = usuarioSchema.parse(req.body)

    const senhaHash = await argon2.hash(senha)

    const usuario = await prisma.usuario.update({
        where: { id },
        data: { nome, email, senha: senhaHash },
        select: {
            id: true,
            nome: true,
            email: true
        }
    })

    res.status(200).json(usuario)

}


// 5. Função de Atualização Parcial (PATCH)
export const atualizarUsuarioParcial = async (req, res) => {

    // 1. pegando o id do params
    const { id } = idParamsSchema.parse(req.params)
    const { nome, email, senha } = atualizarUsuarioSchema.parse(req.body)

    let senhaHash

    if (senha !== undefined) {
        senhaHash = await argon2.hash(senha)
    }

    // 2. O Prisma executa a atualização direta
    const usuario = await prisma.usuario.update({
        where: { id },
        data: {
            nome,
            email,
            ...(senhaHash !== undefined && { senha: senhaHash })
        },
        select: {
            id: true,
            nome: true,
            email: true
        }
    })

    // 3. Mando a resposta de sucesso
    return res.status(200).json(usuario)

};