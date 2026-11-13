import crypto, { createHash } from 'node:crypto';
import { prisma } from './prisma.js'


export const DURACAO_REFRESH_MS = 7 * 24 * 60 * 60 * 1000 // 7 dias de duração

// as opções do cookie
export const opcoesCookie = {

    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/auth',
    maxAge: DURACAO_REFRESH_MS

}

// criando o hash do token
export const hashDoToken = (token) => {

    return createHash('sha256').update(token).digest('hex')

}

export async function criarRefreshToken(usuarioId, familia = crypto.randomUUID()) {
    // 1. SORTEAR o token (texto longo e imprevisível)
    const token = crypto.randomBytes(48).toString('base64url')

    // 2. GUARDAR no banco só o HASH dele
    await prisma.refreshToken.create({
        data: {
            tokenHash: hashDoToken(token),
            familia,
            expiraEm: new Date(Date.now() + DURACAO_REFRESH_MS),
            usuarioId,
        },
    })

    // 3. DEVOLVER o token inteiro, para quem chamou colocar no cookie
    return token

}