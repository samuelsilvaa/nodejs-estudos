import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { formatarErrosZod } from '../schemas/usuarioSchema.js'

// Função de 4 parametros = rede de segurança global do Express
export const gerenciadorDeErros = (erro, req, res, next) => {

    // 1. captura erros do zod automaticamente
    if (erro instanceof z.ZodError) {
        const errosFormatados = formatarErrosZod(erro)
        return res.status(400).json({ erros: errosFormatados })
    }

    // JSON mal formado no corpo da requisição
    if (erro.type === 'entity.parse.failed') {
        return res.status(400).json({ erro: 'JSON inválido' })
    }

    // 2. captura automatica de email duplicados do prisma (POST/PUT/PATCH)
    if (erro.code === 'P2002') {
        return res.status(409).json({ erro: 'email já cadastrado' })
    }

    // 3. captura o erro de usuario nao encontrado
    if (erro.code === 'P2003') {
        return res.status(404).json({ erro: 'Usuário não encontrado' })
    }


    // 4. Registro nao encontrado (editar ou excluir um id que não existe)
    if (erro.code === 'P2025') {
        return res.status(404).json({ erro: 'Registro não encontrado' })
    };


    // token vencido, o primeiro a ser verificado
    if (erro instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ erro: 'Token expirado' })
    }

    // token inválido (assinatura errada, mal formado...)
    if (erro instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ erro: 'Token inválido' })
    }

    // 5. FALLBACK: QUALQUER ERRO NÃO MAPEADO CAI AQUI:
    console.error(erro)
    return res.status(500).json({ erro: 'erro no servidor interno' })
}