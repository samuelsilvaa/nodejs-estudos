import { z } from 'zod'

// schema do Login
export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email({
            error: "Email inválido"
        })),
    senha: z
        .string({ error: 'Senha é obrigatória' })
        .min(1, 'Senha é obrigatória')
        .max(128, 'A senha deve ter no máximo 128 caracteres')
});