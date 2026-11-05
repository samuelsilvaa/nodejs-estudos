import express from 'express';

// importando as funções que criei no Controllers
import {
    criarUsuario,
    deletarUsuario, 
    atualizarUsuarioTotal, 
    atualizarUsuarioParcial, 
    meuPerfil
} from '../controllers/usuarioController.js'
import { autenticar } from '../middlewares/autenticar.js';
import { apenasProprioUsuario } from '../middlewares/apenasProprioUsuario.js';

const router = express.Router()


// mapeando os caminhos apontando para cada função do Controller 
router.post('/usuarios', criarUsuario)
router.get('/usuarios/me', autenticar, meuPerfil)
router.delete('/usuarios/:id', autenticar, apenasProprioUsuario, deletarUsuario)
router.put('/usuarios/:id', autenticar, apenasProprioUsuario, atualizarUsuarioTotal)
router.patch('/usuarios/:id', autenticar, apenasProprioUsuario, atualizarUsuarioParcial)

// Exportando o roteador para que o arquivo server.js consiga ler
export default router