import { z } from 'zod';

// molde de criar usuarios
export const usuarioSchema = z.object({
    nome: z
        .string({error: 'O nome é obrigatório'})
        .trim()
        .min(3, 'Seu nome deve ter pelo menos 3 caracteres'),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email({
            error: 'Email inválido'
        })),
    senha: z
        .string({error: 'Senha é obrigatória'})
        .min(15, 'A senha deve ter no minimo 15 caracteres')
        .max(128, 'A senha deve ter no máximo 128 caracteres')
});     

// funcao para formatar os erros sem precisar do 'z' dentro do controller e manter ele limpo
export const formatarErrosZod = (error) => {
  return z.flattenError(error).fieldErrors;
};


//molde para validadar o id que vai na url
// util para: GET(um), DELETE, PATCH E PUT
export const idParamsSchema = z.object({
    id: z.string().transform(Number)
})

// molde para o patch, para dizer que todos os campos do usuarioSchema viram opcionais de uma vez só
export const atualizarUsuarioSchema = usuarioSchema.partial();
