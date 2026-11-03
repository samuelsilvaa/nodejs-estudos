import  argon2  from 'argon2';
import { prisma } from "../lib/prisma.js";
import { loginSchema } from "../schemas/authSchema.js";
import jwt from 'jsonwebtoken';

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
    const token = jwt.sign(
    { sub: usuario.id.toString()}, // o id vindo como string
    process.env.JWT_SECRET, // o segredo
    { expiresIn: '1h' })


    // respondendo um de cada vez, nunca ele inteiro
    return res.status(200).json({
        token, usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        },
    })
};