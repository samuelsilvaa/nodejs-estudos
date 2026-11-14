import jwt from 'jsonwebtoken';
/*
O refresh também precisa gerar access tokens,
e repetir a configuração em dois lugares é pedir para um ficar diferente do outro
*/
export const gerarAccessToken = (usuarioId) => {

    // é gerado para o arquivo authController
    return jwt.sign(
        { sub: usuarioId.toString()},
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )

}