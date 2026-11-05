import { prisma } from '../lib/prisma.js';
import { idSchema, tarefaSchema } from '../schemas/tarefaSchema.js';


// função de criar tarefas
export const criarTarefa = async (req, res) => {
    const usuarioId = req.usuario.id
    const { titulo, concluido } = tarefaSchema.parse(req.body)

    const tarefa = await prisma.tarefa.create({
        data: { titulo, concluido, usuarioId }
    });

    return res.status(201).json(tarefa)

}

// função de listar Tarefa
export const listarTarefa = async (req, res) => {
    const usuarioId = req.usuario.id
    
    const tarefas = await prisma.tarefa.findMany({
        where: { usuarioId },
        orderBy: { id: 'asc' },
    })

    return res.status(200).json(tarefas)

}


// função de editar tarefa
export const editarTarefa = async (req, res) => {
    const id = idSchema.parse(req.params.id)
    const usuarioId = req.usuario.id
    const { titulo, concluido } = tarefaSchema.parse(req.body)

    const tarefa = await prisma.tarefa.update({
        where: {id, usuarioId},
        data: { titulo, concluido }
    })

    return res.status(200).json(tarefa)
}


// funcao de deletar tarefa
export const deletarTarefa = async (req, res) => {
    const id = idSchema.parse(req.params.id)
    const usuarioId = req.usuario.id

    await prisma.tarefa.delete({
        where: {id, usuarioId},
    });

    return res.status(204).send()
}