import { z } from 'zod'
import { formatarErrosZod } from '../schemas/usuarioSchema.js'

// Função de 4 parametros = rede de segurança global do Express
export const gerenciadorDeErros = (erro, req, res, next) => {

    // 1. captura erros do zod automaticamente
    if(erro instanceof z.ZodError) {
        const errosFormatados = formatarErrosZod(erro)
        return res.status(400).json({ erros: errosFormatados })
    }

    // 2. captura automatica de eamils duplicados do prisma (POST/PUT/PATCH)
    if(erro.code === 'P2002') {
        return res.status(409).json({ erro: 'email já cadastrado' })
    }


    //3. FALLBACK: QUALQUER ERRO NÃO MAPEADO CAI AQUI:
    if(erro.code === 'P2025') {
        return res.status(500).json({ erro: 'erro no servidor interno' });
    };
}