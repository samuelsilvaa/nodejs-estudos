import  argon2  from 'argon2';
import { prisma } from "../lib/prisma.js";
import { loginSchema } from "../schemas/authSchema.js";
import jwt from 'jsonwebtoken';
import { criarRefreshToken, hashDoToken, opcoesCookie } from '../lib/refreshToken.js';
import { gerarAccessToken } from '../lib/accessToken.js';

// falha cedo se o segredo não existir
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido no .env')
}

// hash falso, para gastar o mesmo tempo quando o email não existir
//gerado apenas uma vez
const HASH_FALSO = await argon2.hash('texto-para-o-hash-falso')


export const login = async (req, res) => {
    // valida o corpo com o loginSchema
    const { email, senha: senhaDigitada } = loginSchema.parse(req.body)

    // buscar o usuario pelo email
    const usuario = await prisma.usuario.findUnique({
        where: {email},
    });

    // confere se o usuario existe ou não, se não existir manda o HASH_FALSO
    const conferirHash = usuario ? usuario.senha : HASH_FALSO 

    const senhaCorreta = await argon2.verify(conferirHash, senhaDigitada)

    // se usuario OU senha não for encontrada, return com erro 401
    if(!usuario || !senhaCorreta) {
        return res.status(401).json({ erro: "Email ou senha inválidos" })
    }


    // gerar o token JWT
    const token = gerarAccessToken(usuario.id)
    
    
     //cria o refresh token
    const refresh = await criarRefreshToken(usuario.id)
    res.cookie('refreshToken', refresh, opcoesCookie)


    // respondendo um de cada vez, nunca ele inteiro
    return res.status(200).json({
        token, usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        },
    })
};


// função auxiliar de recusar
const recusar = (res) => {
    res.clearCookie('refreshToken', opcoesCookie)
    return res.status(401).json({ erro: 'Sessão inválida' })
}

// função auxiliar
const revogarFamilia = (familia) => 
    prisma.refreshToken.deleteMany({ where: { familia } })


export const refresh = async (req, res) => {
    // ler o cookie que vem do refreshToken
    const token = req.cookies.refreshToken
    // recusar da função auxiliar
    if(!token) return recusar(res)

    // achar o registro pelo HASH do token
    const registro = await prisma.refreshToken.findUnique({ 
        where: { tokenHash: hashDoToken(token) }
    }) 

    if(!registro) return recusar(res)

    // REUSO: se o registro ja estiver preenchido
    if(registro.usadoEm) {
        await revogarFamilia(registro.familia)

        return recusar(res)
    }

    // VENCIDO: se registro.expiraEm for anterior a agora
    if(registro.expiraEm < new Date()) return recusar(res)

    //MARCAR COMO USADO, de forma atômica:
    const { count } = await prisma.refreshToken.updateMany({
        where: { id: registro.id, usadoEm: null },
        data: {
            usadoEm: new Date()
        },
    })

    if(count === 0) {
        await revogarFamilia(registro.familia)
        return recusar(res)
    }

    // criar o refresh novo, na mesma família
    const novoRefresh = await criarRefreshToken(registro.usuarioId, registro.familia)

    // guardar no cookie
    res.cookie('refreshToken', novoRefresh, opcoesCookie)

    // responder com o access token novo
    return res.status(200).json({ token: gerarAccessToken(registro.usuarioId) })
}


export const logout = async (req, res) => {

    const token = req.cookies.refreshToken

    if(token) {
        const registro = await prisma.refreshToken.findUnique({
            where: { tokenHash: hashDoToken(token)}
        })

        if(registro) {
            await revogarFamilia(registro.familia)
        }
    }

    res.clearCookie('refreshToken', opcoesCookie)

    return res.status(204).send()
}