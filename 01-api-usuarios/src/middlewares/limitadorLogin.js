import rateLimit from 'express-rate-limit';

// rate limit do login
export const limitadorLogin = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos por janela
    limit: 5, // limite de 5 tentativas
    standardHeaders: 'draft-7', // ativa o cabeçalho padrão
    legacyHeaders: false,  // desativa os cabeçalhos antigos
    skipSuccessfulRequests: true, // conta no limite apenas as requisições que falharam (erros)
    message: { erro: 'Limite excedido, tente novamente mais tarde' } 
})