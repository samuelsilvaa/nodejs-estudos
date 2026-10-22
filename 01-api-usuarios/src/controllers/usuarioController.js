import { z } from 'zod';
import { prisma } from '../lib/prisma.js'

import { usuarioSchema, formatarErrosZod, idParamsSchema, atualizarUsuarioSchema } from '../schemas/usuarioSchema.js'

// 1. Função de Criação (POST)
export const criarUsuario = async (req, res) => {
   // Se falhar aqui, o Zod joga o erro. O Express captura e manda pro Middleware!
    const { nome, email } = usuarioSchema.parse(req.body);

    // se o banco falhar por email duplicado, o prisma joga o erro e o express captura ele
    const usuario = await prisma.usuario.create({
        data: { nome, email }
    });

    // codigo de sucesso
    return res.status(201).json(usuario)

}


// 2. Função de Listagem (GET)
export const listarUsuarios = async (req, res) => {
        //Busca no banco, se falhar vai direto para o middleware
        const usuarios = await prisma.usuario.findMany()

        // resposta dos usuarios encontrados
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
        const { nome, email } = usuarioSchema.parse(req.body)

        const usuario = await prisma.usuario.update({
            where: { id },
            data: { nome, email }
        })

        res.status(200).json(usuario)

}


// 5. Função de Atualização Parcial (PATCH)
export const atualizarUsuarioParcial = async (req, res) => {

        // 1. pegando o id do params
        const { id } = idParamsSchema.parse(req.params)
        const { nome, email } = atualizarUsuarioSchema.parse(req.body)

        // 2. O Prisma executa a atualização direta
        const usuario = await prisma.usuario.update({
            where: { id },
            data: {
                nome,
                email
            }
        })

        // 3. Mando a resposta de sucesso
        res.status(200).json(usuario)
    
};