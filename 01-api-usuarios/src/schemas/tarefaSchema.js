import { z } from 'zod'


export const idSchema = z.coerce.number().int().positive()


// model de tarefa
export const tarefaSchema = z.object({
    titulo: z
        .string({ error: "Titulo é obrigatório" })
        .trim()
        .min(1, "Titulo é obrigatório")
        .max(100, "Titulo pode ter no máximo 100 caracteres"),
    concluido: z
        .boolean().optional(),
})