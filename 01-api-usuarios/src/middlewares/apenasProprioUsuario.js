import { idSchema } from "../schemas/tarefaSchema.js";


export const apenasProprioUsuario = (req, res, next) => {

    // validar o id com o schema
    const id = idSchema.parse(req.params.id)
    const usuarioId = req.usuario.id

    // validar, se for diferente do id do token
    if(id !== usuarioId) {
        return res.status(403).json({ erro: 'Você só pode mexer na sua própria conta' })
    }

    next()
}