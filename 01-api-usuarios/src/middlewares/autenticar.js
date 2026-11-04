import jwt from 'jsonwebtoken';


export const autenticar = (req, res, next) => {
    // 1. ler o cabeçalho
    const authHeader = req.headers.authorization

    // 2.  se não existir, OU não começar com 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ erro: 'Token não informado' })
    }

    // 3. separar o token
    const [, token] = authHeader.split(' ')

    // 4. verificar com o jwt.verify, lança erro se for ruim
    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] })

    // 5. req usuario, anotar quem é
    req.usuario = { id: Number(payload.sub) }

    // 6. sem ele a requisição trava
    next()
}